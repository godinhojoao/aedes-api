import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AccountsUseCases } from '../../application/accounts/accounts.use-cases';
import {
  AccountToViewDto,
  CreateAccountInputDto,
  UpdateAccountInputDto,
  DeleteAccountInputDto,
  SignInInputDto,
  SignInResultDto,
} from '../../domain/entities/account/account.dtos';
import { SkipAuthentication } from '../../core/decorators/SkipAuthentication';
import { JwtTokenPayload } from './../../domain/adapters/JwtAdapter';
import { Roles } from './../../core/decorators/Roles';

type AuthenticatedRequest = {
  account: JwtTokenPayload;
};
// @Context('req') req: AuthenticatedRequest // usar isso dentro de alguma func dps

@Resolver(() => AccountToViewDto)
export class AccountsResolver {
  constructor(private readonly accountsUseCases: AccountsUseCases) {}

  @Mutation(() => AccountToViewDto)
  updateAccount(@Args('input') input: UpdateAccountInputDto): AccountToViewDto {
    return this.accountsUseCases.update(input);
  }

  @Roles('ADMIN')
  @Mutation(() => AccountToViewDto)
  deleteAccount(@Args('input') input: DeleteAccountInputDto): AccountToViewDto {
    return this.accountsUseCases.remove(input.id);
  }

  @SkipAuthentication()
  @Mutation(() => AccountToViewDto)
  createAccount(@Args('input') input: CreateAccountInputDto): AccountToViewDto {
    return this.accountsUseCases.create(input);
  }

  @SkipAuthentication()
  @Mutation(() => SignInResultDto)
  async signIn(@Args('input') input: SignInInputDto): Promise<SignInResultDto> {
    const result = this.accountsUseCases.signIn(input);
    return result;
  }
}
