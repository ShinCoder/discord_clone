import { Controller } from '@nestjs/common';

import DmService from './dm.service';

import {
  CreateDirectMessageDto,
  GetDirectMessagesDto,
  MessageServiceDirectMessageModuleController,
  MessageServiceDirectMessageModuleControllerMethods
} from '@prj/types/grpc/message-service';

@Controller()
@MessageServiceDirectMessageModuleControllerMethods()
export default class DmController
  implements MessageServiceDirectMessageModuleController
{
  constructor(private readonly dmService: DmService) {}

  createDirectMessage(data: CreateDirectMessageDto) {
    return this.dmService.createDirectMessage(data);
  }

  getDirectMessages(data: GetDirectMessagesDto) {
    return this.dmService.getDirectMessages(data);
  }
}
