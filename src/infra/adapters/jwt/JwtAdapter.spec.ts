import * as jwt from 'jsonwebtoken';
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtAdapterImp } from './JwtAdapter';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked-token'),
  verify: jest.fn(() => ({ userId: 1 })),
}));

describe('JwtAdapter', () => {
  let service: JwtAdapterImp;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtAdapterImp],
    }).compile();

    service = module.get<JwtAdapterImp>(JwtAdapterImp);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    it('should generate a JWT token', () => {
      const payload = { userId: 1 };
      const token = service.generateToken(payload);

      expect(token).toBe('mocked-token');
      expect(jwt.sign).toHaveBeenCalledWith(payload, 'test-secret-key', {
        expiresIn: '2 days',
      });
    });
  });

  describe('verifyToken', () => {
    it('Given valid JWT token should decode payload', () => {
      const token = 'valid-token';
      const decoded = service.verifyToken(token);

      expect(decoded).toEqual({ userId: 1 });
      expect(jwt.verify).toHaveBeenCalledWith(token, 'test-secret-key');
    });

    it('Given invalid JWT token should throw an UnauthorizedException', () => {
      const token = 'invalid-token';
      (jwt.verify as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Invalid token');
      });

      expect(() => service.verifyToken(token)).toThrow(UnauthorizedException);
      expect(jwt.verify).toHaveBeenCalledWith(token, 'test-secret-key');
    });
  });
});
