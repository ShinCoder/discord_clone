import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { AUTH_SERVICE } from '../../constants';
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
  LogoutDto
} from '@prj/types/grpc/auth-service';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceAuthModule: AuthServiceAuthModuleClient;
  private authServiceAccountModule: AuthServiceAccountModuleClient;

  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authServiceAuthModule =
      this.client.getService<AuthServiceAuthModuleClient>(
        AUTH_SERVICE_AUTH_MODULE_SERVICE_NAME
      );

    this.authServiceAccountModule =
      this.client.getService<AuthServiceAccountModuleClient>(
        AUTH_SERVICE_ACCOUNT_MODULE_SERVICE_NAME
      );
  }

  async register(data: RegisterDto) {
    const result = await lastValueFrom(
      this.authServiceAuthModule.register(data)
    );

    return handleRpcResult(result);
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
}
