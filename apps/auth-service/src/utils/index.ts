import { InternalServerErrorException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { getRpcErrorMessage } from '@prj/common';

export const handleThrowError = (err) => {
  if (err instanceof RpcException) {
    const error: any = err.getError();
    if (error.response)
      return getRpcErrorMessage(
        error.response.statusCode,
        error.response.message || 'Unknown error'
      );
  }

  throw new RpcException(new InternalServerErrorException(err));
};
