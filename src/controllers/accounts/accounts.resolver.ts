import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AccountsUseCases } from '../../application/accounts/accounts.use-cases';
import {
  AccountToViewDto,
  CreateAccountInputDto,
  UpdateAccountInputDto,
  FindAccountInputDto,
  RemoveAccountInputDto,
  SignInInputDto,
  SignInResultDto,
} from '../../domain/entities/accounts/accounts.dtos';
import { SkipAuthentication } from '../../core/decorators/SkipAuthentication';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => AccountToViewDto)
export class AccountsResolver {
  constructor(private readonly accountsUseCases: AccountsUseCases) {}

  @Query(() => [AccountToViewDto])
  findAllAccounts(): AccountToViewDto[] {
    return this.accountsUseCases.findAll();
  }

  @Query(() => AccountToViewDto)
  findAccount(@Args('input') input: FindAccountInputDto): AccountToViewDto {
    const account = this.accountsUseCases.findOne(input);
    if (!account) {
      throw new BadRequestException('No account found');
    }
    return account;
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

  @SkipAuthentication()
  @Mutation(() => SignInResultDto)
  async signIn(@Args('input') input: SignInInputDto): Promise<SignInResultDto> {
    const token = await this.accountsUseCases.signIn(input);
    return { token };
  }
}
