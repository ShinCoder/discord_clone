import {
  Body,
  Controller,
  Patch,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto, RefreshDto, RegisterDto, VerifyDto } from './dto';
import { EMAIL_REGEX } from '../../constants';
import { JwtRtGuard, JwtVtGuard } from '../../guards';
import { IRequestWithUser } from '../../types';

import { ILoginResult, IRefreshResult } from '@prj/types/api';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register({
      ...body
    });
  }

  @Post('login')
  login(@Body() body: LoginDto): Promise<ILoginResult> {
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
  @Patch('verify')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verify(@Req() req: IRequestWithUser, @Body() body: VerifyDto) {
    return this.authService.verify({ id: req.user.sub });
  }

  @UseGuards(JwtRtGuard)
  @Put('refresh')
  refresh(
    @Req() req: IRequestWithUser,
    @Body() body: RefreshDto
  ): Promise<IRefreshResult> {
    return this.authService.refresh({
      accountId: req.user.sub,
      refreshToken: body.refreshToken
    });
  }
}
