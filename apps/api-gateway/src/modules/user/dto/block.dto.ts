import { IsNotEmpty, IsString } from 'class-validator';

import { IBlockDto } from '@prj/types/api';

export class BlockDto implements IBlockDto {
  @IsNotEmpty()
  @IsString()
  targetId: string;
}
