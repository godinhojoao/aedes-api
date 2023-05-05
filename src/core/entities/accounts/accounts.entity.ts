import { CreateAccountInputDto } from './accounts.dtos';
import { CryptoAdapter } from '../../../infra/adapters/crypto/CryptoAdapter';

export enum RoleEnum {
  ADMIN = 0,
  USER = 1,
}

export const CPF_REGEX = /^\d{11}$/;

export class AccountEntity {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public cpf: string;
  public role: RoleEnum;

  private constructor(input: AccountEntity) {
    this.name = input.name;
    this.email = input.email;
    this.password = CryptoAdapter.generateHash(input.password);
    this.cpf = input.cpf;
    this.role = input.role;
    this.id = input.id || CryptoAdapter.generateRandomUUID();
  }

  static createAccount(createAccountInput: CreateAccountInputDto) {
    return new AccountEntity({
      id: undefined,
      name: createAccountInput.name,
      email: createAccountInput.email,
      password: createAccountInput.password,
      cpf: createAccountInput.cpf,
      role: createAccountInput.role === 0 ? RoleEnum.ADMIN : RoleEnum.USER,
    });
  }

  static buildExistentAccount(existentAccount: AccountEntity) {
    return new AccountEntity({
      id: existentAccount.id,
      name: existentAccount.name,
      email: existentAccount.email,
      password: existentAccount.password,
      cpf: existentAccount.cpf,
      role: existentAccount.role,
    });
  }
}
