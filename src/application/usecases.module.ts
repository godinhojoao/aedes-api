import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infra/repositories/repositories.module';
import { AccountsUseCases } from './accounts/accounts.use-cases';

@Module({
  imports: [RepositoriesModule],
  providers: [AccountsUseCases],
  exports: [AccountsUseCases],
})
export class UseCasesModule {}
