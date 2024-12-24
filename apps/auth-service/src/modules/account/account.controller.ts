import { Controller } from '@nestjs/common';

import { AccountService } from './account.service';

import {
  AcceptFriendRequestDto,
  AcceptFriendRequestResult,
  AddFriendDto,
  AddFriendResult,
  AuthServiceAccountModuleController,
  AuthServiceAccountModuleControllerMethods,
  BlockUserDto,
  BlockUserResult,
  CancelFriendRequestDto,
  CancelFriendRequestResult,
  GetAccountDto,
  GetAccountResult,
  GetAccountsDto,
  GetAccountsResult,
  GetFriendRequestsDto,
  GetFriendRequestsResult,
  IgnoreFriendRequestDto,
  IgnoreFriendRequestResult,
  RemoveFriendDto,
  RemoveFriendResult,
  UnblockUserDto,
  UnblockUserResult
} from '@prj/types/grpc/auth-service';
@Controller()
@AuthServiceAccountModuleControllerMethods()
export class AccountController implements AuthServiceAccountModuleController {
  constructor(private readonly accountService: AccountService) {}

  getAccount(data: GetAccountDto): Promise<GetAccountResult> {
    return this.accountService.getAccount(data);
  }

  getAccounts(data: GetAccountsDto): Promise<GetAccountsResult> {
    return this.accountService.getAccounts(data);
  }

  // createOrUpdateRelationship(data: CreateOrUpdateRelationshipDto) {
  //   return this.accountService.createOrUpdateRelationship(data);
  // }

  // deleteRelationship(data: DeleteRelationshipDto) {
  //   return this.accountService.deleteRelationship(data);
  // }

  addFriend(data: AddFriendDto): Promise<AddFriendResult> {
    return this.accountService.addFriend(data);
  }

  acceptFriendRequest(
    data: AcceptFriendRequestDto
  ): Promise<AcceptFriendRequestResult> {
    return this.accountService.acceptFriendRequest(data);
  }

  ignoreFriendRequest(
    data: IgnoreFriendRequestDto
  ): Promise<IgnoreFriendRequestResult> {
    return this.accountService.ignoreFriendRequest(data);
  }

  cancelFriendRequest(
    data: CancelFriendRequestDto
  ): Promise<CancelFriendRequestResult> {
    return this.accountService.cancelFriendRequest(data);
  }

  getFriendRequests(
    data: GetFriendRequestsDto
  ): Promise<GetFriendRequestsResult> {
    return this.accountService.getFriendRequests(data);
  }

  removeFriend(data: RemoveFriendDto): Promise<RemoveFriendResult> {
    return this.accountService.removeFriend(data);
  }

  blockUser(data: BlockUserDto): Promise<BlockUserResult> {
    return this.accountService.blockUser(data);
  }

  unblockUser(data: UnblockUserDto): Promise<UnblockUserResult> {
    return this.accountService.unblockUser(data);
  }
}
