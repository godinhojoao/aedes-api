import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AccountEntity,
  RoleEnum,
} from './../../../core/entities/accounts/accounts.entity';
import {
  AccountsRepository,
  FindOneInput,
} from './../../../core/repositories/accounts.repository';

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
  create(accountEntity: AccountEntity): AccountEntity {
    const existentAccount = accounts.find(
      (account) =>
        account.cpf === accountEntity.cpf ||
        account.email === accountEntity.email,
    );
    if (existentAccount) {
      throw new BadRequestException('Account already exists');
    }
    accounts.push(accountEntity);
    return accountEntity;
  }

  findAll(): AccountEntity[] {
    return accounts;
  }

  findOne(input: FindOneInput): AccountEntity {
    const account = accounts.find(
      (account) => account.id === input.id || account.cpf === input.cpf,
    );
    if (!account) {
      throw new BadRequestException('No account found');
    }
    return account;
  }

  update(updateAccountInput: AccountEntity): AccountEntity {
    const accountIndex = accounts.findIndex(
      (account) => account.id === updateAccountInput.id,
    );
    if (accountIndex < 0) {
      throw new BadRequestException('No account found');
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
      throw new BadRequestException('No account found');
    }
    return accountToRemove;
  }
}
