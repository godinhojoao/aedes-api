import { RoleEnum } from '../entities/accounts/accounts.entity';

export type JwtTokenPayload = {
  id: string;
  name: string;
  email: string;
  role: RoleEnum;
};

export type DecodedTokenResult = {
  data: JwtTokenPayload;
  iat: number;
  exp: number;
};

export abstract class JwtAdapter {
  abstract generateToken(payload: JwtTokenPayload): string;
  abstract decodeToken(token: string): DecodedTokenResult | null;
}
