import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto';
import { EMAIL_REGEX } from '../../constants';
import { JwtAtGuard, JwtVtGuard } from '../../guards';
import { IRequestWithUser } from '../../types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterDto) {
    return this.authService.register({
      ...body,
      dateOfBirth: body.dateOfBirth.toDateString()
    });
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(
      EMAIL_REGEX.test(body.username)
        ? {
            email: body.username,
            password: body.password
          }
        : {
            phoneNumber: body.username,
            password: body.password
          }
    );
  }

  @UseGuards(JwtVtGuard)
  @Patch('/verify')
  verify(@Req() req: IRequestWithUser) {
    return this.authService.verify({ id: req.user.sub });
  }

  @UseGuards(JwtAtGuard)
  @Get('/me')
  getMe(@Req() req: IRequestWithUser) {
    return this.authService.getAccount({ id: req.user.sub });
  }
}
