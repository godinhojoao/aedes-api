import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AccountEntity,
  RoleEnum,
} from '../../../domain/entities/account/account.entity';
import {
  AccountsRepository,
  FindOneInput,
} from '../../../domain/repositories/accounts.repository';

let accounts: AccountEntity[] = [
  {
    id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00541',
    name: 'John Doe',
    email: 'john@example.com',
    password:
      'c1568246ce2acb6e9bb1016e405f103a6725bbd3261ee6bc9273d6149c319690D@', // Demo@123
    cpf: '12345678900',
    role: RoleEnum.ADMIN,
  },
  {
    id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00542',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password:
      'c1568246ce2acb6e9bb1016e405f103a6725bbd3261ee6bc9273d6149c319690D@', // Demo@123
    cpf: '98765432100',
    role: RoleEnum.USER,
  },
  {
    id: 'd8b23a1e-eae3-452b-86bc-bb2ecce00543',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password:
      'c1568246ce2acb6e9bb1016e405f103a6725bbd3261ee6bc9273d6149c319690D@', // Demo@123
    cpf: '45678912300',
    role: RoleEnum.USER,
  },
];

@Injectable()
export class AccountsInMemoryRepository implements AccountsRepository {
  public create(accountEntity: AccountEntity): AccountEntity {
    const existentAccount = this.findOne({
      email: accountEntity.email,
      cpf: accountEntity.cpf,
    });
    // this rule must be on usecase not here on repository
    if (existentAccount) {
      throw new BadRequestException('Account already exists');
    }
    accounts.push(accountEntity);
    return accountEntity;
  }

  public findAll(): AccountEntity[] {
    return accounts;
  }

  public findOne(input: FindOneInput): AccountEntity {
    const account = accounts.find(
      (account) =>
        account.id === input.id ||
        account.cpf === input.cpf ||
        account.email === input.email,
    );
    return account || null;
  }

  public update(updateAccountInput: AccountEntity): AccountEntity {
    const accountIndex = accounts.findIndex(
      (account) => account.id === updateAccountInput.id,
    );
    // this rule must be on usecase not here on repository
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

  public remove(id: string): AccountEntity {
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
