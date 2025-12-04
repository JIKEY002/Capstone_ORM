import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import {
    ACCESS_TOKENN_SECRET,
    REFRESH_TOKEN_SECRET,
} from 'src/common/constant/app.constant';

@Injectable()
export class TokenService {
    generateToken(payload: jwt.JwtPayload): {
        accessToken: string;
        refreshToken: string;
    } {
        const accessToken = jwt.sign(payload, ACCESS_TOKENN_SECRET, {
            expiresIn: '1d',
        });

        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    verifyAccessToken(
        token: string,
        options?: jwt.VerifyOptions,
    ): string | jwt.JwtPayload {
        return jwt.verify(token, ACCESS_TOKENN_SECRET, options);
    }

    verifyRefreshToken(
        token: string,
        options?: jwt.VerifyOptions,
    ): string | jwt.JwtPayload {
        return jwt.verify(token, REFRESH_TOKEN_SECRET, options);
    }
}
