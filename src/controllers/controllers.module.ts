import { Module } from '@nestjs/common';
import { AccountsResolver } from './accounts/accounts.resolver';
import { UseCasesModule } from '../application/usecases.module';

@Module({
  providers: [AccountsResolver],
  imports: [UseCasesModule],
})
export class ControllersModule {}
