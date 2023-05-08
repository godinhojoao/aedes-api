import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ControllersModule } from './controllers/controllers.module';
import {
  GraphqlError,
  ExternalGraphqlError,
} from './controllers/exceptions/GraphqlError';
import { ExceptionsFilter } from './core/filters/exception-filters';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    CoreModule,
    ControllersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      driver: ApolloDriver,
      formatError: (error: ExternalGraphqlError) => {
        return new GraphqlError(error);
      },
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        // exceptionFactory: (error) => {},
      }),
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
