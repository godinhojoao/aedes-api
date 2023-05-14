import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {
  DecodedTokenResult,
  JwtAdapter,
  JwtTokenPayload,
} from './../../../domain/adapters/JwtAdapter';

@Injectable()
export class JwtAdapterImp implements JwtAdapter {
  // change here to .env
  private secretKey = 'test-secret-key';

  public generateToken(payload: JwtTokenPayload, expiresIn = '2d'): string {
    const token = jwt.sign({ data: payload }, this.secretKey, { expiresIn });
    return token;
  }

  public decodeToken(token: string): DecodedTokenResult | null {
    try {
      const decoded = jwt.verify(
        token,
        this.secretKey,
      ) as DecodedTokenResult | null;
      return decoded || null;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
