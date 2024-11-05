/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './modules/app/app.module';
import { SocketIOAdapter } from './modules/gateway/socket-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));

  const port = configService.get<string>('PORT') || 3001;
  await app.listen(port);
}

bootstrap();
