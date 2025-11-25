import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ACCESS_TOKENN_SECRET } from 'src/common/constant/app.constant';

@Injectable()
export class ProtectStrategy extends PassportStrategy(Strategy, 'protect') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKENN_SECRET,
    });
  }

  validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
