export abstract class JwtAdapter {
  abstract generateToken(payload: any): string;
  abstract verifyToken(token: string): any;
}
