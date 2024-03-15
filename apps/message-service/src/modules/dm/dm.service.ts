import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

import { Channels, ChannelTypes } from '@prisma/message-client';

import { PrismaService } from '../prisma/prisma.service';
import { handleThrowError } from '../../utlis';

import {
  ChannelDto,
  CreateDirectMessageChannelDto,
  CreateDirectMessageChannelResult,
  GetDirectMessageChannelsDto,
  GetDirectMessageChannelsResult,
  ChannelTypes as RpcChannelTypes
} from '@prj/types/grpc/message-service';
import { getRpcSuccessMessage } from '@prj/common';

@Injectable()
export default class DmService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private toChannelDto(data: Channels): ChannelDto {
    return {
      id: data.id,
      type: RpcChannelTypes[data.type],
      ownerIds: data.ownerIds,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString()
    };
  }

  async getChannels(
    data: GetDirectMessageChannelsDto
  ): Promise<GetDirectMessageChannelsResult> {
    try {
      const channels = await this.prismaService.channels.findMany({
        where: {
          ownerIds: {
            has: data.ownerId
          }
        }
      });

      return getRpcSuccessMessage(HttpStatus.OK, {
        channels: channels.map((e) => this.toChannelDto(e))
      });
    } catch (err) {
      return handleThrowError(err);
    }
  }

  async createChannel(
    data: CreateDirectMessageChannelDto
  ): Promise<CreateDirectMessageChannelResult> {
    try {
      if (data.ownerIds.length < 2)
        throw new RpcException(new BadRequestException());

      await this.prismaService.$transaction(async (tx) => {
        const existed = await tx.channels.findFirst({
          where: {
            ownerIds: {
              hasEvery: data.ownerIds
            }
          }
        });

        if (existed)
          throw new RpcException(new ConflictException('Channel existed'));

        await tx.channels.create({
          data: {
            type: ChannelTypes.DIRECT_MESSAGE,
            ownerIds: data.ownerIds
          }
        });
      });

      return getRpcSuccessMessage(HttpStatus.CREATED);
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
