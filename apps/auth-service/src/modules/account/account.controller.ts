import { Controller } from '@nestjs/common';

import { AccountService } from './account.service';

import {
  AuthServiceAccountModuleController,
  AuthServiceAccountModuleControllerMethods,
  GetAccountDto,
  GetAccountsDto
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
}
