import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DirectMessages, MessageTypes, Prisma } from '@prisma/message-client';

import { PrismaService } from '../prisma/prisma.service';
import { handleThrowError } from '../../utlis';

import {
  CreateDirectMessageDto,
  DirectMessageDto,
  GetDirectMessagesDto,
  MessageType as RpcMessageType
} from '@prj/types/grpc/message-service';
import { getRpcSuccessMessage } from '@prj/common';

@Injectable()
export default class DmService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private toDirectMessageDto(data: DirectMessages): DirectMessageDto {
    return {
      ...data,
      type: RpcMessageType[data.type],
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString()
    };
  }

  async createDirectMessage(data: CreateDirectMessageDto) {
    try {
      const message = await this.prismaService.directMessages.create({
        data: {
          ...data,
          type: MessageTypes[RpcMessageType[data.type]]
        }
      });

      return getRpcSuccessMessage(
        HttpStatus.CREATED,
        this.toDirectMessageDto(message)
      );
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async getDirectMessages(data: GetDirectMessagesDto) {
    try {
      const query = {
        where: {
          OR: [
            {
              senderId: data.senderId,
              targetId: data.targetId
            },
            {
              senderId: data.targetId,
              targetId: data.senderId
            }
          ]
        },
        take: data.take,
        skip: data.skip || (data.page ? data.take * (data.page - 1) : 0),
        orderBy: {
          createdAt: 'desc'
        }
      } satisfies Prisma.DirectMessagesFindManyArgs;

      const [messages, count] = await this.prismaService.$transaction(
        async (tx) => {
          return [
            await tx.directMessages.findMany(query),
            await tx.directMessages.count({ where: query.where })
          ];
        }
      );

      return getRpcSuccessMessage(HttpStatus.OK, {
        messages: messages.map((e) => this.toDirectMessageDto(e)),
        totalPages: count / data.take + (count % data.take === 0 ? 0 : 1)
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
