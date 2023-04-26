import { AccountEntity, RoleEnum } from './accounts.entity';
import { ValidationError } from 'class-validator';

describe('AccountEntity', () => {
  describe('createAccount', () => {
    it('Given valid infos with cpf and admin role should create account', () => {
      const john = AccountEntity.createAccount({
        name: 'John',
        email: 'john@gmail.com',
        password: 'Demo@123',
        cpf: '71470365065',
        role: RoleEnum.ADMIN,
      });
      expect(john).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
        name: 'John',
        email: 'john@gmail.com',
        password: 'Demo@123',
        cpf: '71470365065',
        role: 0,
      });
    });

    it('Given valid infos with cpf and user role should create account', () => {
      const doe = AccountEntity.createAccount({
        name: 'doe',
        email: 'doe@gmail.com',
        password: 'Demo@123',
        cpf: '71470365065',
        role: RoleEnum.USER,
      });
      expect(doe).toEqual({
        id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
        name: 'doe',
        email: 'doe@gmail.com',
        password: 'Demo@123',
        cpf: '71470365065',
        role: 1,
      });
    });

    it('Given invalid cpf should return error', async () => {
      try {
        AccountEntity.createAccount({
          name: 'doe',
          email: 'doe@gmail.com',
          password: 'Demo@123',
          cpf: '77320844000144',
          role: RoleEnum.ADMIN,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toEqual({
          children: [],
          constraints: {
            matches: 'cpf must match /^\\d{11}$/ regular expression',
          },
          property: 'cpf',
          target: {
            cpf: '77320844000144',
            email: 'doe@gmail.com',
            id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
            name: 'doe',
            password: 'Demo@123',
            role: 0,
          },
          value: '77320844000144',
        });
      }
    });

    it('Given invalid email should return error', async () => {
      try {
        AccountEntity.createAccount({
          name: 'doe',
          email: 'doe@',
          password: 'Demo@123',
          cpf: '7732084400014',
          role: RoleEnum.ADMIN,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toEqual({
          children: [],
          constraints: {
            isEmail: 'email must be an email',
          },
          property: 'email',
          target: {
            cpf: '7732084400014',
            email: 'doe@',
            id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
            name: 'doe',
            password: 'Demo@123',
            role: 0,
          },
          value: 'doe@',
        });
      }
    });

    it('Given invalid password should return error', async () => {
      try {
        AccountEntity.createAccount({
          name: 'doe',
          email: 'doe@gmail.com',
          password: '12345',
          cpf: '7732084400014',
          role: RoleEnum.ADMIN,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect(error).toEqual({
          children: [],
          constraints: {
            isStrongPassword:
              'Password must contain at least: 5 characters, 1 number, 1 special char, 1 lowercase and 1 uppercase char.',
          },
          property: 'password',
          target: {
            cpf: '7732084400014',
            email: 'doe@gmail.com',
            id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
            name: 'doe',
            password: '12345',
            role: 0,
          },
          value: '12345',
        });
      }
    });
  });

  // test here
  describe('buildExistentAccount', () => {});
});
