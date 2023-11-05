import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JWT_VT_STRATEGY_NAME } from '../constants';

import { IJwtPayload } from '@prj/common';

@Injectable()
export class JwtVtStrategy extends PassportStrategy(
  Strategy,
  JWT_VT_STRATEGY_NAME
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('verifyToken'),
      secretOrKey: configService.get<string>('JWT_VT_PUBLIC')
    });
  }

  async validate(payload: IJwtPayload) {
    if (payload.type != 'verify')
      throw new BadRequestException('Wrong token type');

    return payload;
  }
}
