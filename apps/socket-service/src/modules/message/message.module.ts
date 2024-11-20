import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { MessageService } from './message.service';
import { MESSAGE_SERVICE } from '../../constants/services';

import { COM_MESSAGE_SERVICE_PACKAGE_NAME } from '@prj/types/grpc/message-service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MESSAGE_SERVICE,
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('MESSAGE_SERVICE_GRPC_URL'),
            package: COM_MESSAGE_SERVICE_PACKAGE_NAME,
            protoPath: join(__dirname, './proto/message-service.proto')
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}
