import { Test, TestingModule } from '@nestjs/testing';
import { AccountsInMemoryRepository } from './accounts-in-memory-repository.service';
import { BadRequestException } from '@nestjs/common';
import { AccountEntity } from '../../../domain/entities/account/account.entity';
import { CryptoHashAdapter } from './../../../infra/adapters/crypto/CryptoHashAdapter';

describe('AccountsInMemoryRepository', () => {
  const cryptoHashAdapter = new CryptoHashAdapter();
  let service: AccountsInMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsInMemoryRepository],
    }).compile();

    service = module.get<AccountsInMemoryRepository>(
      AccountsInMemoryRepository,
    );
  });

  describe('create', () => {
    it('Given valid payload should create account', () => {
      const accountEntity = AccountEntity.createAccount(
        {
          name: 'John Doe',
          email: 'john2@example.com',
          password: 'Demo@123',
          cpf: '55729425023',
        },
        cryptoHashAdapter,
      );
      const createdAccount = service.create(accountEntity);
      expect(createdAccount).toEqual({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john2@example.com',
        password: expect.any(String),
        cpf: '55729425023',
        role: 1,
      });
    });
    it('Given already existent cpf should return error', () => {
      const accountEntity = AccountEntity.createAccount(
        {
          name: 'John Doe',
          email: 'john3@example.com',
          password: 'Demo@123',
          cpf: '55729425023',
        },
        cryptoHashAdapter,
      );
      const alreadyExistentAccountCall = () => service.create(accountEntity);
      expect(alreadyExistentAccountCall).toThrowError(BadRequestException);
      expect(alreadyExistentAccountCall).toThrowError('Account already exists');
    });
  });

  describe('findAll', () => {
    it('Should return all accounts', () => {
      const accounts = service.findAll();
      expect(accounts).toEqual([
        {
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
          name: 'John Doe',
          email: 'john@example.com',
          password: expect.any(String),
          cpf: '12345678900',
          role: 0,
        },
        {
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: expect.any(String),
          cpf: '98765432100',
          role: 1,
        },
        {
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
          name: 'Bob Johnson',
          email: 'bob@example.com',
          password: expect.any(String),
          cpf: '45678912300',
          role: 1,
        },
        {
          id: expect.any(String),
          name: 'John Doe',
          email: 'john2@example.com',
          password: expect.any(String),
          cpf: '55729425023',
          role: 1,
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('Given existent id should return account', () => {
      const account = service.findOne({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
      });
      expect(account).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: expect.any(String),
        cpf: '45678912300',
        role: 1,
      });
    });

    it('Given inexistent id should return null', () => {
      const account = service.findOne({ id: 'invalid test' });
      expect(account).toBe(null);
    });

    it('Given existent cpf should return account', () => {
      const account = service.findOne({
        cpf: '98765432100',
      });
      expect(account).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password:
          'c1568246ce2acb6e9bb1016e405f103a6725bbd3261ee6bc9273d6149c319690D@',
        cpf: '98765432100',
        role: 1,
      });
    });
  });

  describe('update', () => {
    it('Given existent id and payload should return updated account', () => {
      const account = service.update({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
        name: 'joao',
        email: 'bob@example.com',
        password: 'Demo@123',
        cpf: '45678912300',
        role: 1,
      });
      expect(account).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
        name: 'joao',
        email: 'bob@example.com',
        password: expect.any(String),
        cpf: '45678912300',
        role: 1,
      });
    });

    it('Given inexistent id should return error', () => {
      const noIdCall = () =>
        service.update({
          id: 'invalid test',
          name: 'testing name',
          email: 'bob@example.com',
          password: 'Demo@123',
          cpf: '45678912300',
          role: 1,
        });
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError('No account found');
    });
  });

  describe('remove', () => {
    it('Given existent id should return removed account', () => {
      const accounts = service.findAll();
      const lastAccount = accounts[accounts.length - 1];
      const removedAccount = service.remove(lastAccount.id);
      expect(removedAccount).toEqual({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john2@example.com',
        password: expect.any(String),
        cpf: '55729425023',
        role: 1,
      });
    });

    it('Given inexistent id should return error', () => {
      const noIdCall = () => service.remove('invalid test');
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError('No account found');
    });
  });
});
