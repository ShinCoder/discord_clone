import { Controller } from '@nestjs/common';

import { MessagesService } from './messages.service';

import {
  GetChannelMessagesDto,
  MessageServiceMessageModuleController,
  MessageServiceMessageModuleControllerMethods
} from '@prj/types/grpc/message-service';

@Controller()
@MessageServiceMessageModuleControllerMethods()
export class MessagesController
  implements MessageServiceMessageModuleController
{
  constructor(private readonly messagesService: MessagesService) {}

  getChannelMessages(data: GetChannelMessagesDto) {
    return this.messagesService.getChannelMessages(data);
  }
}
