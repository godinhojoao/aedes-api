import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AccountEntity,
  RoleEnum,
} from './../../../core/entities/accounts.entity';
import { AccountsRepository } from './../../../core/repositories/accounts.repository';
import {
  CreateAccountInput,
  UpdateAccountInput,
} from './../../../application/accounts/accounts.dtos';

let accounts: AccountEntity[] = [
  {
    id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    documentNumber: '123.456.789-00',
    role: RoleEnum.ADMIN,
  },
  {
    id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
    documentNumber: '987.654.321-00',
    role: RoleEnum.USER,
  },
  {
    id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password789',
    documentNumber: '456.789.123-00',
    role: RoleEnum.USER,
  },
];

@Injectable()
export class AccountsInMemoryRepository implements AccountsRepository {
  create(createAccountInput: CreateAccountInput): AccountEntity {
    accounts.push({
      id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00544',
      ...createAccountInput,
      role: RoleEnum.USER,
    });
    return accounts[accounts.length - 1];
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

  update(updateAccountInput: UpdateAccountInput): AccountEntity {
    const accountIndex = accounts.findIndex(
      (account) => account.id === updateAccountInput.id,
    );
    if (accountIndex < 0) {
      throw new BadRequestException(
        `No account with id ${updateAccountInput.id} found`,
      );
    }
    const currentAccount = accounts[accountIndex];
    accounts[accountIndex] = { ...currentAccount, ...updateAccountInput };
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
