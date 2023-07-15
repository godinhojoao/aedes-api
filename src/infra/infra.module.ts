import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters/adapters.module';
// import { RepositoriesModule } from './repositories/repositories.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AdaptersModule, DatabaseModule],
  exports: [AdaptersModule, DatabaseModule],
  providers: [],
})
export class InfraModule {}
