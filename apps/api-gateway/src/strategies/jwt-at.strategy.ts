import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_AT_STRATEGY_NAME } from '../constants';

import { IJwtPayload } from '@prj/common';

@Injectable()
export class JwtAtStrategy extends PassportStrategy(
  Strategy,
  JWT_AT_STRATEGY_NAME
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_AT_PUBLIC')
    });
  }

  async validate(payload: IJwtPayload) {
    if (payload.type != 'access')
      throw new BadRequestException('Wrong token type');

    return payload;
  }
}
