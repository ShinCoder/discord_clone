import { Controller } from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  AuthServiceAuthModuleController,
  AuthServiceAuthModuleControllerMethods,
  LoginDto,
  RegisterDto,
  VerifyDto
} from '@prj/grpc/auth-service';

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
}
