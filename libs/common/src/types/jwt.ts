export interface IJwtPayload {
  sub: string;
  email: string;
  isAdmin: boolean;
  type: 'access' | 'refresh' | 'verify' | 'reset';
  iat?: number;
  exp?: number;
}
