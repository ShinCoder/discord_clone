import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import joi from 'joi';

import { AuthModule } from '../auth/auth.module';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        DATABASE_URL: joi.string().required(),
        GRPC_URL: joi.string().required(),
        JWT_AT_SECRET: joi.string().required(),
        JWT_RT_SECRET: joi.string().required(),
        JWT_VT_SECRET: joi.string().required(),
        JWT_RST_SECRET: joi.string().required(),
        JWT_AT_EXPIRES: joi.string().required(),
        JWT_RT_EXPIRES: joi.string().required(),
        JWT_VT_EXPIRES: joi.string().required(),
        JWT_RST_EXPIRES: joi.string().required()
      }),
      envFilePath: '.env'
    }),
    AuthModule,
    AccountModule
  ]
})
export class AppModule {}
