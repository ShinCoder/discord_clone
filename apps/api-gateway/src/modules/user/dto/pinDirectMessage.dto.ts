import { IsNotEmpty, IsString } from 'class-validator';

import { IPinDmDto } from '@prj/types/api';

export class PinDirectMessageDto implements IPinDmDto {
  @IsNotEmpty()
  @IsString()
  targetId: string;
}
