import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { AccountStatus, Accounts, ConnectionStatus } from '@prisma/auth-client';

import { PrismaService } from '../prisma/prisma.service';
import { handleThrowError } from '../../utils';

import {
  IJwtPayload,
  getRpcSuccessMessage,
  ApiErrorMessages,
  getRpcErrorMessage
} from '@prj/common';
import {
  LoginDto,
  LoginResult,
  RegisterDto,
  RegisterResult,
  VerifyDto,
  VerifyResult,
  RefreshDto,
  RefreshResult,
  LogoutDto,
  LogoutResult,
  UpdateConnectionStatusDto,
  UpdateConnectionStatusResult,
  ConnectionStatus as RpcConnectionStatus
} from '@prj/types/grpc/auth-service';
import { DefaultProfileValue } from '../../constants/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private readonly saltRounds = 10;

  async register(data: RegisterDto): Promise<RegisterResult> {
    try {
      const { account }: { account?: Accounts } =
        await this.prismaService.$transaction(async (tx) => {
          let existed = await tx.accounts.findFirst({
            where: {
              email: data.email
            }
          });
          if (existed)
            throw new RpcException(
              new ConflictException(ApiErrorMessages.REGISTER__EMAIL_EXISTED)
            );

          existed = await tx.accounts.findFirst({
            where: {
              username: data.username
            }
          });

          if (existed)
            throw new RpcException(
              new ConflictException(ApiErrorMessages.REGISTER__USERNAME_EXISTED)
            );

          const account = await tx.accounts.create({
            data: {
              email: data.email,
              password: await bcrypt.hash(data.password, this.saltRounds),
              username: data.username,
              displayName: data.displayName || data.username,
              dateOfBirth: new Date(data.dateOfBirth),
              bannerColor: DefaultProfileValue.BannerColor,
              settings: {
                pinnedDms: []
              }
            }
          });

          return { account };
        });

      const tokenPayload: IJwtPayload = {
        sub: account.id,
        email: account.email,
        isAdmin: account.isAdmin,
        type: 'verify'
      };

      const verifyToken = this.jwtService.sign(tokenPayload, {
        privateKey: this.configService.get<string>('JWT_VT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_VT_EXPIRES')
      });

      return getRpcSuccessMessage(HttpStatus.CREATED, { verifyToken });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async login(data: LoginDto): Promise<LoginResult> {
    try {
      if (!data.email && !data.phoneNumber)
        throw new RpcException(
          new BadRequestException('Email or phoneNumber is required')
        );

      const account = await this.prismaService.accounts.findFirst({
        where: {
          AND: [
            {
              OR: [
                {
                  email: data.email
                },
                {
                  phoneNumber: data.phoneNumber
                }
              ]
            },
            {
              status: {
                not: 'DISABLED'
              }
            }
          ]
        }
      });

      if (!account)
        throw new RpcException(
          new UnauthorizedException(ApiErrorMessages.LOGIN__ACCOUNT_NOT_FOUND)
        );

      if (account.status === AccountStatus.NOT_VERIFIED)
        throw new RpcException(
          new ForbiddenException(ApiErrorMessages.LOGIN__NOT_VERIFIED)
        );

      if (!bcrypt.compareSync(data.password, account.password))
        throw new RpcException(
          new UnauthorizedException(ApiErrorMessages.LOGIN__WRONG_PASSWORD)
        );

      const accessToken = this.jwtService.sign(
        {
          sub: account.id,
          email: account.email,
          isAdmin: account.isAdmin,
          type: 'access'
        },
        {
          privateKey: this.configService.get<string>('JWT_AT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_AT_EXPIRES')
        }
      );
      const refreshToken = this.jwtService.sign(
        {
          sub: account.id,
          email: account.email,
          isAdmin: account.isAdmin,
          type: 'refresh'
        },
        {
          privateKey: this.configService.get<string>('JWT_RT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_RT_EXPIRES')
        }
      );

      const session = await this.prismaService.sessions.findFirst({
        where: {
          accountId: account.id
        }
      });

      if (session) {
        await this.prismaService.sessions.update({
          where: {
            id: session.id
          },
          data: {
            accessToken,
            refreshToken
          }
        });
      } else {
        await this.prismaService.sessions.create({
          data: {
            accountId: account.id,
            accessToken,
            refreshToken
          }
        });
      }

      return getRpcSuccessMessage(HttpStatus.OK, {
        accessToken,
        refreshToken
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async verify(data: VerifyDto): Promise<VerifyResult> {
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const account = await tx.accounts.findFirst({
          where: {
            id: data.id
          }
        });

        if (!account) throw new RpcException(new NotFoundException());

        if (account.status !== AccountStatus.NOT_VERIFIED)
          throw new RpcException(new ConflictException('Account is verified'));

        await tx.accounts.update({
          where: {
            id: data.id
          },
          data: {
            status: AccountStatus.ACTIVE
          }
        });

        return getRpcSuccessMessage(HttpStatus.OK);
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async refresh(data: RefreshDto): Promise<RefreshResult> {
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const session = await tx.sessions.findFirst({
          where: {
            accountId: data.accountId
          },
          include: {
            account: {
              select: {
                id: true,
                email: true,
                isAdmin: true
              }
            }
          }
        });

        if (!session)
          throw new RpcException(new ForbiddenException('Session not found'));

        if (session.refreshToken !== data.refreshToken)
          throw new RpcException(new ForbiddenException('Invalid token'));

        const accessToken = this.jwtService.sign(
          {
            sub: session.account.id,
            email: session.account.email,
            isAdmin: session.account.isAdmin,
            type: 'access'
          },
          {
            privateKey: this.configService.get<string>('JWT_AT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_AT_EXPIRES')
          }
        );
        const refreshToken = this.jwtService.sign(
          {
            sub: session.account.id,
            email: session.account.email,
            isAdmin: session.account.isAdmin,
            type: 'refresh'
          },
          {
            privateKey: this.configService.get<string>('JWT_RT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_RT_EXPIRES')
          }
        );

        await tx.sessions.update({
          where: {
            id: session.id
          },
          data: {
            accessToken,
            refreshToken
          }
        });

        return getRpcSuccessMessage(HttpStatus.OK, {
          accessToken,
          refreshToken
        });
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async logout(data: LogoutDto): Promise<LogoutResult> {
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const session = await tx.sessions.findFirst({
          where: {
            accountId: data.accountId
          }
        });

        if (session)
          await tx.sessions.delete({
            where: {
              id: session.id
            }
          });

        return getRpcSuccessMessage(HttpStatus.OK);
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async updateConnectionStatus(
    data: UpdateConnectionStatusDto
  ): Promise<UpdateConnectionStatusResult> {
    try {
      return await this.prismaService.$transaction(async (tx) => {
        const session = await tx.sessions.findFirst({
          where: {
            accountId: data.accountId
          }
        });

        if (session) {
          await tx.sessions.update({
            where: {
              id: session.id
            },
            data: {
              connectionStatus:
                ConnectionStatus[RpcConnectionStatus[data.status]]
            }
          });

          return getRpcSuccessMessage(HttpStatus.OK);
        }

        return getRpcErrorMessage(HttpStatus.NOT_FOUND);
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
