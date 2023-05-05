import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountsUseCases } from '../../application/accounts/accounts.use-cases';
import {
  AccountToViewDto,
  CreateAccountInputDto,
  UpdateAccountInputDto,
  FindAccountInputDto,
  RemoveAccountInputDto,
} from '../../core/entities/accounts/accounts.dtos';

@Resolver(() => AccountToViewDto)
export class AccountsResolver {
  constructor(private readonly accountsUseCases: AccountsUseCases) {}

  @Query(() => [AccountToViewDto])
  findAllAccounts(): AccountToViewDto[] {
    return this.accountsUseCases.findAll();
  }

  @Query(() => AccountToViewDto)
  findAccount(@Args('input') input: FindAccountInputDto): AccountToViewDto {
    return this.accountsUseCases.findOne({ id: input.id });
  }

  @Mutation(() => AccountToViewDto)
  createAccount(@Args('input') input: CreateAccountInputDto): AccountToViewDto {
    return this.accountsUseCases.create(input);
  }

  @Mutation(() => AccountToViewDto)
  updateAccount(@Args('input') input: UpdateAccountInputDto): AccountToViewDto {
    return this.accountsUseCases.update(input);
  }

  @Mutation(() => AccountToViewDto)
  removeAccount(@Args('input') input: RemoveAccountInputDto): AccountToViewDto {
    return this.accountsUseCases.remove(input.id);
  }
}
