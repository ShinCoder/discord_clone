import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { MESSAGE_SERVICE } from '../../constants';
import { GetDirectMessagesQuery } from './dto';
import { handleRpcResult } from '../../utils/rpc-message';

import {
  MESSAGE_SERVICE_DIRECT_MESSAGE_MODULE_SERVICE_NAME,
  MessageServiceDirectMessageModuleClient
} from '@prj/types/grpc/message-service';
import { MessageType } from '@prj/types/api';

@Injectable()
export class MessageService implements OnModuleInit {
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

  async getDirectMessages(data: GetDirectMessagesQuery) {
    const result = handleRpcResult(
      await lastValueFrom(
        this.messageServiceDirectMessageModule.getDirectMessages({ ...data })
      )
    );

    return {
      ...result,
      messages:
        result.messages?.map((e) => ({
          ...e,
          type: MessageType[e.type]
        })) || []
    };
  }
}
