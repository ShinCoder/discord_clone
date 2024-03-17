import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { MESSAGE_SERVICE } from '../../constants';
import { handleRpcResult } from '../../utils/rpc-message';

import {
  CreateDirectMessageChannelDto,
  GetDirectMessageChannelsDto,
  MESSAGE_SERVICE_DIRECT_MESSAGE_MODULE_SERVICE_NAME,
  MessageServiceDirectMessageModuleClient
} from '@prj/types/grpc/message-service';

@Injectable()
export class ChannelsService implements OnModuleInit {
  private messageServiceDirectMessageModule: MessageServiceDirectMessageModuleClient;

  constructor(
    @Inject(MESSAGE_SERVICE) private readonly messageClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.messageServiceDirectMessageModule =
      this.messageClient.getService<MessageServiceDirectMessageModuleClient>(
        MESSAGE_SERVICE_DIRECT_MESSAGE_MODULE_SERVICE_NAME
      );
  }

  async getDirectMessageChannels(data: GetDirectMessageChannelsDto) {
    const result = await lastValueFrom(
      this.messageServiceDirectMessageModule.getDirectMessageChannels(data)
    );

    const payload = handleRpcResult(result);

    return payload.channels ? payload : { channels: [] };
  }

  async createDirectMessageChannel(data: CreateDirectMessageChannelDto) {
    const result = await lastValueFrom(
      this.messageServiceDirectMessageModule.createDirectMessageChannel(data)
    );

    return handleRpcResult(result);
  }
}
