import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { AccountStatus, Accounts } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { handleThrowError } from '../../utlis';

import {
  GetAccountDto,
  GetAccountResult,
  GetAccountsDto,
  GetAccountsResult,
  AccountDto,
  AccountStatus as RpcAccountStatus
} from '@prj/types/grpc/auth-service';
import { getRpcSuccessMessage } from '@prj/common';

@Injectable()
export class AccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private toAccountDto(data: Accounts): AccountDto {
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      displayName: data.displayName,
      dateOfBirth: data.dateOfBirth.toDateString(),
      phoneNumber: data.phoneNumber,
      avatar: data.avatar,
      pronouns: data.pronouns,
      about: data.about,
      bannerColor: data.bannerColor,
      friendIds: data.friendIds,
      status: RpcAccountStatus[data.status],
      isAdmin: data.isAdmin,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString()
    };
  }

  async getAccount(data: GetAccountDto): Promise<GetAccountResult> {
    try {
      const account = await this.prismaService.accounts.findFirst({
        where: {
          id: data.id,
          status: data.status
            ? AccountStatus[RpcAccountStatus[data.status]]
            : AccountStatus.ACTIVE
        }
      });

      if (account)
        return getRpcSuccessMessage(HttpStatus.OK, this.toAccountDto(account));

      throw new RpcException(new NotFoundException());
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async getAccounts(data: GetAccountsDto): Promise<GetAccountsResult> {
    try {
      const accounts = await this.prismaService.accounts.findMany({});

      return getRpcSuccessMessage(HttpStatus.OK, {
        accounts: accounts.map((account) => this.toAccountDto(account))
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
