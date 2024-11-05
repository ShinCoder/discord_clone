import { Socket } from 'socket.io';

import { AuthPayload } from '../auth/auth.type';

export type SocketWithAuth = Socket & {
  auth: AuthPayload;
};
