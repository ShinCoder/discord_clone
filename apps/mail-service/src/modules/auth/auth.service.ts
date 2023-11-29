import { HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { handleThrowError } from '../../utlis';

import {
  SendVerifyEmailResult,
  VerifyEmailDto
} from '@prj/types/grpc/mail-service';
import { getRpcSuccessMessage } from '@prj/common';

@Injectable()
export class AuthService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(data: VerifyEmailDto): Promise<SendVerifyEmailResult> {
    try {
      await this.mailerService.sendMail({
        to: data.email,
        subject: 'Verify Email Address NOT for Discord',
        template: 'verify',
        context: { ...data.context }
      });

      return getRpcSuccessMessage(HttpStatus.OK);
    } catch (err) {
      return handleThrowError(err);
    }
  }
}
