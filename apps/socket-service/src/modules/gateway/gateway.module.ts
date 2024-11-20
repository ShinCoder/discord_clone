import { Module } from '@nestjs/common';

import { ChatGateway } from './chatGateway';
import { AuthModule } from '../auth/auth.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [AuthModule, MessageModule],
  providers: [ChatGateway]
})
export class GatewayModule {}
