import { Controller } from '@nestjs/common';

import {
  AuthServiceSettingModuleController,
  AuthServiceSettingModuleControllerMethods,
  GetAccountWithSettingsDto,
  GetAccountWithSettingsResult,
  PinDmDto,
  PinDmResult,
  UnpinDmDto,
  UnpinDmResult
} from '@prj/types/grpc/auth-service';
import { UserSettingsService } from './userSettings.service';

@Controller()
@AuthServiceSettingModuleControllerMethods()
export class UserSettingsController
  implements AuthServiceSettingModuleController
{
  constructor(private readonly userSettingsService: UserSettingsService) {}

  getAccountWithSettings(
    data: GetAccountWithSettingsDto
  ): Promise<GetAccountWithSettingsResult> {
    return this.userSettingsService.getAccountWithSettings(data);
  }

  pinDm(data: PinDmDto): Promise<PinDmResult> {
    return this.userSettingsService.pinDm(data);
  }

  unpinDm(data: UnpinDmDto): Promise<UnpinDmResult> {
    return this.userSettingsService.unpinDm(data);
  }
}
