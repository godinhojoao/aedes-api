import { Module } from '@nestjs/common';
import { AccountsUseCases } from './accounts/accounts.use-cases';
import { InfraModule } from './../infra/infra.module';
import { ComplaintsUseCases } from './complaints/complaints.use-cases';

@Module({
  imports: [InfraModule],
  providers: [AccountsUseCases, ComplaintsUseCases],
  exports: [AccountsUseCases, ComplaintsUseCases],
})
export class UseCasesModule {}
