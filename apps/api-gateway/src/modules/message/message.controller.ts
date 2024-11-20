import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { MessageService } from './message.service';
import { GetDirectMessagesQuery } from './dto';
import { JwtAtGuard } from '../../guards';

import { IGetDirectMessagesResult } from '@prj/types/api';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAtGuard)
  @Get('/direct-messages')
  async getDirectMessages(
    @Query() query: GetDirectMessagesQuery
  ): Promise<IGetDirectMessagesResult> {
    return this.messageService.getDirectMessages(query);
  }
}
