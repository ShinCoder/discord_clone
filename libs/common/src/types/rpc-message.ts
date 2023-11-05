import { HttpStatus } from '@nestjs/common';

import { MessageStatus, MessageStatusType } from './common';

export const getRpcSuccessMessage = <T>(code: HttpStatus, payload?: T) => ({
  status: {
    type: MessageStatusType.SUCCESS,
    statusCode: code
  },
  payload
});

export const getRpcErrorMessage = (code: HttpStatus, message?: string) => ({
  status: {
    type: MessageStatusType.ERROR,
    statusCode: code,
    message
  }
});

export interface IRpcResponseMessage<T> {
  status: MessageStatus;
  payload?: T;
}
