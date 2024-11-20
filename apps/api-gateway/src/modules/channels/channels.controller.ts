import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';

import { ChannelsService } from './channels.service';
import { CreateDirectMessageChannelDto } from './dto';
import { IRequestWithUser } from '../../types';
import { JwtAtGuard } from '../../guards';

import { IGetDirectMessageChannelsResult } from '@prj/types/api';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}
}
