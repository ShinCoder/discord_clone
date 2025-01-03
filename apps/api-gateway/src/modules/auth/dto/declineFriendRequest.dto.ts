import { IsNotEmpty, IsString } from 'class-validator';

import { IDeclineFriendRequestDto } from '@prj/types/api';

export class DeclineFriendRequestDto implements IDeclineFriendRequestDto {
  @IsNotEmpty()
  @IsString()
  targetId: string;
}
