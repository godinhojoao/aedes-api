import {
  CreateAccountInput,
  UpdateAccountInput,
} from '../../application/accounts/accounts.dtos';
import { AccountEntity } from '../entities/accounts.entity';

export abstract class AccountsRepository {
  abstract findAll(): AccountEntity[];
  abstract create(createAccountInput: CreateAccountInput): AccountEntity;
  abstract findOne(id: string): AccountEntity;
  abstract update(updateAccountInput: UpdateAccountInput): AccountEntity;
  abstract remove(id: string): AccountEntity;
}
