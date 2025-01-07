export interface ILoginDto {
  username: string;
  password: string;
}

export interface ILoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterDto {
  email: string;
  password: string;
  username: string;
  displayName?: string;
  dateOfBirth: string;
  emailSubscribe: boolean;
}

export interface IRefreshDto {
  refreshToken: string;
}

export interface IRefreshResult {
  accessToken: string;
  refreshToken: string;
}

export interface ILogoutDto {
  accountId: string;
}

export interface IGetMeResult {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  dateOfBirth: string;
  phoneNumber?: string;
  avatar: string;
  pronouns?: string;
  bannerColor: string;
  about?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IVerifyDto {
  verifyToken: string;
}

export interface ISendFriendRequestDto {
  targetId?: string;
  targetUsername?: string;
}

export interface IAcceptFriendRequestDto {
  targetId: string;
}

export interface IDeclineFriendRequestDto {
  targetId: string;
}

export interface IGetFriendsDto {
  accountId: string;
}

export interface IBlockDto {
  targetId: string;
}

export interface IUnblockDto {
  targetId: string;
}

export enum RelationshipStatus {
  PENDING = 'PENDING',
  FRIEND = 'FRIEND',
  BLOCKED = 'BLOCKED'
}

export enum ConnectionStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

interface RelationshipDto {
  accountId: string;
  targetId: string;
  status: RelationshipStatus;
  updatedAt: string;
}

// export interface UserSettings {

// }

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
  connectionStatus?: ConnectionStatus;
  relationship?: RelationshipDto | undefined;
  inRelationshipWith?: RelationshipDto | undefined;
}

export interface IGetFriendsResult {
  friends: Array<AccountDto>;
}

export interface IGetFriendRequestsResult {
  incomingRequests: Array<AccountDto>;
  outgoingRequests: Array<AccountDto>;
}

export interface IGetUserProfileResult {
  profile: AccountDto;
}

export interface IGetBlockedResult {
  blocked: Array<AccountDto>;
}
