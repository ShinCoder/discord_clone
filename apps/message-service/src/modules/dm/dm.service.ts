import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { DirectMessages, MessageTypes, Prisma } from '@prisma/message-client';

import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { handleThrowError } from '../../utils';

import {
  CreateDirectMessageDto,
  DirectMessageDto,
  GetDirectMessagesDto,
  MessageType as RpcMessageType
} from '@prj/types/grpc/message-service';
import { ApiErrorMessages, getRpcSuccessMessage } from '@prj/common';
import { RelationshipStatus as RpcRelationshipStatus } from '@prj/types/grpc/auth-service';

@Injectable()
export class DmService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService
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
      const target = await this.authService.getAccount({
        id: data.targetId,
        includeRelationshipWith: data.senderId
      });

      if (target.relationship.status === RpcRelationshipStatus.BLOCKED) {
        throw new RpcException(
          new ConflictException(ApiErrorMessages.SEND_DM__BLOCKED)
        );
      }

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
