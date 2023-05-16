import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { InfraModule } from './../infra/infra.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [InfraModule],
})
export class CoreModule {}
