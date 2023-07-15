import { Module } from '@nestjs/common';
// import { PrismaService } from './prisma.service';

import { ComplaintsInMemoryRepository } from './../repositories/complaints/complaints-in-memory-repository.service';
import { AccountsInMemoryRepository } from './../repositories/accounts/accounts-in-memory-repository.service';
import { AccountsRepository } from '../../domain/repositories/accounts.repository';
import { ComplaintsRepository } from '../..//domain/repositories/complaints.repository';

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
    // PrismaService,
  ],
  exports: [AccountsRepository, ComplaintsRepository /*PrismaService*/],
})
export class DatabaseModule {}
