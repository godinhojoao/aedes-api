import { CreateAccountInputDto } from './accounts.dtos';
import { HashAdapter } from 'src/domain/adapters/HashAdapter';

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
    this.password = input.password;
    this.cpf = input.cpf;
    this.role = input.role;
    this.id = input.id;
  }

  static createAccount(
    createAccountInput: CreateAccountInputDto,
    hashAdapter: HashAdapter,
  ) {
    return new AccountEntity({
      id: hashAdapter.generateRandomUUID(),
      name: createAccountInput.name,
      email: createAccountInput.email,
      password: hashAdapter.generateHash(createAccountInput.password),
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
