import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { AUTH_SERVICE, MAIL_SERVICE } from '../../constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAtStrategy, JwtRtStrategy, JwtVtStrategy } from '../../strategies';

import { COM_AUTH_SERVICE_PACKAGE_NAME } from '@prj/types/grpc/auth-service';
import { COM_MAIL_SERVICE_PACKAGE_NAME } from '@prj/types/grpc/mail-service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('AUTH_SERVICE_GRPC_URL'),
            package: COM_AUTH_SERVICE_PACKAGE_NAME,
            protoPath: join(__dirname, './proto/auth-service.proto')
          }
        }),
        inject: [ConfigService]
      },
      {
        name: MAIL_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MAIL_SERVICE_GRPC_URL'),
            package: COM_MAIL_SERVICE_PACKAGE_NAME,
            protoPath: join(__dirname, './proto/mail-service.proto')
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAtStrategy, JwtVtStrategy, JwtRtStrategy]
})
export class AuthModule {}
