/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MessageStatus } from './common';

export const protobufPackage = 'com.auth_service';

export enum AccountStatus {
  NOT_VERIFIED = 0,
  ACTIVE = 1,
  DISABLED = 2,
  UNRECOGNIZED = -1
}

export interface RegisterDto {
  email: string;
  password: string;
  username: string;
  displayName?: string | undefined;
  dateOfBirth: string;
}

export interface RegisterResult {
  status: MessageStatus | undefined;
  payload?: RegisterResult_VerifyTokenDto | undefined;
}

export interface RegisterResult_VerifyTokenDto {
  verifyToken: string;
}

export interface LoginDto {
  email?: string | undefined;
  phoneNumber?: string | undefined;
  password: string;
}

export interface LoginResult {
  status: MessageStatus | undefined;
  payload?: LoginResult_TokenDto | undefined;
}

export interface LoginResult_TokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyDto {
  id: string;
}

export interface VerifyResult {
  status: MessageStatus | undefined;
}

export interface AccountDto {
  id: string;
  email: string;
  username: string;
  displayName?: string | undefined;
  dateOfBirth: string;
  phoneNumber?: string | undefined;
  avatar: string;
  status: AccountStatus;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAccountDto {
  id: string;
}

export interface GetAccountResult {
  status: MessageStatus | undefined;
  payload?: AccountDto | undefined;
}

export interface AccountsDto {
  accounts: AccountDto[];
}

export interface GetAccountsDto {}

export interface GetAccountsResult {
  status: MessageStatus | undefined;
  payload?: AccountsDto | undefined;
}

export const COM_AUTH_SERVICE_PACKAGE_NAME = 'com.auth_service';

export interface AuthServiceAuthModuleClient {
  register(request: RegisterDto): Observable<RegisterResult>;

  login(request: LoginDto): Observable<LoginResult>;

  verify(request: VerifyDto): Observable<VerifyResult>;
}

export interface AuthServiceAuthModuleController {
  register(
    request: RegisterDto
  ): Promise<RegisterResult> | Observable<RegisterResult> | RegisterResult;

  login(
    request: LoginDto
  ): Promise<LoginResult> | Observable<LoginResult> | LoginResult;

  verify(
    request: VerifyDto
  ): Promise<VerifyResult> | Observable<VerifyResult> | VerifyResult;
}

export function AuthServiceAuthModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'login', 'verify'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('AuthServiceAuthModule', method)(
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
      GrpcStreamMethod('AuthServiceAuthModule', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const AUTH_SERVICE_AUTH_MODULE_SERVICE_NAME = 'AuthServiceAuthModule';

export interface AuthServiceAccountModuleClient {
  getAccount(request: GetAccountDto): Observable<GetAccountResult>;

  getAccounts(request: GetAccountsDto): Observable<GetAccountsResult>;
}

export interface AuthServiceAccountModuleController {
  getAccount(
    request: GetAccountDto
  ):
    | Promise<GetAccountResult>
    | Observable<GetAccountResult>
    | GetAccountResult;

  getAccounts(
    request: GetAccountsDto
  ):
    | Promise<GetAccountsResult>
    | Observable<GetAccountsResult>
    | GetAccountsResult;
}

export function AuthServiceAccountModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getAccount', 'getAccounts'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('AuthServiceAccountModule', method)(
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
      GrpcStreamMethod('AuthServiceAccountModule', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const AUTH_SERVICE_ACCOUNT_MODULE_SERVICE_NAME =
  'AuthServiceAccountModule';
