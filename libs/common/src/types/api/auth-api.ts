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
  status: string;
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
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IVerifyDto {
  verifyToken: string;
}

export interface ISendFriendRequestDto {
  accountId: string;
  targetId: string;
}

export interface IAcceptFriendRequestDto {
  accountId: string;
  targetId: string;
}

export interface IDeclineFriendRequestDto {
  accountId: string;
  targetId: string;
}

export interface IGetFriendsDto {
  accountId: string;
}

interface RelationshipDto {
  id: string;
  accountId: string;
  targetId: string;
  status: string;
  previousStatus?: string | undefined;
  createdAt: string;
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
  status: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  connectionStatus?: 'ONLINE' | 'OFFLINE';
  relationshipWith?: RelationshipDto | undefined;
}

export interface IGetFriendsResult {
  friends: Array<AccountDto>;
}

export interface IGetFriendRequestsResult {
  accounts: Array<AccountDto>;
}
