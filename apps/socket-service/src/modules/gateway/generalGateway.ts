import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';

import { AuthService } from '../auth/auth.service';
import { SocketWithAuth } from './gateway.type';

import { ConnectionStatus } from '@prj/types/grpc/auth-service';

@WebSocketGateway({ namespace: 'general' })
export class GeneralGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly authService: AuthService) {}

  async handleConnection(client: SocketWithAuth) {
    const auth = client.auth;

    await this.authService.updateConnectionStatus({
      accountId: auth.sub,
      status: ConnectionStatus.ONLINE
    });
  }

  async handleDisconnect(client: SocketWithAuth) {
    const auth = client.auth;

    await this.authService.updateConnectionStatus({
      accountId: auth.sub,
      status: ConnectionStatus.OFFLINE
    });
  }
}
