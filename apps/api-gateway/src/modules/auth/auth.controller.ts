import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LogoutDto, RefreshDto, RegisterDto, VerifyDto } from './dto';
import { LoginDto } from './dto';
import { EMAIL_REGEX } from '../../constants';
import { JwtAtGuard, JwtRtGuard, JwtVtGuard } from '../../guards';
import { IRequestWithUser } from '../../types';

import { IGetMeResult, ILoginResult } from '@prj/types/api';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register({
      ...body,
      dateOfBirth: body.dateOfBirth.toDateString()
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
  verify(@Req() req: IRequestWithUser, @Body() body: VerifyDto) {
    return this.authService.verify({ id: req.user.sub });
  }

  @UseGuards(JwtAtGuard)
  @Get('me')
  getMe(@Req() req: IRequestWithUser): Promise<IGetMeResult> {
    return this.authService.getAccount({
      id: req.user.sub
    });
  }

  @UseGuards(JwtRtGuard)
  @Put('refresh')
  refresh(@Req() req: IRequestWithUser, @Body() body: RefreshDto) {
    if (req.user.sub !== body.accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.refresh({
      accountId: body.accountId,
      refreshToken: body.refreshToken
    });
  }

  @UseGuards(JwtAtGuard)
  @Delete('logout')
  logout(@Req() req: IRequestWithUser, @Body() body: LogoutDto) {
    if (req.user.sub !== body.accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.logout({ accountId: body.accountId });
  }
}
