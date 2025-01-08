import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import {
  AccountStatus,
  Prisma,
  RelationshipStatus,
  ConnectionStatus
} from '@prisma/auth-client';

import { PrismaService } from '../prisma/prisma.service';
import { handleThrowError } from '../../utils';

import {
  GetAccountDto,
  GetAccountsDto,
  AccountDto,
  AccountStatus as RpcAccountStatus,
  RelationshipStatus as RpcRelationshipStatus,
  ConnectionStatus as RpcConnectionStatus,
  AddFriendDto,
  AcceptFriendRequestDto,
  IgnoreFriendRequestDto,
  BlockUserDto,
  UnblockUserDto,
  RemoveFriendDto,
  GetFriendRequestsDto,
  CancelFriendRequestDto
} from '@prj/types/grpc/auth-service';
import { ApiErrorMessages, getRpcSuccessMessage } from '@prj/common';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  private toAccountDto(data: {
    id: string;
    email: string;
    username: string;
    displayName: string;
    dateOfBirth: Date;
    phoneNumber: string;
    avatar: string;
    pronouns: string;
    about: string;
    bannerColor: string;
    createdAt: Date;
    updatedAt: Date;
    relationship?: Array<
      Prisma.RelationshipsGetPayload<{
        omit: {
          createdAt: true;
        };
      }>
    >;
    relationshipWith?: Array<
      Prisma.RelationshipsGetPayload<{
        omit: {
          createdAt: true;
        };
      }>
    >;
    connectionStatus?: ConnectionStatus;
  }): AccountDto {
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
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
      relationship:
        data.relationship?.length === 1
          ? {
              ...data.relationship[0],
              status: RpcRelationshipStatus[data.relationship[0].status],
              updatedAt: data.relationship[0].updatedAt.toISOString()
            }
          : undefined,
      inRelationshipWith:
        data.relationshipWith?.length === 1
          ? {
              ...data.relationshipWith[0],
              status: RpcRelationshipStatus[data.relationshipWith[0].status],
              updatedAt: data.relationshipWith[0].updatedAt.toISOString()
            }
          : undefined,
      connectionStatus: data.connectionStatus
        ? RpcConnectionStatus[data.connectionStatus]
        : undefined
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

  async getAccount(data: GetAccountDto) {
    try {
      const account = await this.prismaService.accounts.findFirst({
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          dateOfBirth: true,
          phoneNumber: true,
          avatar: true,
          about: true,
          pronouns: true,
          bannerColor: true,
          createdAt: true,
          updatedAt: true,
          ...(data.includeRelationshipWith && {
            relationship: {
              select: {
                accountId: true,
                targetId: true,
                status: true,
                updatedAt: true
              },
              where: {
                targetId: data.includeRelationshipWith
              }
            },
            relationshipWith: {
              select: {
                accountId: true,
                targetId: true,
                status: true,
                updatedAt: true
              },
              where: {
                accountId: data.includeRelationshipWith
              }
            }
          })
        },
        where: {
          ...(data.id && { id: data.id }),
          ...(data.username && { username: data.username }),
          status: data.status
            ? AccountStatus[RpcAccountStatus[data.status]]
            : AccountStatus.ACTIVE
        }
      });

      if (account)
        return getRpcSuccessMessage(
          HttpStatus.OK,
          this.toAccountDto({
            ...account,
            ...(data.includeConnectionStatus && {
              connectionStatus: await this.getConnectionStatus(account.id)
            })
          })
        );

      throw new RpcException(new NotFoundException());
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async getAccounts(data: GetAccountsDto) {
    try {
      const accounts = await this.prismaService.accounts.findMany({
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          dateOfBirth: true,
          phoneNumber: true,
          avatar: true,
          about: true,
          pronouns: true,
          bannerColor: true,
          createdAt: true,
          updatedAt: true,
          ...(data.haveRelationshipWith !== undefined &&
            data.relationshipStatus !== undefined && {
              relationshipWith: {
                select: {
                  accountId: true,
                  targetId: true,
                  status: true,
                  updatedAt: true
                },
                where: {
                  accountId: data.haveRelationshipWith,
                  status:
                    RelationshipStatus[
                      RpcRelationshipStatus[data.relationshipStatus]
                    ]
                }
              }
            })
        },
        where: {
          ...(data.haveRelationshipWith !== undefined &&
            data.relationshipStatus !== undefined && {
              relationshipWith: {
                some: {
                  accountId: data.haveRelationshipWith,
                  status:
                    RelationshipStatus[
                      RpcRelationshipStatus[data.relationshipStatus]
                    ]
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
              ...(data.includeConnectionStatus && {
                connectionStatus: await this.getConnectionStatus(account.id)
              })
            })
          )
        )
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  private async verifyUsers(
    tx: Prisma.TransactionClient,
    accountId: string,
    targetId: string
  ) {
    const account = await tx.accounts.findFirst({
      select: {
        id: true,
        relationship: {
          select: {
            status: true
          },
          where: {
            targetId
          }
        }
      },
      where: { id: accountId }
    });
    if (!account)
      throw new RpcException(
        new NotFoundException(ApiErrorMessages.RELATIONSHIP__ACCOUNT_NOT_FOUND)
      );
    const target = await tx.accounts.findFirst({
      select: {
        id: true,
        relationship: {
          select: {
            status: true
          },
          where: {
            targetId: accountId
          }
        }
      },
      where: {
        id: targetId
      }
    });
    if (!target)
      throw new RpcException(
        new NotFoundException(ApiErrorMessages.RELATIONSHIP__TARGET_NOT_FOUND)
      );

    return { account, target };
  }

  async addFriend(data: AddFriendDto) {
    try {
      if (!data.targetId && !data.targetUsername) {
        throw new RpcException(
          new BadRequestException(
            ApiErrorMessages.SEND_FRIEND_REQUEST__NO_TARGET
          )
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        const account = await tx.accounts.findFirst({
          select: {
            id: true
          },
          where: { id: data.accountId }
        });
        if (!account)
          throw new RpcException(
            new NotFoundException(
              ApiErrorMessages.RELATIONSHIP__ACCOUNT_NOT_FOUND
            )
          );
        const target = await tx.accounts.findFirst({
          select: {
            id: true
          },
          where: {
            ...(data.targetId && { id: data.targetId }),
            ...(data.targetUsername && { username: data.targetUsername })
          }
        });
        if (!target)
          throw new RpcException(
            new NotFoundException(
              ApiErrorMessages.RELATIONSHIP__TARGET_NOT_FOUND
            )
          );

        if (account.id === target.id) {
          throw new RpcException(
            new BadRequestException(ApiErrorMessages.RELATIONSHIP__SELF_INVOKE)
          );
        }

        const pastRevertedRelationship = await tx.relationships.findFirst({
          select: {
            status: true
          },
          where: {
            accountId: target.id,
            targetId: account.id
          }
        });

        if (pastRevertedRelationship) {
          switch (pastRevertedRelationship.status) {
            case RelationshipStatus.FRIEND:
              throw new RpcException(
                new ConflictException(
                  ApiErrorMessages.SEND_FRIEND_REQUEST__ALREADY_FRIEND
                )
              );
            case RelationshipStatus.BLOCKED:
              throw new RpcException(
                new ConflictException(
                  ApiErrorMessages.SEND_FRIEND_REQUEST__BLOCKED
                )
              );
            case RelationshipStatus.PENDING:
              await tx.relationships.update({
                where: {
                  accountId_targetId: {
                    accountId: target.id,
                    targetId: account.id
                  }
                },
                data: {
                  status: RelationshipStatus.FRIEND
                }
              });

              await tx.relationships.upsert({
                where: {
                  accountId_targetId: {
                    accountId: account.id,
                    targetId: target.id
                  }
                },
                create: {
                  account: {
                    connect: { id: account.id }
                  },
                  target: {
                    connect: { id: target.id }
                  },
                  status: RelationshipStatus.FRIEND
                },
                update: {
                  status: RelationshipStatus.FRIEND
                }
              });
          }
        } else {
          await tx.relationships.upsert({
            where: {
              accountId_targetId: {
                accountId: account.id,
                targetId: target.id
              }
            },
            create: {
              account: {
                connect: { id: account.id }
              },
              target: {
                connect: { id: target.id }
              },
              status: RelationshipStatus.PENDING
            },
            update: {
              status: RelationshipStatus.PENDING
            }
          });
        }
      });

      return getRpcSuccessMessage(HttpStatus.CREATED);
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async acceptFriendRequest(data: AcceptFriendRequestDto) {
    try {
      if (data.accountId === data.targetId) {
        throw new RpcException(
          new BadRequestException(ApiErrorMessages.RELATIONSHIP__SELF_INVOKE)
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        const { account, target } = await this.verifyUsers(
          tx,
          data.accountId,
          data.targetId
        );

        if (target.relationship[0]?.status === RelationshipStatus.PENDING) {
          await tx.relationships.update({
            where: {
              accountId_targetId: {
                accountId: target.id,
                targetId: account.id
              }
            },
            data: {
              status: RelationshipStatus.FRIEND
            }
          });

          await tx.relationships.upsert({
            where: {
              accountId_targetId: {
                accountId: account.id,
                targetId: target.id
              }
            },
            update: {
              status: RelationshipStatus.FRIEND
            },
            create: {
              account: {
                connect: { id: account.id }
              },
              target: {
                connect: { id: target.id }
              },
              status: RelationshipStatus.FRIEND
            }
          });
        } else {
          throw new RpcException(
            new ConflictException(
              ApiErrorMessages.FRIEND_REQUEST_FEEDBACK__NO_REQUEST
            )
          );
        }
      });

      return getRpcSuccessMessage(HttpStatus.NO_CONTENT);
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async ignoreFriendRequest(data: IgnoreFriendRequestDto) {
    try {
      if (data.accountId === data.targetId) {
        throw new RpcException(
          new BadRequestException(ApiErrorMessages.RELATIONSHIP__SELF_INVOKE)
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        const { account, target } = await this.verifyUsers(
          tx,
          data.accountId,
          data.targetId
        );

        if (target.relationship[0]?.status === RelationshipStatus.PENDING) {
          await tx.relationships.delete({
            where: {
              accountId_targetId: {
                accountId: target.id,
                targetId: account.id
              }
            }
          });
        } else {
          throw new RpcException(
            new ConflictException(
              ApiErrorMessages.FRIEND_REQUEST_FEEDBACK__NO_REQUEST
            )
          );
        }
      });

      return getRpcSuccessMessage(HttpStatus.NO_CONTENT);
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async cancelFriendRequest(data: CancelFriendRequestDto) {
    try {
      if (data.accountId === data.targetId) {
        throw new RpcException(
          new BadRequestException(ApiErrorMessages.RELATIONSHIP__SELF_INVOKE)
        );
      }

      console.log(data);

      await this.prismaService.$transaction(async (tx) => {
        const { account, target } = await this.verifyUsers(
          tx,
          data.accountId,
          data.targetId
        );

        if (account.relationship[0]?.status === RelationshipStatus.PENDING) {
          await tx.relationships.delete({
            where: {
              accountId_targetId: {
                accountId: account.id,
                targetId: target.id
              }
            }
          });
        } else {
          throw new RpcException(
            new ConflictException(
              ApiErrorMessages.FRIEND_REQUEST_FEEDBACK__NO_REQUEST
            )
          );
        }
      });

      return getRpcSuccessMessage(HttpStatus.NO_CONTENT);
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async removeFriend(data: RemoveFriendDto) {
    try {
      if (data.accountId === data.targetId) {
        throw new RpcException(
          new BadRequestException(ApiErrorMessages.RELATIONSHIP__SELF_INVOKE)
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        const { account, target } = await this.verifyUsers(
          tx,
          data.accountId,
          data.targetId
        );

        if (account.relationship[0]?.status === RelationshipStatus.FRIEND) {
          await tx.relationships.deleteMany({
            where: {
              OR: [
                {
                  accountId: account.id,
                  targetId: target.id
                },
                { accountId: target.id, targetId: account.id }
              ]
            }
          });
        } else {
          throw new RpcException(
            new ConflictException(ApiErrorMessages.REMOVE_FRIEND__NOT_FRIEND)
          );
        }
      });

      return getRpcSuccessMessage(HttpStatus.NO_CONTENT);
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async blockUser(data: BlockUserDto) {
    try {
      if (data.accountId === data.targetId) {
        throw new RpcException(
          new BadRequestException(ApiErrorMessages.RELATIONSHIP__SELF_INVOKE)
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        const { account, target } = await this.verifyUsers(
          tx,
          data.accountId,
          data.targetId
        );

        if (
          target.relationship[0]?.status &&
          target.relationship[0].status !== RelationshipStatus.BLOCKED
        ) {
          await tx.relationships.delete({
            where: {
              accountId_targetId: {
                accountId: target.id,
                targetId: account.id
              }
            }
          });
        }

        await tx.relationships.upsert({
          where: {
            accountId_targetId: {
              accountId: account.id,
              targetId: target.id
            }
          },
          update: {
            status: RelationshipStatus.BLOCKED
          },
          create: {
            account: {
              connect: {
                id: account.id
              }
            },
            target: {
              connect: {
                id: target.id
              }
            },
            status: RelationshipStatus.BLOCKED
          }
        });
      });

      return getRpcSuccessMessage(HttpStatus.NO_CONTENT);
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async unblockUser(data: UnblockUserDto) {
    try {
      if (data.accountId === data.targetId) {
        throw new RpcException(
          new BadRequestException(ApiErrorMessages.RELATIONSHIP__SELF_INVOKE)
        );
      }

      await this.prismaService.$transaction(async (tx) => {
        const { account, target } = await this.verifyUsers(
          tx,
          data.accountId,
          data.targetId
        );

        if (account.relationship[0]?.status === RelationshipStatus.BLOCKED) {
          await tx.relationships.delete({
            where: {
              accountId_targetId: {
                accountId: account.id,
                targetId: target.id
              }
            }
          });
        } else {
          throw new RpcException(
            new ConflictException(ApiErrorMessages.UNBLOCK__NOT_BLOCKED)
          );
        }
      });

      return getRpcSuccessMessage(HttpStatus.NO_CONTENT);
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async getFriendRequests(data: GetFriendRequestsDto) {
    try {
      const { accountRequesting, accountBeingRequested } =
        await this.prismaService.$transaction(async (tx) => {
          const account = await tx.accounts.findFirst({
            select: {
              id: true
            },
            where: {
              id: data.accountId
            }
          });
          if (!account)
            throw new RpcException(
              new NotFoundException(
                ApiErrorMessages.RELATIONSHIP__ACCOUNT_NOT_FOUND
              )
            );

          const accountRequesting = await tx.accounts.findMany({
            select: {
              id: true,
              email: true,
              username: true,
              displayName: true,
              dateOfBirth: true,
              phoneNumber: true,
              avatar: true,
              about: true,
              pronouns: true,
              bannerColor: true,
              createdAt: true,
              updatedAt: true,
              relationship: {
                select: {
                  accountId: true,
                  targetId: true,
                  status: true,
                  updatedAt: true
                },
                where: {
                  targetId: account.id
                }
              }
            },
            where: {
              relationship: {
                some: {
                  targetId: account.id,
                  status: RelationshipStatus.PENDING
                }
              }
            }
          });

          const accountBeingRequested = await tx.accounts.findMany({
            select: {
              id: true,
              email: true,
              username: true,
              displayName: true,
              dateOfBirth: true,
              phoneNumber: true,
              avatar: true,
              about: true,
              pronouns: true,
              bannerColor: true,
              createdAt: true,
              updatedAt: true,
              relationshipWith: {
                select: {
                  accountId: true,
                  targetId: true,
                  status: true,
                  updatedAt: true
                },
                where: {
                  accountId: account.id
                }
              }
            },
            where: {
              relationshipWith: {
                some: {
                  accountId: account.id,
                  status: RelationshipStatus.PENDING
                }
              }
            }
          });

          return {
            accountRequesting,
            accountBeingRequested
          };
        });

      return getRpcSuccessMessage(HttpStatus.OK, {
        incomingRequests: accountRequesting.map((_account) =>
          this.toAccountDto(_account)
        ),
        outgoingRequests: accountBeingRequested.map((_account) =>
          this.toAccountDto(_account)
        )
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
