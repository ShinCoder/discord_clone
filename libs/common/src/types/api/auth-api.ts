export interface ILoginDto {
  username: string;
  password: string;
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
