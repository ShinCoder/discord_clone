import { HttpException } from '@nestjs/common';
import { IRpcResponseMessage } from '@prj/common';
import { MessageStatusType } from '@prj/types/grpc/common';

export const handleRpcResult = <T>(result: IRpcResponseMessage<T>) => {
  if (result.status.type === MessageStatusType.SUCCESS) return result.payload;

  throw new HttpException(
    result.status.message || 'Unknown error',
    result.status.statusCode
  );
};
