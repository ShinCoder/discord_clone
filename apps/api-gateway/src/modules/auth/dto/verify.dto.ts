import { IVerifyDto } from '@prj/types/api';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyDto implements IVerifyDto {
  @IsNotEmpty()
  @IsString()
  verifyToken: string;
}
