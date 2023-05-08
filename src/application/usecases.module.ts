import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infra/repositories/repositories.module';
import { AccountsUseCases } from './accounts/accounts.use-cases';
import { AdaptersModule } from './../infra/adapters/adapters.module';

@Module({
  imports: [RepositoriesModule, AdaptersModule],
  providers: [AccountsUseCases],
  exports: [AccountsUseCases],
})
export class UseCasesModule {}
