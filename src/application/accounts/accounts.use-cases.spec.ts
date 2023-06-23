import { Test, TestingModule } from '@nestjs/testing';
import { AccountsUseCases } from './accounts.use-cases';
import { AccountsRepository } from '../../domain/repositories/accounts.repository';
import { AccountsInMemoryRepository } from '../../infra/repositories/accounts/accounts-in-memory-repository.service';
import { BadRequestException } from '@nestjs/common';
import { HashAdapter } from './../../domain/adapters/HashAdapter';
import { CryptoHashAdapter } from './../../infra/adapters/crypto/CryptoHashAdapter';
import { JwtAdapter } from './../../domain/adapters/JwtAdapter';
import { JwtAdapterImp } from './../../infra/adapters/jwt/JwtAdapter';

describe('AccountsUseCases', () => {
  let service: AccountsUseCases;
  let createdAccountId = null;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsUseCases,
        {
          provide: AccountsRepository,
          useClass: AccountsInMemoryRepository,
        },
        {
          provide: HashAdapter,
          useClass: CryptoHashAdapter,
        },
        {
          provide: JwtAdapter,
          useClass: JwtAdapterImp,
        },
      ],
    }).compile();

    service = module.get<AccountsUseCases>(AccountsUseCases);
  });

  describe('create', () => {
    it('Given valid payload should create account', () => {
      const createdAccount = service.create({
        name: 'John Doe',
        email: 'johnusecase33@example.com',
        password: 'Demo@123',
        cpf: '74238136055',
      });
      createdAccountId = createdAccount.id;
      expect(createdAccount).toEqual({
        id: expect.any(String),
        name: 'John Doe',
        email: 'johnusecase33@example.com',
        cpf: '74238136055',
        role: 1,
      });
    });

    it('Given existent cpf should return error', () => {
      const noCreateCall = () =>
        service.create({
          name: 'doe',
          email: 'doe@gmail.com',
          password: 'Demo@123',
          cpf: '74238136055',
        });
      expect(noCreateCall).toThrowError(BadRequestException);
      expect(noCreateCall).toThrowError('Account already exists');
    });

    it('Given existent email should return error', () => {
      const noCreateCall = () =>
        service.create({
          name: 'doe',
          email: 'johnusecase33@gmail.com',
          password: 'Demo@123',
          cpf: '74238136055',
        });
      expect(noCreateCall).toThrowError(BadRequestException);
      expect(noCreateCall).toThrowError('Account already exists');
    });
  });

  describe('update', () => {
    it('Given valid payload should update account', () => {
      const updatedAccount = service.update({
        id: createdAccountId,
        name: 'Testing name',
        email: 'updated@example.com',
        password: 'Demo@123',
        cpf: '12345678900',
        role: 1,
      });
      expect(updatedAccount).toEqual({
        id: createdAccountId,
        name: 'Testing name',
        email: 'updated@example.com',
        cpf: '12345678900',
        role: 1,
      });
    });

    it('Given inexistent account should return error', () => {
      const noUpdateCall = () =>
        service.update({
          id: 'adsdsa',
          name: 'Testing name',
          email: 'updated@example.com',
          password: 'Demo@123',
          cpf: '77320844000144',
          role: 1,
        });
      expect(noUpdateCall).toThrowError(BadRequestException);
      expect(noUpdateCall).toThrowError('No account found');
    });
  });

  describe('signIn', () => {
    it('Given correct email and password should return token', () => {
      const result = service.signIn({
        email: 'john@example.com',
        password: 'Demo@123',
      });
      expect(result).toEqual({
        token: expect.any(String),
        account: {
          cpf: '12345678900',
          email: 'john@example.com',
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
          name: 'John Doe',
          role: 0,
        },
      });
    });

    it('Given incorrect email should return error', () => {
      const noTokenCall = () =>
        service.signIn({
          email: 'error@example.com',
          password: 'Demo@123',
        });
      expect(noTokenCall).toThrowError(BadRequestException);
      expect(noTokenCall).toThrowError('Invalid email or password');
    });

    it('Given incorrect password should return error', () => {
      const noTokenCall = () =>
        service.signIn({
          email: 'john@example.com',
          password: 'testabc',
        });
      expect(noTokenCall).toThrowError(BadRequestException);
      expect(noTokenCall).toThrowError('Invalid email or password');
    });
  });
});
