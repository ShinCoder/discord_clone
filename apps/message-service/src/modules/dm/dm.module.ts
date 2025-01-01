import { Module } from '@nestjs/common';

import { DmController } from './dm.controller';
import { DmService } from './dm.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [DmController],
  providers: [DmService]
})
export class DmModule {}
