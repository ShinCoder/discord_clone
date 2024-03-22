import { Controller } from '@nestjs/common';

import { AccountService } from './account.service';

import {
  AuthServiceAccountModuleController,
  AuthServiceAccountModuleControllerMethods,
  CreateOrUpdateRelationshipDto,
  DeleteRelationshipDto,
  GetAccountDto,
  GetAccountsDto,
  GetFriendsDto
} from '@prj/types/grpc/auth-service';
@Controller()
@AuthServiceAccountModuleControllerMethods()
export class AccountController implements AuthServiceAccountModuleController {
  constructor(private readonly accountService: AccountService) {}

  getAccount(data: GetAccountDto) {
    return this.accountService.getAccount(data);
  }

  getAccounts(data: GetAccountsDto) {
    return this.accountService.getAccounts(data);
  }

  createOrUpdateRelationship(data: CreateOrUpdateRelationshipDto) {
    return this.accountService.createOrUpdateRelationship(data);
  }

  deleteRelationship(data: DeleteRelationshipDto) {
    return this.accountService.deleteRelationship(data);
  }

  getFriends(data: GetFriendsDto) {
    return this.accountService.getFriends(data);
  }
}
