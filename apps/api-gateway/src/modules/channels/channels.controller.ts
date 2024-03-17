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

  @UseGuards(JwtAtGuard)
  @Post('direct-message')
  createDirectMessageChannel(
    @Req() req: IRequestWithUser,
    @Body() body: CreateDirectMessageChannelDto
  ) {
    if (!body.ownerIds.includes(req.user.sub))
      throw new ForbiddenException('Forbidden resource');

    return this.channelsService.createDirectMessageChannel({ ...body });
  }

  @UseGuards(JwtAtGuard)
  @Get('direct-message/:ownerId')
  getDirectMessageChannels(
    @Req() req: IRequestWithUser,
    @Param('ownerId') ownerId: string
  ): Promise<IGetDirectMessageChannelsResult> {
    if (req.user.sub !== ownerId)
      throw new ForbiddenException('Forbidden resource');

    return this.channelsService.getDirectMessageChannels({
      ownerId
    });
  }
}
