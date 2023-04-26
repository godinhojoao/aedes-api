import { Test, TestingModule } from '@nestjs/testing';
import { AccountsInMemoryRepository } from './accounts-in-memory-repository.service';
import { BadRequestException } from '@nestjs/common';

describe('AccountsInMemoryRepository', () => {
  let service: AccountsInMemoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsInMemoryRepository],
    }).compile();

    service = module.get<AccountsInMemoryRepository>(
      AccountsInMemoryRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Given valid payload should create account', () => {
      const createdAccount = service.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Demo@123',
        cpf: '12345678900',
      });
      expect(createdAccount).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Demo@123',
        cpf: '12345678900',
        role: 1,
      });
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
          password: 'Demo@123',
          cpf: '12345678900',
          role: 0,
        },
        {
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: 'Demo@123',
          cpf: '98765432100',
          role: 1,
        },
        {
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
          name: 'Bob Johnson',
          email: 'bob@example.com',
          password: 'Demo@123',
          cpf: '45678912300',
          role: 1,
        },
        {
          id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'Demo@123',
          cpf: '12345678900',
          role: 1,
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('Given existent id should return account', () => {
      const account = service.findOne('d8b23a1e-eae3-452b-86bc-bb2ecce00543');
      expect(account).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'Demo@123',
        cpf: '45678912300',
        role: 1,
      });
    });

    it('Given inexistent id should return error', () => {
      const noIdCall = () => service.findOne('invalid test');
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError('No account with id invalid test found');
    });
  });

  describe('update', () => {
    it('Given existent id and payload should return updated account', () => {
      const account = service.update({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
        name: 'joao',
      });
      expect(account).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
        name: 'joao',
        email: 'bob@example.com',
        password: 'Demo@123',
        cpf: '45678912300',
        role: 1,
      });
    });

    it('Given inexistent id should return error', () => {
      const noIdCall = () =>
        service.update({ id: 'invalid test', name: 'testing name' });
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError('No account with id invalid test found');
    });
  });

  describe('remove', () => {
    it('Given existent id should return removed account', () => {
      const removedAccount = service.remove(
        'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
      );
      expect(removedAccount).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Demo@123',
        cpf: '12345678900',
        role: 1,
      });
    });

    it('Given inexistent id should return error', () => {
      const noIdCall = () => service.remove('invalid test');
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError('No account with id invalid test found');
    });
  });
});
