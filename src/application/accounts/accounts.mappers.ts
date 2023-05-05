import { AccountToViewDto } from '../../core/entities/accounts/accounts.dtos';
import { AccountEntity } from '../../core/entities/accounts/accounts.entity';

export class AccountMapper {
  public static toView(
    account: AccountEntity,
  ): AccountToViewDto & { password: string } {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password,
      cpf: account.cpf,
      role: account.role,
    };
  }

  public static manyToView(accounts: AccountEntity[]): AccountToViewDto[] {
    return accounts.map((account) => this.toView(account));
  }

  public static toModel(
    account: AccountToViewDto & { password: string },
  ): AccountEntity {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password,
      cpf: account.cpf,
      role: account.role,
    };
  }
}
