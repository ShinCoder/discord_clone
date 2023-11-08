import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RefreshDto {
  @IsNotEmpty()
  @IsUUID()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
