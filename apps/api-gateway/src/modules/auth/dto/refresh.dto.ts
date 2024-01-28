import { IsNotEmpty, IsString } from 'class-validator';

import { IRefreshDto } from '@prj/types/api';

export class RefreshDto implements IRefreshDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
