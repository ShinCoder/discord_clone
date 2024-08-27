import { Controller } from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  AuthServiceAuthModuleController,
  AuthServiceAuthModuleControllerMethods,
  LoginDto,
  LogoutDto,
  RefreshDto,
  RegisterDto,
  UpdateConnectionStatusDto,
  VerifyDto
} from '@prj/types/grpc/auth-service';

@Controller()
@AuthServiceAuthModuleControllerMethods()
export class AuthController implements AuthServiceAuthModuleController {
  constructor(private readonly authService: AuthService) {}

  register(data: RegisterDto) {
    return this.authService.register(data);
  }

  login(data: LoginDto) {
    return this.authService.login(data);
  }

  verify(data: VerifyDto) {
    return this.authService.verify(data);
  }

  refresh(data: RefreshDto) {
    return this.authService.refresh(data);
  }

  logout(data: LogoutDto) {
    return this.authService.logout(data);
  }

  updateConnectionStatus(data: UpdateConnectionStatusDto) {
    return this.authService.updateConnectionStatus(data);
  }
}
