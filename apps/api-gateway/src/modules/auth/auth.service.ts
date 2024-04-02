import {
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
  GetAccountDto,
  LoginDto,
  RegisterDto,
  VerifyDto,
  RefreshDto,
  LogoutDto,
  RelationshipStatus as RpcRelationshipStatus,
  RelationshipStatus
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

    return { ...account, status: RpcAccountStatus[account.status] };
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

  async sendFriendRequest(data: SendFriendRequestDto) {
    const target = handleRpcResult(
      await lastValueFrom(
        this.authServiceAccountModule.getAccount({
          id: data.targetId,
          includeRelationshipWith: data.accountId
        })
      )
    );

    if (target.relationshipWith.status === RpcRelationshipStatus.FRIEND)
      throw new ConflictException(
        ApiErrorMessages.SEND_FRIEND_REQUEST_ALREADY_FRIEND
      );

    const result = await lastValueFrom(
      this.authServiceAccountModule.createOrUpdateRelationship({
        account: {
          id: data.accountId,
          status: RpcRelationshipStatus.REQUESTING
        },
        target: {
          id: data.targetId,
          status: RpcRelationshipStatus.PENDING
        }
      })
    );

    return handleRpcResult(result);
  }

  async acceptFriendRequest(data: AcceptFriendRequestDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.createOrUpdateRelationship({
        account: {
          id: data.accountId,
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

  async declineFriendRequest(data: DeclineFriendRequestDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.deleteRelationship({
        accountId: data.accountId,
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
          status: RpcAccountStatus[e.status],
          relationshipWith: {
            ...e.relationshipWith,
            status: RpcRelationshipStatus[e.relationshipWith.status],
            previousStatus:
              RpcRelationshipStatus[e.relationshipWith.previousStatus]
          }
        })) || []
    };
  }

  async getPendingFriendRequest(accountId: string) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.getAccounts({
        haveRelationshipWith: accountId,
        relationshipStatus: RelationshipStatus.PENDING
      })
    );

    return {
      accounts:
        handleRpcResult(result).accounts?.map((e) => ({
          ...e,
          status: RpcAccountStatus[e.status],
          relationshipWith: {
            ...e.relationshipWith,
            status: RpcRelationshipStatus[e.relationshipWith.status],
            previousStatus:
              RpcRelationshipStatus[e.relationshipWith.previousStatus]
          }
        })) || []
    };
  }
}
