import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import {
  AcceptFriendRequestDto,
  DeclineFriendRequestDto,
  SendFriendRequestDto
} from './dto';
import { AUTH_SERVICE } from '../../constants';
import { handleRpcResult } from '../../utils/rpc-message';

import {
  AUTH_SERVICE_ACCOUNT_MODULE_SERVICE_NAME,
  AuthServiceAccountModuleClient,
  ConnectionStatus as RpcConnectionStatus,
  GetAccountDto,
  RelationshipStatus as RpcRelationshipStatus,
  AuthServiceSettingModuleClient,
  AUTH_SERVICE_SETTING_MODULE_SERVICE_NAME
} from '@prj/types/grpc/auth-service';
import { ConnectionStatus, RelationshipStatus } from '@prj/types/api';

@Injectable()
export class UserService implements OnModuleInit {
  private authServiceAccountModule: AuthServiceAccountModuleClient;
  private authServiceSettingModule: AuthServiceSettingModuleClient;

  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientGrpc) {}

  onModuleInit() {
    this.authServiceAccountModule =
      this.authClient.getService<AuthServiceAccountModuleClient>(
        AUTH_SERVICE_ACCOUNT_MODULE_SERVICE_NAME
      );

    this.authServiceSettingModule =
      this.authClient.getService<AuthServiceSettingModuleClient>(
        AUTH_SERVICE_SETTING_MODULE_SERVICE_NAME
      );
  }

  async getMe(accountId: string) {
    const result = await lastValueFrom(
      this.authServiceSettingModule.getAccountWithSettings({ id: accountId })
    );

    const account = handleRpcResult(result);

    return {
      ...account,
      userSettings: {
        ...account.userSettings,
        dmSettings: {
          ...account.userSettings.dmSettings,
          pinnedDms:
            account.userSettings.dmSettings.pinnedDms?.map((e) => ({
              ...e,
              connectionStatus:
                ConnectionStatus[RpcConnectionStatus[e.connectionStatus]],
              relationship: e.relationship
                ? {
                    ...e.relationship,
                    status:
                      RelationshipStatus[
                        RpcRelationshipStatus[e.relationship.status]
                      ]
                  }
                : undefined,
              inRelationshipWith: e.inRelationshipWith
                ? {
                    ...e.inRelationshipWith,
                    status:
                      RelationshipStatus[
                        RpcRelationshipStatus[e.inRelationshipWith.status]
                      ]
                  }
                : undefined
            })) || []
        }
      }
    };
  }

  async getAccount(data: GetAccountDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.getAccount(data)
    );

    const account = handleRpcResult(result);

    return {
      ...account,
      connectionStatus:
        ConnectionStatus[RpcConnectionStatus[account.connectionStatus]],
      relationship: account.relationship
        ? {
            ...account.relationship,
            status:
              RelationshipStatus[
                RpcRelationshipStatus[account.relationship.status]
              ]
          }
        : undefined,
      inRelationshipWith: account.inRelationshipWith
        ? {
            ...account.inRelationshipWith,
            status:
              RelationshipStatus[
                RpcRelationshipStatus[account.inRelationshipWith.status]
              ]
          }
        : undefined
    };
  }

  async sendFriendRequest(accountId: string, data: SendFriendRequestDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.addFriend({ accountId, ...data })
    );

    return handleRpcResult(result);
  }

  async acceptFriendRequest(accountId: string, data: AcceptFriendRequestDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.acceptFriendRequest({ accountId, ...data })
    );

    return handleRpcResult(result);
  }

  async declineFriendRequest(accountId: string, data: DeclineFriendRequestDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.ignoreFriendRequest({ accountId, ...data })
    );

    return handleRpcResult(result);
  }

  async cancelFriendRequest(accountId: string, targetId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.cancelFriendRequest({ accountId, targetId })
    );

    return handleRpcResult(result);
  }

  async getFriends(accountId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.getAccounts({
        haveRelationshipWith: accountId,
        relationshipStatus: RpcRelationshipStatus.FRIEND,
        includeConnectionStatus: true
      })
    );

    return {
      friends:
        handleRpcResult(result).accounts?.map((e) => ({
          ...e,
          connectionStatus:
            ConnectionStatus[RpcConnectionStatus[e.connectionStatus]],
          relationship: e.relationship
            ? {
                ...e.relationship,
                status:
                  RelationshipStatus[
                    RpcRelationshipStatus[e.relationship.status]
                  ]
              }
            : undefined,
          inRelationshipWith: e.inRelationshipWith
            ? {
                ...e.inRelationshipWith,
                status:
                  RelationshipStatus[
                    RpcRelationshipStatus[e.inRelationshipWith.status]
                  ]
              }
            : undefined
        })) || []
    };
  }

  async removeFriend(accountId: string, targetId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.removeFriend({ accountId, targetId })
    );

    return handleRpcResult(result);
  }

  async getPendingFriendRequest(accountId: string) {
    const result = handleRpcResult(
      await lastValueFrom(
        this.authServiceAccountModule.getFriendRequests({ accountId })
      )
    );

    return {
      incomingRequests:
        result?.incomingRequests?.map((e) => ({
          ...e,
          connectionStatus:
            ConnectionStatus[RpcConnectionStatus[e.connectionStatus]],
          relationship: e.relationship
            ? {
                ...e.relationship,
                status:
                  RelationshipStatus[
                    RpcRelationshipStatus[e.relationship.status]
                  ]
              }
            : undefined,
          inRelationshipWith: e.inRelationshipWith
            ? {
                ...e.inRelationshipWith,
                status:
                  RelationshipStatus[
                    RpcRelationshipStatus[e.inRelationshipWith.status]
                  ]
              }
            : undefined
        })) || [],
      outgoingRequests:
        result?.outgoingRequests?.map((e) => ({
          ...e,
          connectionStatus:
            ConnectionStatus[RpcConnectionStatus[e.connectionStatus]],
          relationship: e.relationship
            ? {
                ...e.relationship,
                status:
                  RelationshipStatus[
                    RpcRelationshipStatus[e.relationship.status]
                  ]
              }
            : undefined,
          inRelationshipWith: e.inRelationshipWith
            ? {
                ...e.inRelationshipWith,
                status:
                  RelationshipStatus[
                    RpcRelationshipStatus[e.inRelationshipWith.status]
                  ]
              }
            : undefined
        })) || []
    };
  }

  async getBlockedUsers(accountId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.getAccounts({
        haveRelationshipWith: accountId,
        relationshipStatus: RpcRelationshipStatus.BLOCKED
      })
    );

    return {
      blocked:
        handleRpcResult(result).accounts?.map((e) => ({
          ...e,
          connectionStatus:
            ConnectionStatus[RpcConnectionStatus[e.connectionStatus]],
          relationship: e.relationship
            ? {
                ...e.relationship,
                status:
                  RelationshipStatus[
                    RpcRelationshipStatus[e.relationship.status]
                  ]
              }
            : undefined,
          inRelationshipWith: e.inRelationshipWith
            ? {
                ...e.inRelationshipWith,
                status:
                  RelationshipStatus[
                    RpcRelationshipStatus[e.inRelationshipWith.status]
                  ]
              }
            : undefined
        })) || []
    };
  }

  async blockUser(accountId: string, targetId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.blockUser({ accountId, targetId })
    );

    return handleRpcResult(result);
  }

  async unblockUser(accountId: string, targetId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.unblockUser({ accountId, targetId })
    );

    return handleRpcResult(result);
  }

  async pinDirectMessage(accountId: string, targetId: string) {
    const result = await lastValueFrom(
      this.authServiceSettingModule.pinDm({ accountId, targetId })
    );

    const newPin = handleRpcResult(result).newPinnedDm;

    return {
      newPin: {
        ...newPin,
        connectionStatus:
          ConnectionStatus[RpcConnectionStatus[newPin.connectionStatus]],
        relationship: newPin.relationship
          ? {
              ...newPin.relationship,
              status:
                RelationshipStatus[
                  RpcRelationshipStatus[newPin.relationship.status]
                ]
            }
          : undefined,
        inRelationshipWith: newPin.inRelationshipWith
          ? {
              ...newPin.inRelationshipWith,
              status:
                RelationshipStatus[
                  RpcRelationshipStatus[newPin.inRelationshipWith.status]
                ]
            }
          : undefined
      }
    };
  }

  async unpinDirectMessage(accountId: string, targetId: string) {
    const result = await lastValueFrom(
      this.authServiceSettingModule.unpinDm({ accountId, targetId })
    );

    return handleRpcResult(result);
  }
}
