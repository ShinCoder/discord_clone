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

export enum RelationshipStatus {
  REQUESTING = 0,
  PENDING = 1,
  FRIEND = 2,
  BLOCKED = 3,
  BEING_BLOCKED = 4,
  UNRECOGNIZED = -1
}

export enum ConnectionStatus {
  ONLINE = 0,
  OFFLINE = 1,
  UNRECOGNIZED = -1
}

export interface RelationshipDto {
  id: string;
  accountId: string;
  targetId: string;
  status: RelationshipStatus;
  previousStatus?: RelationshipStatus | undefined;
  createdAt: string;
  updatedAt: string;
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

export interface TokenDto {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResult {
  status: MessageStatus | undefined;
  payload?: TokenDto | undefined;
}

export interface VerifyDto {
  id: string;
}

export interface VerifyResult {
  status: MessageStatus | undefined;
}

export interface RefreshDto {
  accountId: string;
  refreshToken: string;
}

export interface RefreshResult {
  status: MessageStatus | undefined;
  payload?: TokenDto | undefined;
}

export interface LogoutDto {
  accountId: string;
}

export interface LogoutResult {
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
  pronouns?: string | undefined;
  about?: string | undefined;
  bannerColor: string;
  status: AccountStatus;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  relationshipWith?: RelationshipDto | undefined;
  connectionStatus: ConnectionStatus;
}

export interface GetAccountDto {
  id?: string | undefined;
  username?: string | undefined;
  status?: AccountStatus | undefined;
  includeRelationshipWith?: string | undefined;
}

export interface GetAccountResult {
  status: MessageStatus | undefined;
  payload?: AccountDto | undefined;
}

export interface AccountsDto {
  accounts: AccountDto[];
}

export interface GetAccountsDto {
  haveRelationshipWith?: string | undefined;
  relationshipStatus?: RelationshipStatus | undefined;
}

export interface GetAccountsResult {
  status: MessageStatus | undefined;
  payload?: AccountsDto | undefined;
}

export interface RelationshipWriteDto {
  id: string;
  status: RelationshipStatus;
}

export interface CreateOrUpdateRelationshipDto {
  account: RelationshipWriteDto | undefined;
  target: RelationshipWriteDto | undefined;
}

export interface CreateOrUpdateRelationshipResult {
  status: MessageStatus | undefined;
}

export interface DeleteRelationshipDto {
  accountId: string;
  targetId: string;
}

export interface DeleteRelationshipResult {
  status: MessageStatus | undefined;
}

export interface GetFriendsDto {
  accountId: string;
}

export interface GetFriendsResult {
  status: MessageStatus | undefined;
  payload?: AccountsDto | undefined;
}

export interface UpdateConnectionStatusDto {
  accountId: string;
  status: ConnectionStatus;
}

export interface UpdateConnectionStatusResult {
  status: MessageStatus | undefined;
}

export const COM_AUTH_SERVICE_PACKAGE_NAME = 'com.auth_service';

export interface AuthServiceAuthModuleClient {
  register(request: RegisterDto): Observable<RegisterResult>;

  login(request: LoginDto): Observable<LoginResult>;

  verify(request: VerifyDto): Observable<VerifyResult>;

  refresh(request: RefreshDto): Observable<RefreshResult>;

  logout(request: LogoutDto): Observable<LogoutResult>;

  updateConnectionStatus(
    request: UpdateConnectionStatusDto
  ): Observable<UpdateConnectionStatusResult>;
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

  refresh(
    request: RefreshDto
  ): Promise<RefreshResult> | Observable<RefreshResult> | RefreshResult;

  logout(
    request: LogoutDto
  ): Promise<LogoutResult> | Observable<LogoutResult> | LogoutResult;

  updateConnectionStatus(
    request: UpdateConnectionStatusDto
  ):
    | Promise<UpdateConnectionStatusResult>
    | Observable<UpdateConnectionStatusResult>
    | UpdateConnectionStatusResult;
}

export function AuthServiceAuthModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'register',
      'login',
      'verify',
      'refresh',
      'logout',
      'updateConnectionStatus'
    ];
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

  createOrUpdateRelationship(
    request: CreateOrUpdateRelationshipDto
  ): Observable<CreateOrUpdateRelationshipResult>;

  deleteRelationship(
    request: DeleteRelationshipDto
  ): Observable<DeleteRelationshipResult>;

  getFriends(request: GetFriendsDto): Observable<GetFriendsResult>;
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

  createOrUpdateRelationship(
    request: CreateOrUpdateRelationshipDto
  ):
    | Promise<CreateOrUpdateRelationshipResult>
    | Observable<CreateOrUpdateRelationshipResult>
    | CreateOrUpdateRelationshipResult;

  deleteRelationship(
    request: DeleteRelationshipDto
  ):
    | Promise<DeleteRelationshipResult>
    | Observable<DeleteRelationshipResult>
    | DeleteRelationshipResult;

  getFriends(
    request: GetFriendsDto
  ):
    | Promise<GetFriendsResult>
    | Observable<GetFriendsResult>
    | GetFriendsResult;
}

export function AuthServiceAccountModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getAccount',
      'getAccounts',
      'createOrUpdateRelationship',
      'deleteRelationship',
      'getFriends'
    ];
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
