import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
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

import {
  IGetFriendRequestsResult,
  IGetFriendsResult,
  IGetMeResult,
  ILoginResult,
  IRefreshResult
} from '@prj/types/api';
import { SendFriendRequestDto } from './dto/sendFriendRequest.dto';
import { AcceptFriendRequestDto } from './dto/acceptFriendRequest.dto';

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

  @UseGuards(JwtAtGuard)
  @Get('me')
  getMe(@Req() req: IRequestWithUser): Promise<IGetMeResult> {
    return this.authService.getAccount({
      id: req.user.sub
    });
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

  @UseGuards(JwtAtGuard)
  @Delete('logout')
  logout(@Req() req: IRequestWithUser, @Body() body: LogoutDto) {
    if (req.user.sub !== body.accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.logout({ accountId: body.accountId });
  }

  @UseGuards(JwtAtGuard)
  @Post('friend-request')
  sendFriendRequest(
    @Req() req: IRequestWithUser,
    @Body() body: SendFriendRequestDto
  ) {
    if (req.user.sub !== body.accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.sendFriendRequest(body);
  }

  @UseGuards(JwtAtGuard)
  @Patch('friend-request/accept')
  acceptFriendRequest(
    @Req() req: IRequestWithUser,
    @Body() body: AcceptFriendRequestDto
  ) {
    if (req.user.sub !== body.accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.acceptFriendRequest(body);
  }

  @UseGuards(JwtAtGuard)
  @Patch('friend-request/decline')
  declineFriendRequest(
    @Req() req: IRequestWithUser,
    @Body() body: AcceptFriendRequestDto
  ) {
    if (req.user.sub !== body.accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.declineFriendRequest(body);
  }

  @UseGuards(JwtAtGuard)
  @Get(':id/friends')
  getFriends(@Param('id') accountId: string): Promise<IGetFriendsResult> {
    return this.authService.getFriends(accountId);
  }

  @UseGuards(JwtAtGuard)
  @Get(':id/friend-request')
  getPendingFriendRequest(
    @Param('id') accountId: string
  ): Promise<IGetFriendRequestsResult> {
    return this.authService.getPendingFriendRequest(accountId);
  }
}
