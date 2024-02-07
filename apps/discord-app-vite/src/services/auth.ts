import { apiClient, apiClientWithAuth } from './client';

import {
  IGetMeResult,
  ILoginDto,
  ILoginResult,
  IRegisterDto,
  IVerifyDto
} from '@prj/types/api';

export const login = (data: ILoginDto) => {
  return apiClient.post<ILoginResult>('/auth/login', data);
};

export const getMe = () => {
  return apiClientWithAuth.get<IGetMeResult>('/auth/me');
};

export const register = (data: IRegisterDto) => {
  return apiClient.post('/auth/register', data);
};

export const verify = (data: IVerifyDto) => {
  return apiClient.patch('/auth/verify', data);
};
