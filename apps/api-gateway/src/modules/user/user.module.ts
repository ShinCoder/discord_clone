import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { AUTH_SERVICE } from '../../constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { COM_AUTH_SERVICE_PACKAGE_NAME } from '@prj/types/grpc/auth-service';

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
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
