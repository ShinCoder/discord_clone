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
  PENDING = 0,
  FRIEND = 1,
  BLOCKED = 2,
  UNRECOGNIZED = -1
}

export enum ConnectionStatus {
  ONLINE = 0,
  OFFLINE = 1,
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

export interface RelationshipDto {
  accountId: string;
  targetId: string;
  status: RelationshipStatus;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
  relationship?: RelationshipDto | undefined;
  inRelationshipWith?: RelationshipDto | undefined;
  connectionStatus?: ConnectionStatus | undefined;
}

export interface GetAccountDto {
  id?: string | undefined;
  username?: string | undefined;
  status?: AccountStatus | undefined;
  includeRelationshipWith?: string | undefined;
  includeConnectionStatus?: boolean | undefined;
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
  includeConnectionStatus?: boolean | undefined;
}

export interface GetAccountsResult {
  status: MessageStatus | undefined;
  payload?: AccountsDto | undefined;
}

export interface AddFriendDto {
  accountId: string;
  targetId?: string | undefined;
  targetUsername?: string | undefined;
}

export interface AddFriendResult {
  status: MessageStatus | undefined;
}

export interface AcceptFriendRequestDto {
  accountId: string;
  targetId: string;
}

export interface AcceptFriendRequestResult {
  status: MessageStatus | undefined;
}

export interface IgnoreFriendRequestDto {
  accountId: string;
  targetId: string;
}

export interface IgnoreFriendRequestResult {
  status: MessageStatus | undefined;
}

export interface CancelFriendRequestDto {
  accountId: string;
  targetId: string;
}

export interface CancelFriendRequestResult {
  status: MessageStatus | undefined;
}

export interface RemoveFriendDto {
  accountId: string;
  targetId: string;
}

export interface RemoveFriendResult {
  status: MessageStatus | undefined;
}

export interface BlockUserDto {
  accountId: string;
  targetId: string;
}

export interface BlockUserResult {
  status: MessageStatus | undefined;
}

export interface UnblockUserDto {
  accountId: string;
  targetId: string;
}

export interface UnblockUserResult {
  status: MessageStatus | undefined;
}

export interface UpdateConnectionStatusDto {
  accountId: string;
  status: ConnectionStatus;
}

export interface UpdateConnectionStatusResult {
  status: MessageStatus | undefined;
}

export interface GetFriendRequestsDto {
  accountId: string;
}

export interface GetFriendRequestsResult {
  status: MessageStatus | undefined;
  payload?: GetFriendRequestsResult_GetFriendRequestPayload | undefined;
}

export interface GetFriendRequestsResult_GetFriendRequestPayload {
  incomingRequests: AccountDto[];
  outgoingRequests: AccountDto[];
}

export interface DmSettingsDto {
  pinnedDms: AccountDto[];
}

export interface UserSettings {
  dmSettings: DmSettingsDto | undefined;
}

export interface GetAccountWithSettingsDto {
  id: string;
}

export interface GetAccountWithSettingsResult {
  status: MessageStatus | undefined;
  payload?:
    | GetAccountWithSettingsResult_GetAccountWithSettingsResultPayload
    | undefined;
}

export interface GetAccountWithSettingsResult_GetAccountWithSettingsResultPayload {
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
  createdAt: string;
  updatedAt: string;
  userSettings: UserSettings | undefined;
}

export interface PinDmDto {
  accountId: string;
  targetId: string;
}

export interface PinDmResult {
  status: MessageStatus | undefined;
  payload?: PinDmResult_PinDmResultPayload | undefined;
}

export interface PinDmResult_PinDmResultPayload {
  newPinnedDm: AccountDto | undefined;
}

export interface UnpinDmDto {
  accountId: string;
  targetId: string;
}

export interface UnpinDmResult {
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

  addFriend(request: AddFriendDto): Observable<AddFriendResult>;

  acceptFriendRequest(
    request: AcceptFriendRequestDto
  ): Observable<AcceptFriendRequestResult>;

  ignoreFriendRequest(
    request: IgnoreFriendRequestDto
  ): Observable<IgnoreFriendRequestResult>;

  cancelFriendRequest(
    request: CancelFriendRequestDto
  ): Observable<CancelFriendRequestResult>;

  removeFriend(request: RemoveFriendDto): Observable<RemoveFriendResult>;

  getFriendRequests(
    request: GetFriendRequestsDto
  ): Observable<GetFriendRequestsResult>;

  blockUser(request: BlockUserDto): Observable<BlockUserResult>;

  unblockUser(request: UnblockUserDto): Observable<UnblockUserResult>;
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

  addFriend(
    request: AddFriendDto
  ): Promise<AddFriendResult> | Observable<AddFriendResult> | AddFriendResult;

  acceptFriendRequest(
    request: AcceptFriendRequestDto
  ):
    | Promise<AcceptFriendRequestResult>
    | Observable<AcceptFriendRequestResult>
    | AcceptFriendRequestResult;

  ignoreFriendRequest(
    request: IgnoreFriendRequestDto
  ):
    | Promise<IgnoreFriendRequestResult>
    | Observable<IgnoreFriendRequestResult>
    | IgnoreFriendRequestResult;

  cancelFriendRequest(
    request: CancelFriendRequestDto
  ):
    | Promise<CancelFriendRequestResult>
    | Observable<CancelFriendRequestResult>
    | CancelFriendRequestResult;

  removeFriend(
    request: RemoveFriendDto
  ):
    | Promise<RemoveFriendResult>
    | Observable<RemoveFriendResult>
    | RemoveFriendResult;

  getFriendRequests(
    request: GetFriendRequestsDto
  ):
    | Promise<GetFriendRequestsResult>
    | Observable<GetFriendRequestsResult>
    | GetFriendRequestsResult;

  blockUser(
    request: BlockUserDto
  ): Promise<BlockUserResult> | Observable<BlockUserResult> | BlockUserResult;

  unblockUser(
    request: UnblockUserDto
  ):
    | Promise<UnblockUserResult>
    | Observable<UnblockUserResult>
    | UnblockUserResult;
}

export function AuthServiceAccountModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getAccount',
      'getAccounts',
      'addFriend',
      'acceptFriendRequest',
      'ignoreFriendRequest',
      'cancelFriendRequest',
      'removeFriend',
      'getFriendRequests',
      'blockUser',
      'unblockUser'
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

export interface AuthServiceSettingModuleClient {
  getAccountWithSettings(
    request: GetAccountWithSettingsDto
  ): Observable<GetAccountWithSettingsResult>;

  pinDm(request: PinDmDto): Observable<PinDmResult>;

  unpinDm(request: UnpinDmDto): Observable<UnpinDmResult>;
}

export interface AuthServiceSettingModuleController {
  getAccountWithSettings(
    request: GetAccountWithSettingsDto
  ):
    | Promise<GetAccountWithSettingsResult>
    | Observable<GetAccountWithSettingsResult>
    | GetAccountWithSettingsResult;

  pinDm(
    request: PinDmDto
  ): Promise<PinDmResult> | Observable<PinDmResult> | PinDmResult;

  unpinDm(
    request: UnpinDmDto
  ): Promise<UnpinDmResult> | Observable<UnpinDmResult> | UnpinDmResult;
}

export function AuthServiceSettingModuleControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getAccountWithSettings',
      'pinDm',
      'unpinDm'
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('AuthServiceSettingModule', method)(
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
      GrpcStreamMethod('AuthServiceSettingModule', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const AUTH_SERVICE_SETTING_MODULE_SERVICE_NAME =
  'AuthServiceSettingModule';
