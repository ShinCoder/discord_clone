import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

import { AUTH_SERVICE, MAIL_SERVICE } from '../../constants';
import { handleRpcResult } from '../../utils/rpc-message';

import {
  AUTH_SERVICE_ACCOUNT_MODULE_SERVICE_NAME,
  AUTH_SERVICE_AUTH_MODULE_SERVICE_NAME,
  AccountStatus as RpcAccountStatus,
  AuthServiceAccountModuleClient,
  AuthServiceAuthModuleClient,
  ConnectionStatus as RpcConnectionStatus,
  GetAccountDto,
  LoginDto,
  RegisterDto,
  VerifyDto,
  RefreshDto,
  LogoutDto,
  RelationshipStatus as RpcRelationshipStatus
} from '@prj/types/grpc/auth-service';
import {
  MAIL_SERVICE_AUTH_MODULE_SERVICE_NAME,
  MailServiceAuthModuleClient
} from '@prj/types/grpc/mail-service';
import {
  AcceptFriendRequestDto,
  DeclineFriendRequestDto,
  SendFriendRequestDto
} from './dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceAuthModule: AuthServiceAuthModuleClient;
  private authServiceAccountModule: AuthServiceAccountModuleClient;
  private mailServiceAuthModule: MailServiceAuthModuleClient;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientGrpc,
    @Inject(MAIL_SERVICE) private readonly mailClient: ClientGrpc,
    private readonly configService: ConfigService
  ) {}

  onModuleInit() {
    this.authServiceAuthModule =
      this.authClient.getService<AuthServiceAuthModuleClient>(
        AUTH_SERVICE_AUTH_MODULE_SERVICE_NAME
      );

    this.authServiceAccountModule =
      this.authClient.getService<AuthServiceAccountModuleClient>(
        AUTH_SERVICE_ACCOUNT_MODULE_SERVICE_NAME
      );

    this.mailServiceAuthModule =
      this.mailClient.getService<MailServiceAuthModuleClient>(
        MAIL_SERVICE_AUTH_MODULE_SERVICE_NAME
      );
  }

  async register(data: RegisterDto) {
    const result = await lastValueFrom(
      this.authServiceAuthModule.register(data)
    );

    const payload = handleRpcResult(result);

    const mailResult = await lastValueFrom(
      this.mailServiceAuthModule.sendVerifyEmail({
        email: data.email,
        context: {
          name: data.username,
          link: `${this.configService.get<string>(
            'WEBAPP_BASE_URL'
          )}/verify?token=${payload.verifyToken}`
        }
      })
    );

    return handleRpcResult(mailResult);
  }

  async login(data: LoginDto) {
    const result = await lastValueFrom(this.authServiceAuthModule.login(data));

    return handleRpcResult(result);
  }

  async verify(data: VerifyDto) {
    const result = await lastValueFrom(this.authServiceAuthModule.verify(data));

    return handleRpcResult(result);
  }

  async getAccount(data: GetAccountDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.getAccount(data)
    );

    const account = handleRpcResult(result);

    return {
      ...account,
      connectionStatus: RpcConnectionStatus[account.connectionStatus] as
        | 'ONLINE'
        | 'OFFLINE',
      status: RpcAccountStatus[account.status],
      relationship: account.relationship
        ? {
            ...account.relationship,
            status: RpcRelationshipStatus[account.relationship.status]
          }
        : undefined,
      inRelationshipWith: account.inRelationshipWith
        ? {
            ...account.inRelationshipWith,
            status: RpcRelationshipStatus[account.inRelationshipWith.status]
          }
        : undefined
    };
  }

  async refresh(data: RefreshDto) {
    const result = await lastValueFrom(
      this.authServiceAuthModule.refresh(data)
    );

    return handleRpcResult(result);
  }

  async logout(data: LogoutDto) {
    const result = await lastValueFrom(this.authServiceAuthModule.logout(data));

    return handleRpcResult(result);
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
        relationshipStatus: RpcRelationshipStatus.FRIEND
      })
    );

    return {
      friends:
        handleRpcResult(result).accounts?.map((e) => ({
          ...e,
          connectionStatus: RpcConnectionStatus[e.connectionStatus] as
            | 'ONLINE'
            | 'OFFLINE',
          status: RpcAccountStatus[e.status],
          relationship: e.relationship
            ? {
                ...e.relationship,
                status: RpcRelationshipStatus[e.relationship.status]
              }
            : undefined,
          inRelationshipWith: e.inRelationshipWith
            ? {
                ...e.inRelationshipWith,
                status: RpcRelationshipStatus[e.inRelationshipWith.status]
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
          status: RpcAccountStatus[e.status],
          connectionStatus: RpcConnectionStatus[e.connectionStatus] as
            | 'ONLINE'
            | 'OFFLINE',
          relationship: e.relationship
            ? {
                ...e.relationship,
                status: RpcRelationshipStatus[e.relationship.status]
              }
            : undefined,
          inRelationshipWith: e.inRelationshipWith
            ? {
                ...e.inRelationshipWith,
                status: RpcRelationshipStatus[e.inRelationshipWith.status]
              }
            : undefined
        })) || [],
      outgoingRequests:
        result?.outgoingRequests?.map((e) => ({
          ...e,
          status: RpcAccountStatus[e.status],
          connectionStatus: RpcConnectionStatus[e.connectionStatus] as
            | 'ONLINE'
            | 'OFFLINE',
          relationship: e.relationship
            ? {
                ...e.relationship,
                status: RpcRelationshipStatus[e.relationship.status]
              }
            : undefined,
          inRelationshipWith: e.inRelationshipWith
            ? {
                ...e.inRelationshipWith,
                status: RpcRelationshipStatus[e.inRelationshipWith.status]
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
          connectionStatus: RpcConnectionStatus[e.connectionStatus] as
            | 'ONLINE'
            | 'OFFLINE',
          status: RpcAccountStatus[e.status],
          relationship: e.relationship
            ? {
                ...e.relationship,
                status: RpcRelationshipStatus[e.relationship.status]
              }
            : undefined,
          inRelationshipWith: e.inRelationshipWith
            ? {
                ...e.inRelationshipWith,
                status: RpcRelationshipStatus[e.inRelationshipWith.status]
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
}
