import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import joi from 'joi';

import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.string(),
        AUTH_SERVICE_GRPC_URL: joi.string().required(),
        MESSAGE_SERVICE_GRPC_URL: joi.string().required(),
        ALLOW_ORIGINS: joi.string().required(),
        JWT_AT_PUBLIC: joi.string().required()
      }),
      envFilePath: '.env'
    }),
    GatewayModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
