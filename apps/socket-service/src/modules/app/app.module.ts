import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.string()
      }),
      envFilePath: '.env'
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
