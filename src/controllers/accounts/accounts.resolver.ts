import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  Account,
  CreateAccountInput,
  UpdateAccountInput,
} from '../../application/accounts/accounts.dtos';
import { AccountsUseCases } from '../../application/accounts/accounts.use-cases';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsUseCases: AccountsUseCases) {}

  @Mutation(() => Account)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    return this.accountsUseCases.create(createAccountInput);
  }

  @Query(() => [Account])
  findAllAccounts() {
    return this.accountsUseCases.findAll();
  }

  @Query(() => Account)
  findAccount(@Args('id') id: string) {
    return this.accountsUseCases.findOne(id);
  }

  @Mutation(() => Account)
  update(@Args('updateAccountInput') updateAccountInput: UpdateAccountInput) {
    return this.accountsUseCases.update(updateAccountInput);
  }

  @Mutation(() => Account)
  removeAccount(@Args('id') id: string) {
    return this.accountsUseCases.remove(id);
  }
}
