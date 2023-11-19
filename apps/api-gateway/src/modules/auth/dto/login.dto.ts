import { IsNotEmpty, IsString } from 'class-validator';

import { ILoginDto } from '@prj/types/api';

export class LoginDto implements ILoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
