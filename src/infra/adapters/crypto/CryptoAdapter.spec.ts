import { CryptoAdapter } from './CryptoAdapter';

const UUIDV4_REGEXP =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('CryptoAdapter', () => {
  it('Given generateRandomUUID should return valid uuid v4', () => {
    expect(CryptoAdapter.generateRandomUUID()).toMatch(UUIDV4_REGEXP);
  });

  it('Given string generateHash should return valid hash', () => {
    expect(CryptoAdapter.generateHash('testing')).toEqual(expect.any(String));
  });

  it('Given correct password validate should return true', () => {
    const generatedPassword = CryptoAdapter.generateHash('testing');
    expect(CryptoAdapter.validate('testing', generatedPassword)).toBe(true);
  });

  it('Given incorrect password validate should return false', () => {
    const generatedPassword = CryptoAdapter.generateHash('testing');
    expect(CryptoAdapter.validate('testing222', generatedPassword)).toBe(false);
  });
});
