import { Controller } from '@nestjs/common';

import { AuthService } from './auth.service';

import {
  MailServiceAuthModuleController,
  MailServiceAuthModuleControllerMethods,
  VerifyEmailDto
} from '@prj/types/grpc/mail-service';

@Controller()
@MailServiceAuthModuleControllerMethods()
export class AuthController implements MailServiceAuthModuleController {
  constructor(private readonly authService: AuthService) {}

  sendVerifyEmail(data: VerifyEmailDto) {
    return this.authService.sendVerifyEmail(data);
  }
}
