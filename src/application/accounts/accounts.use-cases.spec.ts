import { Test, TestingModule } from '@nestjs/testing';
import { AccountsUseCases } from './accounts.use-cases';
import { AccountsRepository } from '../../core/repositories/accounts.repository';
import { AccountsInMemoryRepository } from '../../infra/repositories/accounts/accounts-in-memory-repository.service';
import { BadRequestException } from '@nestjs/common';

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
        password: expect.any(String),
        cpf: '74238136055',
        role: 1,
      });
    });

    // it('Given invalid payload should return validation error', () => {
    //   // try {
    //   const noCreateCall = () =>
    //     service.create({
    //       name: 'doe',
    //       email: 'doe@gmail.com',
    //       password: 'Demo@123',
    //       cpf: '77320844000144',
    //     });
    //   expect(noCreateCall).toThrowError(ValidationError);
    //   expect(noCreateCall).toThrowError('dale');
    //   // } catch (error) {
    //   //   expect(error).toBeInstanceOf(ValidationError);
    //   //   expect(error).toEqual({
    //   //     invalidProperties: ['cpf'],
    //   //     message: 'Invalid input for cpf with value 77320844000144',
    //   //     name: 'VALIDATION_EXCEPTION',
    //   //     validExample: '90665363060',
    //   //     constraints: {
    //   //       matches: 'cpf must match /^\\d{11}$/ regular expression',
    //   //     },
    //   //     value: '77320844000144',
    //   //   });
    //   // }
    // });

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
        password: expect.any(String),
        cpf: '12345678900',
        role: 1,
      });
    });

    // it('Given invalid payload should return error', () => {
    //   const noUpdateCall = service.update({
    //     id: createdAccountId,
    //     name: 'Testing name',
    //     email: 'updated@example.com',
    //     password: 'Demo@123',
    //     cpf: '77320844000144',
    //     role: 1,
    //   });
    //   expect(noUpdateCall).toThrowError(BadRequestException);
    //   expect(noUpdateCall).toThrowError('Account already exists');
    // });
  });

  describe('findOne', () => {
    it('Given valid id should return account', () => {
      const account = service.findOne({ id: createdAccountId });
      expect(account).toEqual({
        id: createdAccountId,
        name: 'Testing name',
        email: 'updated@example.com',
        password: expect.any(String),
        cpf: '12345678900',
        role: 1,
      });
    });

    it('Given valid cpf should return account', () => {
      const account = service.findOne({ cpf: '98765432100' });
      expect(account).toEqual({
        id: expect.any(String),
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: expect.any(String),
        cpf: '98765432100',
        role: 1,
      });
    });

    it('Given valid cpf and id should return account', () => {
      const account = service.findOne({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
        cpf: '98765432100',
      });
      expect(account).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: expect.any(String),
        cpf: '98765432100',
        role: 1,
      });
    });

    it('Given inexistent id should return error', () => {
      const noIdCall = () => service.findOne({ id: 'invalid test' });
      expect(noIdCall).toThrowError(BadRequestException);
      expect(noIdCall).toThrowError('No account found');
    });

    it('Given inexistent cpf should return error', () => {
      const noCpfCall = () => service.findOne({ cpf: 'invalid test' });
      expect(noCpfCall).toThrowError(BadRequestException);
      expect(noCpfCall).toThrowError('No account found');
    });
  });
});
