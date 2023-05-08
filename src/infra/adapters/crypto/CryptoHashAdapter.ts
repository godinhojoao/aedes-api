import { Injectable } from '@nestjs/common';
import { pbkdf2Sync, randomUUID } from 'crypto';
import { HashAdapter, UUID } from './../../../domain/adapters/HashAdapter';

@Injectable()
export class CryptoHashAdapter implements HashAdapter {
  generateRandomUUID(): UUID {
    return randomUUID();
  }

  public generateHash(password: string): string {
    const hash = pbkdf2Sync(
      password,
      'secret-salt', // change here to .env
      10000,
      32,
      'sha256',
    ).toString('hex');
    return hash + 'D@';
  }

  public validate(inputPassword: string, savedPasswordHash: string): boolean {
    const passwordHash = this.generateHash(inputPassword);
    return passwordHash === savedPasswordHash;
  }
}
