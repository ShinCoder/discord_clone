import { apiClient, apiClientWithAuth } from './client';

import {
  IAcceptFriendRequestDto,
  IDeclineFriendRequestDto,
  IGetFriendRequestsResult,
  IGetFriendsDto,
  IGetFriendsResult,
  IGetMeResult,
  IGetUserProfileResult,
  ILoginDto,
  ILoginResult,
  IRegisterDto,
  ISendFriendRequestDto,
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

export const getFriends = (data: IGetFriendsDto) => {
  return apiClientWithAuth.get<IGetFriendsResult>(
    `/auth/${data.accountId}/friends`
  );
};

export const sendFriendRequest = (data: ISendFriendRequestDto) => {
  return apiClientWithAuth.post('/auth/friend-request', data);
};

export const getPendingFriendRequest = (id: string) => {
  return apiClientWithAuth.get<IGetFriendRequestsResult>(
    `/auth/${id}/friend-request`
  );
};

export const acceptFriendRequest = (data: IAcceptFriendRequestDto) => {
  return apiClientWithAuth.patch('/auth/friend-request/accept', data);
};

export const declineFriendRequest = (data: IDeclineFriendRequestDto) => {
  return apiClientWithAuth.patch('/auth/friend-request/decline', data);
};

export const getUserProfile = (id: string) => {
  return apiClientWithAuth.get<IGetUserProfileResult>(`/auth/${id}/profile`);
};
