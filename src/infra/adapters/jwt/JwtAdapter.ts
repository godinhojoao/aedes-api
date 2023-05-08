import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtAdapter } from './../../../domain/adapters/JwtAdapter';

@Injectable()
export class JwtAdapterImp implements JwtAdapter {
  // change here to .env
  private secretKey = 'test-secret-key';
  private options = {
    expiresIn: '2 days',
  };

  public generateToken(payload: any): string {
    const token = jwt.sign(payload, this.secretKey, this.options);
    return token;
  }

  public verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
