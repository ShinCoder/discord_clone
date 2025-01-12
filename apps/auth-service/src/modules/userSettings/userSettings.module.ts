import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UserSettingsController } from './userSettings.controller';
import { UserSettingsService } from './userSettings.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserSettingsController],
  providers: [UserSettingsService]
})
export class UserSettingsModule {}
