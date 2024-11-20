import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MESSAGE_SERVICE } from '../../constants';

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
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
