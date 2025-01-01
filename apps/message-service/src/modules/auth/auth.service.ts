import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { AUTH_SERVICE } from '../../constants/services';
import { handleRpcResult } from '../../utils';

import {
  AUTH_SERVICE_ACCOUNT_MODULE_SERVICE_NAME,
  AuthServiceAccountModuleClient,
  GetAccountDto
} from '@prj/types/grpc/auth-service';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceAccountModule: AuthServiceAccountModuleClient;

  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientGrpc) {}

  onModuleInit() {
    this.authServiceAccountModule =
      this.authClient.getService<AuthServiceAccountModuleClient>(
        AUTH_SERVICE_ACCOUNT_MODULE_SERVICE_NAME
      );
  }

  async getAccount(data: GetAccountDto) {
    const result = await lastValueFrom(
      this.authServiceAccountModule.getAccount(data)
    );

    return handleRpcResult(result);
  }
}
