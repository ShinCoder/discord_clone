import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import joi from 'joi';

import { AuthModule } from '../auth/auth.module';
import { CustomLoggerMiddleware } from '../../middlewares/custom-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.string(),
        AUTH_SERVICE_GRPC_URL: joi.string().required(),
        MAIL_SERVICE_GRPC_URL: joi.string().required(),
        JWT_AT_PUBLIC: joi.string().required(),
        JWT_RT_PUBLIC: joi.string().required(),
        JWT_VT_PUBLIC: joi.string().required(),
        JWT_RST_PUBLIC: joi.string().required(),
        ALLOW_ORIGIN: joi.string(),
        WEBAPP_BASE_URL: joi.string().required()
      }),
      envFilePath: '.env'
    }),
    AuthModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomLoggerMiddleware).forRoutes('*');
  }
}
