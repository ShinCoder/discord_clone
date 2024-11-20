import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';

import { AUTH_SERVICE } from '../../constants/services';
import { AuthService } from './auth.service';

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
    ]),
    JwtModule.register({
      signOptions: {
        algorithm: 'RS256'
      }
    })
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
