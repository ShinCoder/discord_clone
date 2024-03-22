import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { AccountStatus, Prisma, RelationshipStatus } from '@prisma/auth-client';

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
  GetFriendsResult
} from '@prj/types/grpc/auth-service';
import { getRpcSuccessMessage } from '@prj/common';

@Injectable()
export class AccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private toAccountDto(
    data: Prisma.AccountsGetPayload<{ include: { relationshipWith: true } }>
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
      friendIds: data.friendIds,
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
          : undefined
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
        return getRpcSuccessMessage(HttpStatus.OK, this.toAccountDto(account));

      throw new RpcException(new NotFoundException());
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async getAccounts(data: GetAccountsDto): Promise<GetAccountsResult> {
    try {
      const accounts = await this.prismaService.accounts.findMany({
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

      return getRpcSuccessMessage(HttpStatus.OK, {
        accounts: accounts.map((account) => this.toAccountDto(account))
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async createOrUpdateRelationship(data: CreateOrUpdateRelationshipDto) {
    try {
      await this.prismaService.$transaction(async (tx) => {
        let existed = await tx.relationships.findFirst({
          where: {
            accountId: data.account.id,
            targetId: data.target.id
          }
        });

        console.log(
          data.account.status,
          RelationshipStatus[RpcRelationshipStatus[data.account.status]]
        );

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
              accountId: data.account.id,
              targetId: data.target.id,
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
              accountId: data.target.id,
              targetId: data.account.id,
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

      const friends = relationships.map((e) =>
        this.toAccountDto({ ...e.account, relationshipWith: undefined })
      );

      return getRpcSuccessMessage(HttpStatus.OK, { accounts: friends });
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
