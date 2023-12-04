import {
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  IsString,
  IsOptional,
  IsDate,
  Validate,
  IsBoolean
} from 'class-validator';
import { Type } from 'class-transformer';

import { AgeRestrictConstraint, DateConstraint } from '../../../utils';

import { IRegisterDto } from '@prj/types/api';

export class RegisterDto implements IRegisterDto {
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
  @IsString()
  @Validate(DateConstraint)
  @Validate(AgeRestrictConstraint)
  dateOfBirth: string;

  @IsNotEmpty()
  @IsBoolean()
  emailSubscribe: boolean;
}
