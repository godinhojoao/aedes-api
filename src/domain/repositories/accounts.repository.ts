import { AccountEntity } from '../entities/accounts/accounts.entity';

export type FindOneInput = {
  id?: string;
  cpf?: string;
  email?: string;
};

export abstract class AccountsRepository {
  abstract findAll(): AccountEntity[];
  abstract create(createAccountInput: AccountEntity): AccountEntity;
  abstract findOne(input: FindOneInput): AccountEntity;
  abstract update(updateAccountInput: AccountEntity): AccountEntity;
  abstract remove(id: string): AccountEntity;
}
