import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { MESSAGE_SERVICE } from '../../constants/services';
import { handleRpcResult } from '../../utils';

import {
  CreateDirectMessageDto,
  MESSAGE_SERVICE_DIRECT_MESSAGE_MODULE_SERVICE_NAME,
  MessageServiceDirectMessageModuleClient
} from '@prj/types/grpc/message-service';

@Injectable()
export class MessageService implements OnModuleInit {
  private messageServiceDmModule: MessageServiceDirectMessageModuleClient;

  constructor(
    @Inject(MESSAGE_SERVICE) private readonly messageClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.messageServiceDmModule =
      this.messageClient.getService<MessageServiceDirectMessageModuleClient>(
        MESSAGE_SERVICE_DIRECT_MESSAGE_MODULE_SERVICE_NAME
      );
  }

  async createDirectMessage(data: CreateDirectMessageDto) {
    return handleRpcResult(
      await lastValueFrom(this.messageServiceDmModule.createDirectMessage(data))
    );
  }
}
