import { Module } from '@nestjs/common';
import { AccountsResolver } from './accounts/accounts.resolver';
import { ComplaintsResolver } from './complaints/complaints.resolver';
import { UseCasesModule } from '../application/usecases.module';

@Module({
  providers: [AccountsResolver, ComplaintsResolver],
  imports: [UseCasesModule],
})
export class ControllersModule {}
