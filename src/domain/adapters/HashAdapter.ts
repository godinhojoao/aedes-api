export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export abstract class HashAdapter {
  abstract generateRandomUUID(): UUID;
  abstract generateHash(password: string): string;
  abstract validate(inputPassword: string, savedPasswordHash: string): boolean;
}
