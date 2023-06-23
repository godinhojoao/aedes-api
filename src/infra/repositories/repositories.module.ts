import { Module } from '@nestjs/common';
import { AccountsRepository } from '../../domain/repositories/accounts.repository';
import { ComplaintsRepository } from '../../domain/repositories/complaints.repository';
import { AccountsInMemoryRepository } from './accounts/accounts-in-memory-repository.service';
import { ComplaintsInMemoryRepository } from './complaints/complaints-in-memory-repository.service';

@Module({
  providers: [
    {
      provide: AccountsRepository,
      useClass: AccountsInMemoryRepository,
    },
    {
      provide: ComplaintsRepository,
      useClass: ComplaintsInMemoryRepository,
    },
  ],
  exports: [AccountsRepository, ComplaintsRepository],
})
export class RepositoriesModule {}
