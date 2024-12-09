import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  WebSocketServer
} from '@nestjs/websockets';

import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message/message.service';
import { Client, SocketWithAuth } from './gateway.type';

import { SocketEvents } from '@prj/common';
import {
  IJoinDirectMessageRoomData,
  ILeaveDirectMessageRoomData,
  IReceiveDirectMessageDto,
  ISendDirectMessageData
} from '@prj/types/api';
import { ConnectionStatus } from '@prj/types/grpc/auth-service';
import { MessageType } from '@prj/types/grpc/message-service';
import { Server } from 'socket.io';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private clients: Array<Client>;

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService
  ) {
    this.clients = [];
  }

  private addClient(client: Client) {
    this.clients.push(client);
  }

  private removeClient(client: Client) {
    this.clients.splice(
      this.clients.findIndex(
        (e) =>
          e.accountId === client.accountId && e.socketId === client.socketId
      ),
      1
    );
  }

  async handleConnection(client: SocketWithAuth) {
    const auth = client.auth;

    await this.authService.updateConnectionStatus({
      accountId: auth.sub,
      status: ConnectionStatus.ONLINE
    });

    this.addClient({ accountId: auth.sub, socketId: client.id });
  }

  async handleDisconnect(client: SocketWithAuth) {
    const auth = client.auth;

    await this.authService.updateConnectionStatus({
      accountId: auth.sub,
      status: ConnectionStatus.OFFLINE
    });

    this.removeClient({ accountId: auth.sub, socketId: client.id });
  }

  @SubscribeMessage(SocketEvents.joinDirectMessageRoom)
  handleJoinDirectMessageRoom(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody() data: IJoinDirectMessageRoomData
  ) {
    client.join([client.auth.sub, data.targetId].sort().join('-'));
  }

  @SubscribeMessage(SocketEvents.leaveDirectMessageRoom)
  handleLeaveDirectMessageRoom(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody() data: ILeaveDirectMessageRoomData
  ) {
    client.leave([client.auth.sub, data.targetId].sort().join('-'));
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage(SocketEvents.sendDirectMessage)
  async handleSendDirectMessage(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody() data: ISendDirectMessageData
  ) {
    const message = await this.messageService.createDirectMessage({
      senderId: client.auth.sub,
      ...data,
      type: MessageType[data.type]
    });

    this.server
      .to([client.auth.sub, data.targetId].sort().join('-'))
      .emit(SocketEvents.receiveDirectMessage, {
        message: { ...message, type: MessageType[message.type] }
      } as IReceiveDirectMessageDto);
  }
}
