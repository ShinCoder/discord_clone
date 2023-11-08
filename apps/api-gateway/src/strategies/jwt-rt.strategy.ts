import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JWT_RT_STRATEGY_NAME } from '../constants';

import { IJwtPayload } from '@prj/common';

@Injectable()
export class JwtRtStrategy extends PassportStrategy(
  Strategy,
  JWT_RT_STRATEGY_NAME
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: configService.get<string>('JWT_RT_PUBLIC'),
      algorithms: 'RS256'
    });
  }

  async validate(payload: IJwtPayload) {
    if (payload.type !== 'refresh')
      throw new ForbiddenException('Invalid token');

    return payload;
  }
}
