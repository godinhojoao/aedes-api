import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './../../core/repositories/accounts.repository';
import {
  CreateAccountInputDto,
  UpdateAccountInputDto,
  AccountToViewDto,
  FindAccountInputDto,
} from './../../core/entities/accounts/accounts.dtos';
import { AccountEntity } from './../../core/entities/accounts/accounts.entity';
import { AccountMapper } from './accounts.mappers';

@Injectable()
export class AccountsUseCases {
  constructor(private accountsRepository: AccountsRepository) {}

  findAll(): AccountToViewDto[] {
    const accounts = this.accountsRepository.findAll();
    return AccountMapper.manyToView(accounts);
  }

  create(input: CreateAccountInputDto): AccountToViewDto {
    const accountEntity = AccountEntity.createAccount(input);
    const createdAccount = this.accountsRepository.create(accountEntity);
    return AccountMapper.toView(createdAccount);
  }

  findOne(input: FindAccountInputDto): AccountToViewDto {
    const account = this.accountsRepository.findOne({
      id: input.id,
      cpf: input.cpf,
    });
    return AccountMapper.toView(account);
  }

  update(input: UpdateAccountInputDto): AccountToViewDto {
    const accountEntity = AccountEntity.buildExistentAccount(input);
    const updatedAccount = this.accountsRepository.update(accountEntity);
    return AccountMapper.toView(updatedAccount);
  }

  remove(id: string): AccountToViewDto {
    const deletedAccount = this.accountsRepository.remove(id);
    return AccountMapper.toView(deletedAccount);
  }
}
