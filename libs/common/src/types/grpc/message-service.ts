/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MessageStatus } from './common';

export const protobufPackage = 'com.message_service';

export enum ChannelTypes {
  DIRECT_MESSAGE = 0,
  GROUP_CHANNEL = 1,
  UNRECOGNIZED = -1
}

export enum MessageTypes {
  TEXT = 0,
  IMAGE = 1,
  UNRECOGNIZED = -1
}

export interface ChannelDto {
  id: string;
  type: ChannelTypes;
  ownerIds: string[];
  serverId?: string | undefined;
  name?: string | undefined;
  topic?: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelsDto {
  channels: ChannelDto[];
}

export interface GetDirectMessageChannelsDto {
  ownerId: string;
}

export interface GetDirectMessageChannelsResult {
  status: MessageStatus | undefined;
  payload?: ChannelsDto | undefined;
}

export interface MessageDto {
  id: string;
  senderId: string;
  channelId: string;
  content: string;
  type: MessageTypes;
  createdAt: string;
  updatedAt: string;
}

export interface MessagesDto {
  messages: MessageDto[];
  totalPage: number;
}

export interface GetChannelMessagesDto {
  id: string;
  take: number;
  page: number;
}

export interface GetChannelMessagesResult {
  status: MessageStatus | undefined;
  payload?: MessagesDto | undefined;
}

export interface CreateDirectMessageChannelDto {
  ownerIds: string[];
}

export interface CreateDirectMessageChannelResult {
  status: MessageStatus | undefined;
}

export const COM_MESSAGE_SERVICE_PACKAGE_NAME = 'com.message_service';

export interface MessageServiceDirectMessageModuleClient {
  getDirectMessageChannels(
    request: GetDirectMessageChannelsDto
  ): Observable<GetDirectMessageChannelsResult>;

  createDirectMessageChannel(
    request: CreateDirectMessageChannelDto
  ): Observable<CreateDirectMessageChannelResult>;
}

export interface MessageServiceDirectMessageModuleController {
  getDirectMessageChannels(
    request: GetDirectMessageChannelsDto
  ):
    | Promise<GetDirectMessageChannelsResult>
    | Observable<GetDirectMessageChannelsResult>
    | GetDirectMessageChannelsResult;

  createDirectMessageChannel(
    request: CreateDirectMessageChannelDto
  ):
    | Promise<CreateDirectMessageChannelResult>
    | Observable<CreateDirectMessageChannelResult>
    | CreateDirectMessageChannelResult;
}

export function MessageServiceDirectMessageModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getDirectMessageChannels',
      'createDirectMessageChannel'
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('MessageServiceDirectMessageModule', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('MessageServiceDirectMessageModule', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const MESSAGE_SERVICE_DIRECT_MESSAGE_MODULE_SERVICE_NAME =
  'MessageServiceDirectMessageModule';

export interface MessageServiceMessageModuleClient {
  getChannelMessages(
    request: GetChannelMessagesDto
  ): Observable<GetChannelMessagesResult>;
}

export interface MessageServiceMessageModuleController {
  getChannelMessages(
    request: GetChannelMessagesDto
  ):
    | Promise<GetChannelMessagesResult>
    | Observable<GetChannelMessagesResult>
    | GetChannelMessagesResult;
}

export function MessageServiceMessageModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getChannelMessages'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('MessageServiceMessageModule', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('MessageServiceMessageModule', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const MESSAGE_SERVICE_MESSAGE_MODULE_SERVICE_NAME =
  'MessageServiceMessageModule';
