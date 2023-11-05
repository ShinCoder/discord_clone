import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import joi from 'joi';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.string(),
        GRPC_URL: joi.string().required(),
        JWT_AT_PUBLIC: joi.string().required(),
        JWT_RT_PUBLIC: joi.string().required(),
        JWT_VT_PUBLIC: joi.string().required(),
        JWT_RST_PUBLIC: joi.string().required()
      }),
      envFilePath: '.env'
    }),
    AuthModule
  ]
})
export class AppModule {}
