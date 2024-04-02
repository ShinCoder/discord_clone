import { IsNotEmpty, IsString } from 'class-validator';

import { IAcceptFriendRequestDto } from '@prj/types/api';

export class AcceptFriendRequestDto implements IAcceptFriendRequestDto {
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  targetId: string;
}
