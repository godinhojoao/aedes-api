import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters/adapters.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [AdaptersModule, RepositoriesModule],
  exports: [AdaptersModule, RepositoriesModule],
  providers: [],
})
export class InfraModule {}
