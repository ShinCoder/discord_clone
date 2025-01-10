import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { ConnectionStatus, RelationshipStatus } from '@prisma/auth-client';

import { PrismaService } from '../prisma/prisma.service';
import { handleThrowError } from '../../utils';

import {
  GetAccountWithSettingsDto,
  PinDmDto,
  RelationshipStatus as RpcRelationshipStatus,
  ConnectionStatus as RpcConnectionStatus,
  UnpinDmDto
} from '@prj/types/grpc/auth-service';
import { ApiErrorMessages, getRpcSuccessMessage } from '@prj/common';

@Injectable()
export class UserSettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAccountWithSettings(data: GetAccountWithSettingsDto) {
    try {
      const accountWithSettings = await this.prismaService.$transaction(
        async (tx) => {
          const account = await tx.accounts.findFirst({
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
              settings: true
            },
            where: {
              id: data.id
            }
          });

          if (account) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const pinnedDmIds: Array<string> = account.settings.pinnedDms;
            let pinnedDms: Array<{
              id: string;
              email: string;
              username: string;
              dateOfBirth: Date;
              phoneNumber: string;
              displayName: string;
              pronouns: string;
              avatar: string;
              bannerColor: string;
              about: string;
              createdAt: Date;
              updatedAt: Date;
              connectionStatus: ConnectionStatus;
              relationshipWith: Array<{
                accountId: string;
                targetId: string;
                status: RelationshipStatus;
                updatedAt: Date;
              }>;
            }> = [];

            if (pinnedDmIds.length > 0) {
              const pinnedAccounts = await tx.accounts.findMany({
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
                  },
                  sessions: {
                    select: {
                      id: true,
                      connectionStatus: true
                    },
                    where: {
                      connectionStatus: ConnectionStatus.ONLINE
                    }
                  }
                },
                where: {
                  id: {
                    in: pinnedDmIds
                  }
                }
              });

              pinnedDms = pinnedDmIds.reduce((accum, e) => {
                const _e = pinnedAccounts.find((_account) => _account.id === e);
                if (_e)
                  return [
                    ...accum,
                    {
                      ..._e,
                      connectionStatus:
                        _e.sessions.length > 0
                          ? ConnectionStatus.ONLINE
                          : ConnectionStatus.OFFLINE
                    }
                  ];
                else return accum;
              }, []);
            }

            return {
              data: account,
              pinnedDms
            };
          }
        }
      );

      delete accountWithSettings.data.settings;

      return getRpcSuccessMessage(HttpStatus.OK, {
        ...accountWithSettings.data,
        dateOfBirth: accountWithSettings.data.dateOfBirth.toISOString(),
        createdAt: accountWithSettings.data.createdAt.toISOString(),
        updatedAt: accountWithSettings.data.updatedAt.toISOString(),
        userSettings: {
          dmSettings: {
            pinnedDms: accountWithSettings.pinnedDms.map((e) => ({
              ...e,
              dateOfBirth: e.dateOfBirth.toISOString(),
              createdAt: e.createdAt.toISOString(),
              updatedAt: e.updatedAt.toISOString(),
              connectionStatus: RpcConnectionStatus[e.connectionStatus],
              inRelationshipWith:
                e.relationshipWith?.length === 1
                  ? {
                      ...e.relationshipWith[0],
                      status:
                        RpcRelationshipStatus[e.relationshipWith[0].status],
                      updatedAt: e.relationshipWith[0].updatedAt.toISOString()
                    }
                  : undefined
            }))
          }
        }
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async pinDm(data: PinDmDto) {
    try {
      const newPin = await this.prismaService.$transaction(async (tx) => {
        const account = await tx.accounts.findFirst({
          select: {
            id: true,
            settings: true
          },
          where: { id: data.accountId }
        });
        if (!account)
          throw new RpcException(
            new NotFoundException(ApiErrorMessages.PIN_DM__ACCOUNT_NOT_FOUND)
          );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const pinnedDmIds: Array<string> = account.settings.pinnedDms;

        if (pinnedDmIds.includes(data.targetId))
          throw new RpcException(
            new NotFoundException(ApiErrorMessages.PIN_DM__ALREADY_PINNED)
          );

        const target = await tx.accounts.findFirst({
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
            id: data.targetId
          }
        });
        if (!target)
          throw new RpcException(
            new NotFoundException(ApiErrorMessages.PIN_DM__TARGET_NOT_FOUND)
          );

        await tx.accounts.update({
          where: {
            id: account.id
          },
          data: {
            settings: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ...account.settings,
              pinnedDms: [target.id, ...pinnedDmIds]
            }
          }
        });

        return target;
      });

      return getRpcSuccessMessage(HttpStatus.CREATED, {
        newPinnedDm: {
          ...newPin,
          dateOfBirth: newPin.dateOfBirth.toISOString(),
          createdAt: newPin.createdAt.toISOString(),
          updatedAt: newPin.updatedAt.toISOString(),
          inRelationshipWith:
            newPin.relationshipWith?.length === 1
              ? {
                  ...newPin.relationshipWith[0],
                  status:
                    RpcRelationshipStatus[newPin.relationshipWith[0].status],
                  updatedAt: newPin.relationshipWith[0].updatedAt.toISOString()
                }
              : undefined
        }
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async unpinDm(data: UnpinDmDto) {
    try {
      await this.prismaService.$transaction(async (tx) => {
        const account = await tx.accounts.findFirst({
          select: {
            id: true,
            settings: true
          },
          where: { id: data.accountId }
        });
        if (!account)
          throw new RpcException(
            new NotFoundException(ApiErrorMessages.PIN_DM__ACCOUNT_NOT_FOUND)
          );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const pinnedDmIds: Array<string> = account.settings.pinnedDms;

        await tx.accounts.update({
          where: {
            id: account.id
          },
          data: {
            settings: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ...account.settings,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              pinnedDms: pinnedDmIds.filter((e) => e !== data.targetId)
            }
          }
        });
      });

      return getRpcSuccessMessage(HttpStatus.NO_CONTENT);
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
