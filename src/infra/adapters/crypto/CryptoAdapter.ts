import { pbkdf2Sync, randomUUID } from 'crypto';

type UUID = `${string}-${string}-${string}-${string}-${string}`;

export class CryptoAdapter {
  static generateRandomUUID(): UUID {
    return randomUUID();
  }

  static generateHash(password: string): string {
    const hash = pbkdf2Sync(
      password,
      'secret-salt',
      10000,
      32,
      'sha256',
    ).toString('hex');
    return hash + 'D@';
  }

  static validate(inputPassword: string, savedPasswordHash: string): boolean {
    const passwordHash = this.generateHash(inputPassword);
    return passwordHash === savedPasswordHash;
  }
}
