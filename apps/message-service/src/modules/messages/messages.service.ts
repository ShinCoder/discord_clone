import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Messages } from '@prisma/message-client';

import { PrismaService } from '../prisma/prisma.service';
import { handleThrowError } from '../../utils';

import {
  GetChannelMessagesDto,
  GetChannelMessagesResult,
  MessageDto,
  MessageType as RpcMessageType
} from '@prj/types/grpc/message-service';
import { getRpcSuccessMessage } from '@prj/common';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private toMessageDto(data: Messages): MessageDto {
    return {
      id: data.id,
      senderId: data.senderId,
      channelId: data.channelId,
      content: data.content,
      type: RpcMessageType[data.type],
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString()
    };
  }

  async getChannelMessages(
    data: GetChannelMessagesDto
  ): Promise<GetChannelMessagesResult> {
    try {
      const messages = await this.prismaService.messages.findMany({
        where: {
          channelId: data.id
        }
      });

      return getRpcSuccessMessage(HttpStatus.OK, {
        messages: messages.map((e) => this.toMessageDto(e)),
        totalPages: 1 // !TEMPORARY ONLY
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
