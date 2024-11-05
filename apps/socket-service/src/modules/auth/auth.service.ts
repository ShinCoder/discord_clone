import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { lastValueFrom } from 'rxjs';

import { AUTH_SERVICE } from '../../constants/services';
import { AuthPayload } from './auth.type';

import {
  AUTH_SERVICE_AUTH_MODULE_SERVICE_NAME,
  AuthServiceAuthModuleClient,
  UpdateConnectionStatusDto
} from '@prj/types/grpc/auth-service';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceAuthModule: AuthServiceAuthModuleClient;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientGrpc,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  onModuleInit() {
    this.authServiceAuthModule =
      this.authClient.getService<AuthServiceAuthModuleClient>(
        AUTH_SERVICE_AUTH_MODULE_SERVICE_NAME
      );
  }

  async updateConnectionStatus(data: UpdateConnectionStatusDto) {
    await lastValueFrom(
      this.authServiceAuthModule.updateConnectionStatus(data)
    );
  }

  verifyAccessToken(token: string): AuthPayload {
    const publicKey = this.configService.get<string>('JWT_AT_PUBLIC');

    return this.jwtService.verify(token, {
      publicKey
    }) as AuthPayload;
  }
}
