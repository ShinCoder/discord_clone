import { IsNotEmpty, IsString } from 'class-validator';

import { ISendFriendRequestDto } from '@prj/types/api';

export class SendFriendRequestDto implements ISendFriendRequestDto {
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  targetId: string;
}
