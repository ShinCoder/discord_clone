import { IsArray } from 'class-validator';

import { ICreateDirectMessageChannelDto } from '@prj/types/api';

export class CreateDirectMessageChannelDto
  implements ICreateDirectMessageChannelDto
{
  @IsArray()
  ownerIds: Array<string>;
}
