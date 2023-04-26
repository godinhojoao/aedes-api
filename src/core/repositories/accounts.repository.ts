import {
  CreateAccountInputDto,
  UpdateAccountInputDto,
} from '../entities/accounts/accounts.dtos';
import { AccountEntity } from '../entities/accounts/accounts.entity';

export abstract class AccountsRepository {
  abstract findAll(): AccountEntity[];
  abstract create(createAccountInput: CreateAccountInputDto): AccountEntity;
  abstract findOne(id: string): AccountEntity;
  abstract update(updateAccountInput: UpdateAccountInputDto): AccountEntity;
  abstract remove(id: string): AccountEntity;
}
