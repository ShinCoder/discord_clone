import { apiClient, apiClientWithAuth } from './client';

import {
  IAcceptFriendRequestDto,
  IBlockDto,
  IDeclineFriendRequestDto,
  IGetBlockedResult,
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

interface SendFriendRequestDto extends ISendFriendRequestDto {
  accountId: string;
}
export const sendFriendRequest = (data: SendFriendRequestDto) => {
  return apiClientWithAuth.post(`/auth/${data.accountId}/friend-request`, data);
};

export const getPendingFriendRequest = (id: string) => {
  return apiClientWithAuth.get<IGetFriendRequestsResult>(
    `/auth/${id}/friend-requests`
  );
};

interface AcceptFriendRequestDto extends IAcceptFriendRequestDto {
  accountId: string;
}
export const acceptFriendRequest = (data: AcceptFriendRequestDto) => {
  return apiClientWithAuth.patch(
    `/auth/${data.accountId}/friend-request/accept`,
    data
  );
};

interface DeclineFriendRequestDto extends IDeclineFriendRequestDto {
  accountId: string;
}
export const declineFriendRequest = (data: DeclineFriendRequestDto) => {
  return apiClientWithAuth.patch(
    `/auth/${data.accountId}/friend-request/decline`,
    data
  );
};

export const getUserProfile = (id: string) => {
  return apiClientWithAuth.get<IGetUserProfileResult>(`/auth/${id}/profile`);
};

export const removeFriend = (data: { accountId: string; targetId: string }) => {
  return apiClientWithAuth.delete(
    `/auth/${data.accountId}/friend/${data.targetId}`
  );
};

export const getBlocked = (id: string) => {
  return apiClientWithAuth.get<IGetBlockedResult>(`/auth/${id}/blocked`);
};

interface BlockDto extends IBlockDto {
  accountId: string;
}
export const blockUser = (data: BlockDto) => {
  return apiClientWithAuth.post(`/auth/${data.accountId}/block`, data);
};

export const unblockUser = (data: { accountId: string; targetId: string }) => {
  return apiClientWithAuth.delete(
    `/auth/${data.accountId}/block/${data.targetId}`
  );
};
