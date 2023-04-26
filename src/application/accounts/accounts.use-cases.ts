import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './../../core/repositories/accounts.repository';
import { AccountEntity } from './../../core/entities/accounts/accounts.entity';
import {
  CreateAccountInputDto,
  UpdateAccountInputDto,
} from './../../core/entities/accounts/accounts.dtos';

@Injectable()
export class AccountsUseCases {
  constructor(private accountsRepository: AccountsRepository) {}

  findAll(): AccountEntity[] {
    return this.accountsRepository.findAll();
  }

  create(createAccountInput: CreateAccountInputDto): AccountEntity {
    return this.accountsRepository.create(createAccountInput);
  }

  findOne(id: string): AccountEntity {
    return this.accountsRepository.findOne(id);
  }

  update(updateAccountInput: UpdateAccountInputDto): AccountEntity {
    return this.accountsRepository.update(updateAccountInput);
  }

  remove(id: string): AccountEntity {
    return this.accountsRepository.remove(id);
  }
}
