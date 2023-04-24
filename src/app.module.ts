import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [
    ControllersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      driver: ApolloDriver,
    }),
  ],
})
export class AppModule {}
