import { IsNotEmpty, IsUUID } from 'class-validator';

import { ILogoutDto } from '@prj/types/api';

export class LogoutDto implements ILogoutDto {
  @IsNotEmpty()
  @IsUUID()
  accountId: string;
}
