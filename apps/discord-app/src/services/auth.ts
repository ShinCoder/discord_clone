import client from './client';

import {
  IGetMeResult,
  ILoginDto,
  ILoginResult,
  IRegisterDto
} from '@prj/types/api';

export const login = (data: ILoginDto) => {
  return client.post<ILoginResult>('/auth/login', data);
};

export const getMe = () => {
  return client.get<IGetMeResult>('/auth/me');
};

export const register = (data: IRegisterDto) => {
  return client.post('/auth/register', data);
};
