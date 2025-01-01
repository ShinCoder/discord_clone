import { Controller } from '@nestjs/common';

import { DmService } from './dm.service';

import {
  CreateDirectMessageDto,
  CreateDirectMessageResult,
  GetDirectMessagesDto,
  GetDirectMessagesResult,
  MessageServiceDirectMessageModuleController,
  MessageServiceDirectMessageModuleControllerMethods
} from '@prj/types/grpc/message-service';

@Controller()
@MessageServiceDirectMessageModuleControllerMethods()
export class DmController
  implements MessageServiceDirectMessageModuleController
{
  constructor(private readonly dmService: DmService) {}

  createDirectMessage(
    data: CreateDirectMessageDto
  ): Promise<CreateDirectMessageResult> {
    return this.dmService.createDirectMessage(data);
  }

  getDirectMessages(
    data: GetDirectMessagesDto
  ): Promise<GetDirectMessagesResult> {
    return this.dmService.getDirectMessages(data);
  }
}
