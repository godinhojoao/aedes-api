import { Module } from '@nestjs/common';
import { AccountsUseCases } from './accounts/accounts.use-cases';
import { InfraModule } from './../infra/infra.module';

@Module({
  imports: [InfraModule],
  providers: [AccountsUseCases],
  exports: [AccountsUseCases],
})
export class UseCasesModule {}
