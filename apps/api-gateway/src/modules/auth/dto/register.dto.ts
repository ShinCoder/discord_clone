import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsString,
  IsOptional,
  IsDate,
  Validate
} from 'class-validator';
import { Type } from 'class-transformer';

import { AgeRestrictConstraint } from '../../../utils';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @IsStrongPassword({ minLength: 1 })
  password: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @Validate(AgeRestrictConstraint)
  dateOfBirth: Date;
}
