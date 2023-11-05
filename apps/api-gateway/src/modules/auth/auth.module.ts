import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { AUTH_SERVICE } from '../../constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { COM_AUTH_SERVICE_PACKAGE_NAME } from '@prj/grpc/auth-service';
import { JwtVtStrategy } from '../../strategies';
import { JwtAtStrategy } from '../../strategies';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('GRPC_URL'),
            package: COM_AUTH_SERVICE_PACKAGE_NAME,
            protoPath: join(__dirname, './proto/auth-service.proto')
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAtStrategy, JwtVtStrategy]
})
export class AuthModule {}
