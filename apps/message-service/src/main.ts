import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './modules/app/app.module';
import { GlobalRpcExceptionFilter } from './exception-filters/rpc-exception.filter';
import { COM_MESSAGE_SERVICE_PACKAGE_NAME } from '@prj/types/grpc/message-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalFilters(new GlobalRpcExceptionFilter());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        url: configService.get<string>('GRPC_URL'),
        package: COM_MESSAGE_SERVICE_PACKAGE_NAME,
        protoPath: join(__dirname, './proto/message-service.proto')
      }
    },
    { inheritAppConfig: true }
  );

  await app.startAllMicroservices();
}

bootstrap();
