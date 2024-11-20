import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { MESSAGE_SERVICE } from '../../constants';
import { handleRpcResult } from '../../utils/rpc-message';

import {
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
}
