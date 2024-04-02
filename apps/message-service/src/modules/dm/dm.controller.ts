import { Controller } from '@nestjs/common';

import DmService from './dm.service';

import {
  CreateDirectMessageChannelDto,
  GetDirectMessageChannelsDto,
  MessageServiceDirectMessageModuleController,
  MessageServiceDirectMessageModuleControllerMethods
} from '@prj/types/grpc/message-service';

@Controller()
@MessageServiceDirectMessageModuleControllerMethods()
export default class DmController
  implements MessageServiceDirectMessageModuleController
{
  constructor(private readonly dmService: DmService) {}

  getDirectMessageChannels(data: GetDirectMessageChannelsDto) {
    return this.dmService.getChannels(data);
  }

  createDirectMessageChannel(data: CreateDirectMessageChannelDto) {
    return this.dmService.createChannel(data);
  }
}
