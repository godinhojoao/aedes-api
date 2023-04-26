import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AccountEntity,
  RoleEnum,
} from './../../../core/entities/accounts/accounts.entity';
import { AccountsRepository } from './../../../core/repositories/accounts.repository';
import {
  CreateAccountInputDto,
  UpdateAccountInputDto,
} from 'src/core/entities/accounts/accounts.dtos';

let accounts: AccountEntity[] = [
  {
    id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Demo@123',
    cpf: '12345678900',
    role: RoleEnum.ADMIN,
  },
  {
    id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Demo@123',
    cpf: '98765432100',
    role: RoleEnum.USER,
  },
  {
    id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'Demo@123',
    cpf: '45678912300',
    role: RoleEnum.USER,
  },
];

@Injectable()
export class AccountsInMemoryRepository implements AccountsRepository {
  create(createAccountInput: CreateAccountInputDto): AccountEntity {
    const newAccount = AccountEntity.createAccount(createAccountInput);
    accounts.push(newAccount);
    return newAccount;
  }

  findAll(): AccountEntity[] {
    return accounts;
  }

  findOne(id: string): AccountEntity {
    const account = accounts.find((account) => account.id === id);
    if (!account) {
      throw new BadRequestException(`No account with id ${id} found`);
    }
    return account;
  }

  update(updateAccountInput: UpdateAccountInputDto): AccountEntity {
    const accountIndex = accounts.findIndex(
      (account) => account.id === updateAccountInput.id,
    );
    if (accountIndex < 0) {
      throw new BadRequestException(
        `No account with id ${updateAccountInput.id} found`,
      );
    }
    const currentAccount = accounts[accountIndex];
    const updatedAccount = AccountEntity.buildExistentAccount({
      ...currentAccount,
      ...updateAccountInput,
    });
    accounts[accountIndex] = updatedAccount;
    return accounts[accountIndex];
  }

  remove(id: string): AccountEntity {
    let accountToRemove = null;
    accounts = accounts.filter((account) => {
      const isToRemove = account.id === id;
      if (isToRemove) {
        accountToRemove = account;
      }
      return !isToRemove;
    });

    if (!accountToRemove) {
      throw new BadRequestException(`No account with id ${id} found`);
    }
    return accountToRemove;
  }
}
