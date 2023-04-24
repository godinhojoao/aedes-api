import { Module } from '@nestjs/common';
import { AccountsInMemoryRepository } from './accounts/accounts-in-memory-repository.service';
import { AccountsRepository } from './../../core/repositories/accounts.repository';

@Module({
  providers: [
    {
      provide: AccountsRepository,
      useClass: AccountsInMemoryRepository,
    },
  ],
  exports: [AccountsRepository],
})
export class RepositoriesModule {}
