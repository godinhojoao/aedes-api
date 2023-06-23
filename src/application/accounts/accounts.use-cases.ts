import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateAccountInputDto,
  UpdateAccountInputDto,
  AccountToViewDto,
  SignInInputDto,
  SignInResultDto,
} from '../../domain/entities/account/account.dtos';
import { HashAdapter } from './../../domain/adapters/HashAdapter';
import { AccountsRepository } from '../../domain/repositories/accounts.repository';
import { JwtAdapter } from './../../domain/adapters/JwtAdapter';
import { AccountEntity } from '../../domain/entities/account/account.entity';
import { AccountMapper } from './accounts.mappers';

@Injectable()
export class AccountsUseCases {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly hashAdapter: HashAdapter,
    private readonly jwtAdapter: JwtAdapter,
  ) {}

  create(input: CreateAccountInputDto): AccountToViewDto {
    const accountEntity = AccountEntity.createAccount(input, this.hashAdapter);
    const createdAccount = this.accountsRepository.create(accountEntity);
    return AccountMapper.toView(createdAccount);
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

  signIn(input: SignInInputDto): SignInResultDto {
    const account = this.accountsRepository.findOne({ email: input.email });
    if (!account) {
      throw new BadRequestException('Invalid email or password.');
    }

    const isCorrectPassword = this.hashAdapter.validate(
      input.password,
      account.password,
    );
    if (!isCorrectPassword) {
      throw new BadRequestException('Invalid email or password.');
    }
    const token = this.jwtAdapter.generateToken({
      id: account.id,
      email: account.email,
      name: account.name,
      role: account.role,
    });
    return {
      account: AccountMapper.toView(account),
      token,
    };
  }
}
