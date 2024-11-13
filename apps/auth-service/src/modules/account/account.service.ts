import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import {
  AccountStatus,
  Prisma,
  RelationshipStatus,
  ConnectionStatus
} from '@prisma/auth-client';

import { PrismaService } from '../prisma/prisma.service';
import { handleThrowError } from '../../utlis';

import {
  GetAccountDto,
  GetAccountResult,
  GetAccountsDto,
  GetAccountsResult,
  AccountDto,
  AccountStatus as RpcAccountStatus,
  RelationshipStatus as RpcRelationshipStatus,
  CreateOrUpdateRelationshipDto,
  DeleteRelationshipDto,
  GetFriendsDto,
  GetFriendsResult,
  ConnectionStatus as RpcConnectionStatus
} from '@prj/types/grpc/auth-service';
import { ApiErrorMessages, getRpcSuccessMessage } from '@prj/common';

@Injectable()
export class AccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private toAccountDto(
    data: Prisma.AccountsGetPayload<{ include: { relationshipWith: true } }> & {
      connectionStatus: ConnectionStatus;
    }
  ): AccountDto {
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
      status: RpcAccountStatus[data.status],
      isAdmin: data.isAdmin,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
      relationshipWith:
        data.relationshipWith?.length === 1
          ? {
              ...data.relationshipWith[0],
              status: RpcRelationshipStatus[data.relationshipWith[0].status],
              previousStatus: data.relationshipWith[0].previousStatus
                ? RpcRelationshipStatus[data.relationshipWith[0].previousStatus]
                : undefined,
              createdAt: data.relationshipWith[0].createdAt.toISOString(),
              updatedAt: data.relationshipWith[0].updatedAt.toISOString()
            }
          : undefined,
      connectionStatus: RpcConnectionStatus[data.connectionStatus]
    };
  }

  private async getConnectionStatus(
    accountId: string
  ): Promise<ConnectionStatus> {
    try {
      const session = await this.prismaService.sessions.findFirst({
        where: {
          accountId,
          connectionStatus: ConnectionStatus.ONLINE
        }
      });

      if (session) {
        return ConnectionStatus.ONLINE;
      }

      return ConnectionStatus.OFFLINE;
    } catch {
      return ConnectionStatus.OFFLINE;
    }
  }

  async getAccount(data: GetAccountDto): Promise<GetAccountResult> {
    try {
      const account = await this.prismaService.accounts.findFirst({
        where: {
          ...(data.id && { id: data.id }),
          ...(data.username && { username: data.username }),
          status: data.status
            ? AccountStatus[RpcAccountStatus[data.status]]
            : AccountStatus.ACTIVE
        },
        include: {
          ...(data.includeRelationshipWith && {
            relationshipWith: {
              where: {
                accountId: data.includeRelationshipWith
              }
            }
          })
        }
      });

      if (account)
        return getRpcSuccessMessage(
          HttpStatus.OK,
          this.toAccountDto({
            ...account,
            connectionStatus: await this.getConnectionStatus(account.id)
          })
        );

      throw new RpcException(new NotFoundException());
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async getAccounts(data: GetAccountsDto): Promise<GetAccountsResult> {
    try {
      let condition = {};

      if (
        data.haveRelationshipWith != undefined &&
        data.relationshipStatus != undefined
      ) {
        const relationships = await this.prismaService.relationships.findMany({
          where: {
            accountId: data.haveRelationshipWith,
            status:
              RelationshipStatus[RpcRelationshipStatus[data.relationshipStatus]]
          }
        });

        condition = {
          where: {
            id: {
              in: relationships.map((e) => e.targetId)
            }
          }
        };
      }

      const accounts = await this.prismaService.accounts.findMany({
        ...condition,
        include: {
          ...(data.haveRelationshipWith && {
            relationshipWith: {
              where: {
                accountId: data.haveRelationshipWith
              }
            }
          })
        }
      });

      return getRpcSuccessMessage(HttpStatus.OK, {
        accounts: await Promise.all(
          accounts.map(async (account) =>
            this.toAccountDto({
              ...account,
              connectionStatus: await this.getConnectionStatus(account.id)
            })
          )
        )
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async createOrUpdateRelationship(data: CreateOrUpdateRelationshipDto) {
    try {
      if (data.account.id === data.target.id) {
        throw new RpcException(
          new BadRequestException(
            ApiErrorMessages.SEND_FRIEND_REQUEST_SELF_REQUEST
          )
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        const account = await tx.accounts.findFirst({
          where: { id: data.account.id }
        });
        if (!account)
          throw new RpcException(
            new NotFoundException(
              ApiErrorMessages.SEND_FRIEND_REQUEST_ACCOUNT_NOT_FOUND
            )
          );
        const target = await tx.accounts.findFirst({
          where: { id: data.target.id }
        });
        if (!target)
          throw new RpcException(
            new NotFoundException(
              ApiErrorMessages.SEND_FRIEND_REQUEST_ACCOUNT_NOT_FOUND
            )
          );

        let existed = await tx.relationships.findFirst({
          where: {
            accountId: data.account.id,
            targetId: data.target.id
          }
        });

        if (existed) {
          await tx.relationships.update({
            where: {
              id: existed.id
            },
            data: {
              previousStatus: existed.status,
              status:
                RelationshipStatus[RpcRelationshipStatus[data.account.status]]
            }
          });
        } else {
          await tx.relationships.create({
            data: {
              account: {
                connect: {
                  id: data.account.id
                }
              },
              target: {
                connect: {
                  id: data.target.id
                }
              },
              status:
                RelationshipStatus[RpcRelationshipStatus[data.account.status]]
            }
          });
        }

        existed = await tx.relationships.findFirst({
          where: {
            accountId: data.target.id,
            targetId: data.account.id
          }
        });

        if (existed) {
          await tx.relationships.update({
            where: {
              id: existed.id
            },
            data: {
              previousStatus: existed.status,
              status:
                RelationshipStatus[RpcRelationshipStatus[data.target.status]]
            }
          });
        } else {
          await tx.relationships.create({
            data: {
              account: {
                connect: {
                  id: data.target.id
                }
              },
              target: {
                connect: {
                  id: data.account.id
                }
              },
              status:
                RelationshipStatus[RpcRelationshipStatus[data.target.status]]
            }
          });
        }
      });

      return getRpcSuccessMessage(HttpStatus.CREATED);
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async deleteRelationship(data: DeleteRelationshipDto) {
    try {
      await this.prismaService.$transaction(async (tx) => {
        let relationship = await tx.relationships.findFirst({
          where: {
            accountId: data.accountId,
            targetId: data.targetId
          }
        });

        if (relationship) {
          await tx.relationships.delete({
            where: {
              id: relationship.id
            }
          });
        }

        relationship = await tx.relationships.findFirst({
          where: {
            accountId: data.targetId,
            targetId: data.accountId
          }
        });

        if (relationship) {
          await tx.relationships.delete({
            where: {
              id: relationship.id
            }
          });
        }
      });

      return getRpcSuccessMessage(HttpStatus.OK);
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async getFriends(data: GetFriendsDto): Promise<GetFriendsResult> {
    try {
      const relationships = await this.prismaService.relationships.findMany({
        where: {
          targetId: data.accountId,
          status: RelationshipStatus.FRIEND
        },
        include: {
          account: true
        }
      });

      const friends = await Promise.all(
        relationships.map(async (e) =>
          this.toAccountDto({
            ...e.account,
            relationshipWith: undefined,
            connectionStatus: await this.getConnectionStatus(e.account.id)
          })
        )
      );

      return getRpcSuccessMessage(HttpStatus.OK, { accounts: friends });
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
