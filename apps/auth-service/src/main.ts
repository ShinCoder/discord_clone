import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './modules/app/app.module';
import { GlobalRpcExceptionFilter } from './exception-filters/rpc-exception.filter';

import { COM_AUTH_SERVICE_PACKAGE_NAME } from '@prj/types/grpc/auth-service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const configService = appContext.get<ConfigService>(ConfigService);

  appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: configService.get<string>('GRPC_URL'),
        package: COM_AUTH_SERVICE_PACKAGE_NAME,
        protoPath: join(__dirname, './proto/auth-service.proto')
      }
    }
  );

  app.useGlobalFilters(new GlobalRpcExceptionFilter());

  await app.listen();
}

bootstrap();
