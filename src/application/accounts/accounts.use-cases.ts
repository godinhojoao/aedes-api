import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './../../core/repositories/accounts.repository';
import { AccountEntity } from './../../core/entities/accounts.entity';
import { CreateAccountInput, UpdateAccountInput } from './accounts.dtos';

@Injectable()
export class AccountsUseCases {
  constructor(private accountsRepository: AccountsRepository) {}

  findAll(): AccountEntity[] {
    return this.accountsRepository.findAll();
  }

  create(createAccountInput: CreateAccountInput): AccountEntity {
    return this.accountsRepository.create(createAccountInput);
  }

  findOne(id: string): AccountEntity {
    return this.accountsRepository.findOne(id);
  }

  update(updateAccountInput: UpdateAccountInput): AccountEntity {
    return this.accountsRepository.update(updateAccountInput);
  }

  remove(id: string): AccountEntity {
    return this.accountsRepository.remove(id);
  }
}
