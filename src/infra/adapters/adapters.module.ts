import { Module } from '@nestjs/common';
import { HashAdapter } from './../../domain/adapters/HashAdapter';
import { JwtAdapter } from './../../domain/adapters/JwtAdapter';
import { CryptoHashAdapter } from './crypto/CryptoHashAdapter';
import { JwtAdapterImp } from './jwt/JwtAdapter';

@Module({
  providers: [
    {
      provide: HashAdapter,
      useClass: CryptoHashAdapter,
    },
    {
      provide: JwtAdapter,
      useClass: JwtAdapterImp,
    },
  ],
  exports: [HashAdapter, JwtAdapter],
})
export class AdaptersModule {}
