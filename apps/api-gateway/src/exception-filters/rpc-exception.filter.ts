import {
  ArgumentsHost,
  Catch,
  InternalServerErrorException,
  RpcExceptionFilter
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class GlobalRpcExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const error: any = exception.getError();

    // console.log(error);

    return throwError(() => new InternalServerErrorException());
  }
}
