import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  OnModuleInit
} from '@nestjs/common';
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
  RelationshipStatus as RpcRelationshipStatus,
  RelationshipStatus,
  AccountDto
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
import { ApiErrorMessages } from '@prj/common';

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
      relationshipWith: account.relationshipWith
        ? {
            ...account.relationshipWith,
            status: RpcRelationshipStatus[account.relationshipWith.status],
            previousStatus:
              RpcRelationshipStatus[account.relationshipWith.previousStatus]
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
    if (!data.targetId && !data.targetUsername) {
      throw new BadRequestException(
        ApiErrorMessages.SEND_FRIEND_REQUEST_NO_TARGET
      );
    }

    const target = handleRpcResult(
      await lastValueFrom(
        this.authServiceAccountModule.getAccount({
          id: data.targetId,
          username: data.targetUsername,
          includeRelationshipWith: accountId
        })
      )
    );

    if (target.relationshipWith?.status === RpcRelationshipStatus.FRIEND)
      throw new ConflictException(
        ApiErrorMessages.SEND_FRIEND_REQUEST_ALREADY_FRIEND
      );

    if (target.relationshipWith?.status === RpcRelationshipStatus.BEING_BLOCKED)
      throw new ConflictException(ApiErrorMessages.SEND_FRIEND_REQUEST_BLOCKED);

    if (target.relationshipWith?.status === RpcRelationshipStatus.PENDING) {
      return this.acceptFriendRequest(accountId, { targetId: target.id });
    }

    const result = await lastValueFrom(
      this.authServiceAccountModule.createOrUpdateRelationship({
        account: {
          id: accountId,
          status: RpcRelationshipStatus.REQUESTING
        },
        target: {
          id: target.id,
          status: RpcRelationshipStatus.PENDING
        }
      })
    );

    return handleRpcResult(result);
  }

  async acceptFriendRequest(accountId: string, data: AcceptFriendRequestDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.createOrUpdateRelationship({
        account: {
          id: accountId,
          status: RpcRelationshipStatus.FRIEND
        },
        target: {
          id: data.targetId,
          status: RpcRelationshipStatus.FRIEND
        }
      })
    );

    return handleRpcResult(result);
  }

  async declineFriendRequest(accountId: string, data: DeclineFriendRequestDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.deleteRelationship({
        accountId: accountId,
        targetId: data.targetId
      })
    );

    return handleRpcResult(result);
  }

  async getFriends(accountId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.getFriends({ accountId })
    );

    return {
      friends:
        handleRpcResult(result).accounts?.map((e) => ({
          ...e,
          connectionStatus: RpcConnectionStatus[e.connectionStatus] as
            | 'ONLINE'
            | 'OFFLINE',
          status: RpcAccountStatus[e.status],
          relationshipWith: e.relationshipWith
            ? {
                ...e.relationshipWith,
                status: RpcRelationshipStatus[e.relationshipWith.status],
                previousStatus:
                  RpcRelationshipStatus[e.relationshipWith.previousStatus]
              }
            : undefined
        })) || []
    };
  }

  async removeFriend(accountId: string, targetId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.deleteRelationship({ accountId, targetId })
    );

    return handleRpcResult(result);
  }

  async getPendingFriendRequest(accountId: string) {
    const pending =
      handleRpcResult(
        await lastValueFrom(
          this.authServiceAccountModule.getAccounts({
            haveRelationshipWith: accountId,
            relationshipStatus: RelationshipStatus.PENDING
          })
        )
      ).accounts || ([] as AccountDto[]);

    const requesting =
      handleRpcResult(
        await lastValueFrom(
          this.authServiceAccountModule.getAccounts({
            haveRelationshipWith: accountId,
            relationshipStatus: RelationshipStatus.REQUESTING
          })
        )
      ).accounts || ([] as AccountDto[]);

    return {
      accounts: [...requesting, ...pending].map((e) => ({
        ...e,
        connectionStatus: RpcConnectionStatus[e.connectionStatus] as
          | 'ONLINE'
          | 'OFFLINE',
        status: RpcAccountStatus[e.status],
        relationshipWith: e.relationshipWith
          ? {
              ...e.relationshipWith,
              status: RpcRelationshipStatus[e.relationshipWith.status],
              previousStatus:
                RpcRelationshipStatus[e.relationshipWith.previousStatus]
            }
          : undefined
      }))
    };
  }

  async getBlockedUsers(accountId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.getBlocked({ accountId })
    );

    return {
      blocked:
        handleRpcResult(result).accounts?.map((e) => ({
          ...e,
          connectionStatus: RpcConnectionStatus[e.connectionStatus] as
            | 'ONLINE'
            | 'OFFLINE',
          status: RpcAccountStatus[e.status],
          relationshipWith: e.relationshipWith
            ? {
                ...e.relationshipWith,
                status: RpcRelationshipStatus[e.relationshipWith.status],
                previousStatus:
                  RpcRelationshipStatus[e.relationshipWith.previousStatus]
              }
            : undefined
        })) || []
    };
  }

  async blockUser(accountId: string, targetId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.createOrUpdateRelationship({
        account: {
          id: accountId,
          status: RpcRelationshipStatus.BLOCKED
        },
        target: {
          id: targetId,
          status: RpcRelationshipStatus.BEING_BLOCKED
        }
      })
    );

    return handleRpcResult(result);
  }

  async unblockUser(accountId: string, targetId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.deleteRelationship({ accountId, targetId })
    );

    return handleRpcResult(result);
  }
}
