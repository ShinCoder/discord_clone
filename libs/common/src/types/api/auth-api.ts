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
