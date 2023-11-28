/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MessageStatus } from './common';

export const protobufPackage = 'com.mail_service';

export interface VerifyEmailDto {
  email: string;
  input: VerifyEmailDto_VerifyEmailDtoInput | undefined;
}

export interface VerifyEmailDto_VerifyEmailDtoInput {
  name: string;
  link: string;
}

export interface SendVerifyEmailResult {
  status: MessageStatus | undefined;
}

export const COM_MAIL_SERVICE_PACKAGE_NAME = 'com.mail_service';

export interface MailServiceAuthModuleClient {
  sendVerifyEmail(request: VerifyEmailDto): Observable<SendVerifyEmailResult>;
}

export interface MailServiceAuthModuleController {
  sendVerifyEmail(
    request: VerifyEmailDto
  ):
    | Promise<SendVerifyEmailResult>
    | Observable<SendVerifyEmailResult>
    | SendVerifyEmailResult;
}

export function MailServiceAuthModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['sendVerifyEmail'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('MailServiceAuthModule', method)(
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
      GrpcStreamMethod('MailServiceAuthModule', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const MAIL_SERVICE_AUTH_MODULE_SERVICE_NAME = 'MailServiceAuthModule';
