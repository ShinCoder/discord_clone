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
  dateOfBirth: Date;
}

export interface IRefreshDto {
  accountId: string;
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
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
