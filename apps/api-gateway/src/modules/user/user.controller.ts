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
  Req,
  UseGuards
} from '@nestjs/common';

import { UserService } from './user.service';
import {
  AcceptFriendRequestDto,
  BlockDto,
  DeclineFriendRequestDto,
  PinDirectMessageDto,
  SendFriendRequestDto
} from './dto';
import { JwtAtGuard } from '../../guards';
import { IRequestWithUser } from '../../types';

import {
  IGetBlockedResult,
  IGetFriendRequestsResult,
  IGetFriendsResult,
  IGetMeResult,
  IGetUserProfileResult,
  IPinDmResult
} from '@prj/types/api';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAtGuard)
  @Get('me')
  getMe(@Req() req: IRequestWithUser): Promise<IGetMeResult> {
    return this.userService.getMe(req.user.sub);
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

    return this.userService.sendFriendRequest(accountId, body);
  }

  @UseGuards(JwtAtGuard)
  @Get(':id/friend-requests')
  getPendingFriendRequest(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string
  ): Promise<IGetFriendRequestsResult> {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.userService.getPendingFriendRequest(accountId);
  }

  @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/friend-request/accept')
  acceptFriendRequest(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string,
    @Body() body: AcceptFriendRequestDto
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.userService.acceptFriendRequest(accountId, body);
  }

  @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id/friend-request/decline')
  declineFriendRequest(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string,
    @Body() body: DeclineFriendRequestDto
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.userService.declineFriendRequest(accountId, body);
  }

  @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/friend-request/:target')
  cancelFriendRequest(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string,
    @Param('target') targetId: string
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.userService.cancelFriendRequest(accountId, targetId);
  }

  @UseGuards(JwtAtGuard)
  @Get(':id/friends')
  getFriends(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string
  ): Promise<IGetFriendsResult> {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.userService.getFriends(accountId);
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

    return this.userService.removeFriend(accountId, targetId);
  }

  @UseGuards(JwtAtGuard)
  @Get(':id/profile')
  async getUserProfile(
    @Param('id') accountId: string,
    @Req() req: IRequestWithUser
  ): Promise<IGetUserProfileResult> {
    return {
      profile: await this.userService.getAccount({
        id: accountId,
        includeRelationshipWith: req.user.sub
      })
    };
  }

  @UseGuards(JwtAtGuard)
  @Get(':id/blocked')
  async getBlockedUsers(
    @Req() req: IRequestWithUser,
    @Param('id') accountId: string
  ): Promise<IGetBlockedResult> {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.userService.getBlockedUsers(accountId);
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

    return this.userService.blockUser(accountId, body.targetId);
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

    return this.userService.unblockUser(accountId, targetId);
  }

  @UseGuards(JwtAtGuard)
  @Post(':id/settings/direct-message/pin')
  async pinDirectMessage(
    @Req() req: IRequestWithUser,
    @Body() body: PinDirectMessageDto,
    @Param('id') accountId: string
  ): Promise<IPinDmResult> {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.userService.pinDirectMessage(accountId, body.targetId);
  }

  @UseGuards(JwtAtGuard)
  @Delete(':id/settings/direct-message/pin/:target')
  async unpinDirectMessage(
    @Req() req: IRequestWithUser,
    @Param('target') targetId: string,
    @Param('id') accountId: string
  ) {
    if (req.user.sub !== accountId)
      throw new ForbiddenException('Forbidden resource');

    return this.userService.unpinDirectMessage(accountId, targetId);
  }
}
