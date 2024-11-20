/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MessageStatus } from './common';

export const protobufPackage = 'com.message_service';

export enum MessageType {
  TEXT = 0,
  IMAGE = 1,
  UNRECOGNIZED = -1
}

export interface ChannelDto {
  id: string;
  ownerId: string[];
  serverId?: string | undefined;
  name?: string | undefined;
  topic?: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelsDto {
  channels: ChannelDto[];
}

export interface MessageDto {
  id: string;
  senderId: string;
  channelId: string;
  content: string;
  type: MessageType;
  createdAt: string;
  updatedAt: string;
}

export interface MessagesDto {
  messages: MessageDto[];
  totalPages: number;
}

export interface GetChannelMessagesDto {
  id: string;
  page: number;
  take: number;
}

export interface GetChannelMessagesResult {
  status: MessageStatus | undefined;
  payload?: MessagesDto | undefined;
}

export interface DirectMessageDto {
  id: string;
  senderId: string;
  targetId: string;
  content: string;
  type: MessageType;
  createdAt: string;
  updatedAt: string;
}

export interface DirectMessagesDto {
  messages: DirectMessageDto[];
  totalPages: number;
}

export interface CreateDirectMessageDto {
  senderId: string;
  targetId: string;
  content: string;
  type: MessageType;
}

export interface CreateDirectMessageResult {
  status: MessageStatus | undefined;
  payload?: DirectMessageDto | undefined;
}

export interface GetDirectMessagesDto {
  senderId: string;
  targetId: string;
  take: number;
  page?: number | undefined;
  skip?: number | undefined;
}

export interface GetDirectMessagesResult {
  status: MessageStatus | undefined;
  payload?: DirectMessagesDto | undefined;
}

export const COM_MESSAGE_SERVICE_PACKAGE_NAME = 'com.message_service';

export interface MessageServiceDirectMessageModuleClient {
  createDirectMessage(
    request: CreateDirectMessageDto
  ): Observable<CreateDirectMessageResult>;

  getDirectMessages(
    request: GetDirectMessagesDto
  ): Observable<GetDirectMessagesResult>;
}

export interface MessageServiceDirectMessageModuleController {
  createDirectMessage(
    request: CreateDirectMessageDto
  ):
    | Promise<CreateDirectMessageResult>
    | Observable<CreateDirectMessageResult>
    | CreateDirectMessageResult;

  getDirectMessages(
    request: GetDirectMessagesDto
  ):
    | Promise<GetDirectMessagesResult>
    | Observable<GetDirectMessagesResult>
    | GetDirectMessagesResult;
}

export function MessageServiceDirectMessageModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createDirectMessage', 'getDirectMessages'];
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
