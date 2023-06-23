import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters/adapters.module';
import { RepositoriesModule } from './repositories/repositories.module';
// import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AdaptersModule, RepositoriesModule /* DatabaseModule */],
  exports: [AdaptersModule, RepositoriesModule /* DatabaseModule */],
  providers: [],
})
export class InfraModule {}
