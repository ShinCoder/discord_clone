import { IsNotEmpty, IsUUID } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty()
  @IsUUID()
  accountId: string;
}
