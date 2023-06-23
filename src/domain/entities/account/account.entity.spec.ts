import { randomUUID } from 'crypto';
import { AccountEntity, RoleEnum } from './account.entity';
import { CryptoHashAdapter } from '../../../infra/adapters/crypto/CryptoHashAdapter';

describe('AccountEntity', () => {
  const cryptoHashAdapter = new CryptoHashAdapter();

  describe('createAccount', () => {
    it('Given valid infos with cpf and admin role should create account', () => {
      const john = AccountEntity.createAccount(
        {
          name: 'John',
          email: 'john@gmail.com',
          password: 'Demo@123',
          cpf: '71470365065',
          role: RoleEnum.ADMIN,
        },
        cryptoHashAdapter,
      );
      expect(john).toEqual({
        id: expect.any(String),
        name: 'John',
        email: 'john@gmail.com',
        password: expect.any(String),
        cpf: '71470365065',
        role: 0,
      });
    });

    it('Given valid infos with cpf and user role should create account', () => {
      const doe = AccountEntity.createAccount(
        {
          name: 'doe',
          email: 'doe@gmail.com',
          password: 'Demo@123',
          cpf: '71470365065',
          role: RoleEnum.USER,
        },
        cryptoHashAdapter,
      );
      expect(doe).toEqual({
        id: expect.any(String),
        name: 'doe',
        email: 'doe@gmail.com',
        password: expect.any(String),
        cpf: '71470365065',
        role: 1,
      });
    });
  });

  describe('buildExistentAccount', () => {
    it('Given valid infos with cpf and admin role should build existent account', () => {
      const john = AccountEntity.buildExistentAccount({
        id: randomUUID(),
        name: 'John',
        email: 'john@gmail.com',
        password: 'Demo@123',
        cpf: '71470365065',
        role: RoleEnum.ADMIN,
      });
      expect(john).toEqual({
        id: expect.any(String),
        name: 'John',
        email: 'john@gmail.com',
        password: expect.any(String),
        cpf: '71470365065',
        role: 0,
      });
    });

    it('Given valid infos with cpf and user role should build existent account', () => {
      const doe = AccountEntity.buildExistentAccount({
        id: randomUUID(),
        name: 'doe',
        email: 'doe@gmail.com',
        password: 'Demo@123',
        cpf: '71470365065',
        role: RoleEnum.USER,
      });
      expect(doe).toEqual({
        id: expect.any(String),
        name: 'doe',
        email: 'doe@gmail.com',
        password: expect.any(String),
        cpf: '71470365065',
        role: 1,
      });
    });
  });
});
