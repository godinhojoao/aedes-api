import { Test, TestingModule } from '@nestjs/testing';
import { AccountsResolver } from './accounts.resolver';
import { UseCasesModule } from '../../application/usecases.module';

describe('AccountsResolver', () => {
  let resolver: AccountsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsResolver],
      imports: [UseCasesModule],
    }).compile();

    resolver = module.get<AccountsResolver>(AccountsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // describe('findOne', () => {
  //   it('Given invalid id should return error', () => {
  //     try {
  //       resolver.findAccount({ id: undefined });
  //     } catch (error) {
  //       expect(error).toEqual({});
  //     }
  //   });
  // });
});
