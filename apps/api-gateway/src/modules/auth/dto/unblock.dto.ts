import { IsNotEmpty, IsString } from 'class-validator';

import { IUnblockDto } from '@prj/types/api';

export class UnblockDto implements IUnblockDto {
  @IsNotEmpty()
  @IsString()
  targetId: string;
}
