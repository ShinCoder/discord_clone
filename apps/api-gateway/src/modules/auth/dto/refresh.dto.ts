import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { IRefreshDto } from '@prj/types/api';

export class RefreshDto implements IRefreshDto {
  @IsNotEmpty()
  @IsUUID()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
