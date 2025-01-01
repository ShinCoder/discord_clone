import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import joi from 'joi';

import { DmModule } from '../dm/dm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().required(),
        GRPC_URL: joi.string().required(),
        AUTH_SERVICE_GRPC_URL: joi.string().required()
      }),
      envFilePath: '.env'
    }),
    DmModule
  ]
})
export class AppModule {}
