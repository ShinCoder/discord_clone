import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { AppModule } from './modules/app/app.module';

import { COM_MAIL_SERVICE_PACKAGE_NAME } from '@prj/types/grpc/mail-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: configService.get<string>('GRPC_URL'),
        package: COM_MAIL_SERVICE_PACKAGE_NAME,
        protoPath: join(__dirname, './proto/mail-service.proto')
      }
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();
}

bootstrap();
