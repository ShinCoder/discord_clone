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
  IPinDmDto,
  IPinDmResult,
  IRegisterDto,
  ISendFriendRequestDto,
  IUnblockDto,
  IVerifyDto
} from '@prj/types/api';

export const login = (data: ILoginDto) => {
  return apiClient.post<ILoginResult>('/auth/login', data);
};

export const getMe = () => {
  return apiClientWithAuth.get<IGetMeResult>('/users/me');
};

export const register = (data: IRegisterDto) => {
  return apiClient.post('/auth/register', data);
};

export const verify = (data: IVerifyDto) => {
  return apiClient.patch('/auth/verify', data);
};

export const getFriends = (data: IGetFriendsDto) => {
  return apiClientWithAuth.get<IGetFriendsResult>(
    `/users/${data.accountId}/friends`
  );
};

interface SendFriendRequestDto extends ISendFriendRequestDto {
  accountId: string;
}
export const sendFriendRequest = (data: SendFriendRequestDto) => {
  return apiClientWithAuth.post(
    `/users/${data.accountId}/friend-request`,
    data
  );
};

export const getPendingFriendRequest = (id: string) => {
  return apiClientWithAuth.get<IGetFriendRequestsResult>(
    `/users/${id}/friend-requests`
  );
};

interface AcceptFriendRequestDto extends IAcceptFriendRequestDto {
  accountId: string;
}
export const acceptFriendRequest = (data: AcceptFriendRequestDto) => {
  return apiClientWithAuth.patch(
    `/users/${data.accountId}/friend-request/accept`,
    data
  );
};

interface DeclineFriendRequestDto extends IDeclineFriendRequestDto {
  accountId: string;
}
export const declineFriendRequest = (data: DeclineFriendRequestDto) => {
  return apiClientWithAuth.patch(
    `/users/${data.accountId}/friend-request/decline`,
    data
  );
};

export const cancelFriendRequest = (data: {
  accountId: string;
  targetId: string;
}) => {
  return apiClientWithAuth.delete(
    `/users/${data.accountId}/friend-request/${data.targetId}`
  );
};

export const getUserProfile = (id: string) => {
  return apiClientWithAuth.get<IGetUserProfileResult>(`/users/${id}/profile`);
};

export const removeFriend = (data: { accountId: string; targetId: string }) => {
  return apiClientWithAuth.delete(
    `/users/${data.accountId}/friend/${data.targetId}`
  );
};

export const getBlocked = (id: string) => {
  return apiClientWithAuth.get<IGetBlockedResult>(`/users/${id}/blocked`);
};

interface BlockDto extends IBlockDto {
  accountId: string;
}
export const blockUser = (data: BlockDto) => {
  return apiClientWithAuth.post(`/users/${data.accountId}/block`, data);
};

interface UnBlockDto extends IUnblockDto {
  accountId: string;
}
export const unblockUser = (data: UnBlockDto) => {
  return apiClientWithAuth.delete(
    `/users/${data.accountId}/block/${data.targetId}`
  );
};

interface PinDmDto extends IPinDmDto {
  accountId: string;
}
export const pinDm = (data: PinDmDto) => {
  return apiClientWithAuth.post<IPinDmResult>(
    `/users/${data.accountId}/settings/direct-message/pin`,
    data
  );
};

export const unpinDm = (data: { accountId: string; targetId: string }) => {
  return apiClientWithAuth.delete(
    `/users/${data.accountId}/settings/direct-message/pin/${data.targetId}`
  );
};
