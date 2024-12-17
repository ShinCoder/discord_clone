import { Controller } from '@nestjs/common';

import { AccountService } from './account.service';

import {
  AuthServiceAccountModuleController,
  AuthServiceAccountModuleControllerMethods,
  CreateOrUpdateRelationshipDto,
  DeleteRelationshipDto,
  GetAccountDto,
  GetAccountResult,
  GetAccountsDto,
  GetAccountsResult,
  GetBlockedDto,
  GetBlockedResult,
  GetFriendsDto,
  GetFriendsResult
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

  createOrUpdateRelationship(data: CreateOrUpdateRelationshipDto) {
    return this.accountService.createOrUpdateRelationship(data);
  }

  deleteRelationship(data: DeleteRelationshipDto) {
    return this.accountService.deleteRelationship(data);
  }

  getFriends(data: GetFriendsDto): Promise<GetFriendsResult> {
    return this.accountService.getFriends(data);
  }

  getBlocked(data: GetBlockedDto): Promise<GetBlockedResult> {
    return this.accountService.getBlocked(data);
  }
}
