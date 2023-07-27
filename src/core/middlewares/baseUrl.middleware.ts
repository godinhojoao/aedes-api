import { Injectable, NestMiddleware } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class BaseUrlMiddleware implements NestMiddleware {
  use(context: any, next: () => void) {
    const request = GqlExecutionContext.create(context).getContext().req;
    const baseUrl = `${request.protocol}://${request.get('host')}`;
    context.baseUrl = baseUrl; // Store the base URL in the context
    next();
  }
}
