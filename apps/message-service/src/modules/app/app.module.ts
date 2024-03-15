import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import joi from 'joi';

import DmModule from '../dm/dm.module';
import MessagesModule from '../messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({ DATABASE_URL: joi.string().required() }),
      envFilePath: '.env'
    }),
    DmModule,
    MessagesModule
  ]
})
export class AppModule {}
