import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';

import { AuthService } from './auth.service';
import {
  AcceptFriendRequestDto,
  BlockDto,
  DeclineFriendRequestDto,
  LogoutDto,
  RefreshDto,
  RegisterDto,
  SendFriendRequestDto,
  VerifyDto
} from './dto';
import { LoginDto } from './dto';
import { EMAIL_REGEX } from '../../constants';
import { JwtAtGuard, JwtRtGuard, JwtVtGuard } from '../../guards';
import { IRequestWithUser } from '../../types';

import {
  IGetFriendRequestsResult,
  IGetFriendsResult,
  IGetMeResult,
  IGetUserProfileResult,
  ILoginResult,
  IRefreshResult
} from '@prj/types/api';

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
  @Post(':id/friend-request')
  sendFriendRequest(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string,
    @Body() body: SendFriendRequestDto
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.sendFriendRequest(accountId, body);
  }

  @UseGuards(JwtAtGuard)
  @Get(':id/friend-requests')
  getPendingFriendRequest(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string
  ): Promise<IGetFriendRequestsResult> {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.getPendingFriendRequest(accountId);
  }

  @UseGuards(JwtAtGuard)
  @Patch(':id/friend-request/accept')
  acceptFriendRequest(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string,
    @Body() body: AcceptFriendRequestDto
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.acceptFriendRequest(accountId, body);
  }

  @UseGuards(JwtAtGuard)
  @Patch(':id/friend-request/decline')
  declineFriendRequest(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string,
    @Body() body: DeclineFriendRequestDto
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.declineFriendRequest(accountId, body);
  }

  @UseGuards(JwtAtGuard)
  @Get(':id/friends')
  getFriends(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string
  ): Promise<IGetFriendsResult> {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.getFriends(accountId);
  }

  @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/friend/:target')
  removeFriend(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string,
    @Param('target') targetId: string
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.removeFriend(accountId, targetId);
  }

  @UseGuards(JwtAtGuard)
  @Get(':id/profile')
  async getUserProfile(
    @Param('id') accountId: string,
    @Req() req: IRequestWithUser
  ): Promise<IGetUserProfileResult> {
    return {
      profile: await this.authService.getAccount({
        id: accountId,
        includeRelationshipWith: req.user.sub
      })
    };
  }

  @UseGuards(JwtAtGuard)
  @Post(':id/block')
  async blockUser(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string,
    @Body() body: BlockDto
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.blockUser(accountId, body.targetId);
  }

  @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/block/:target')
  async unblockUser(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string,
    @Param('target') targetId: string
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.authService.unblockUser(accountId, targetId);
  }
}
