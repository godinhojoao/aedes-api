import { Test, TestingModule } from '@nestjs/testing';
import { CryptoHashAdapter } from './CryptoHashAdapter';

const UUIDV4_REGEXP =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('CryptoHashAdapter', () => {
  let service: CryptoHashAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoHashAdapter],
    }).compile();

    service = module.get<CryptoHashAdapter>(CryptoHashAdapter);
  });

  it('Given generateRandomUUID should return valid uuid v4', () => {
    expect(service.generateRandomUUID()).toMatch(UUIDV4_REGEXP);
  });

  it('Given string generateHash should return valid hash', () => {
    expect(service.generateHash('testing')).toEqual(expect.any(String));
  });

  it('Given correct password validate should return true', () => {
    const generatedPassword = service.generateHash('testing');
    expect(service.validate('testing', generatedPassword)).toBe(true);
  });

  it('Given incorrect password validate should return false', () => {
    const generatedPassword = service.generateHash('testing');
    expect(service.validate('testing222', generatedPassword)).toBe(false);
  });
});
