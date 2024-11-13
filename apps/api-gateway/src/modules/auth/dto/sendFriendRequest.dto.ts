import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ISendFriendRequestDto } from '@prj/types/api';

export class SendFriendRequestDto implements ISendFriendRequestDto {
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @IsOptional()
  @IsString()
  targetId?: string;

  @IsOptional()
  @IsString()
  targetUsername?: string;
}
