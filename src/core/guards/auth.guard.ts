import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/SkipAuthentication';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const graphqlContext = GqlExecutionContext.create(executionContext);
    return true;
    if (this.verifyIfIsPublic(graphqlContext)) {
      return true;
    }

    const { req } = graphqlContext.getContext();
    const authorizationToken = this.extractTokenFromHeader(req);
    if (!authorizationToken) {
      throw new UnauthorizedException();
    }

    // try {
    //   // const payload = await this.jwtService.verifyAsync(token, {
    //   //   secret: 'test',
    //   // });
    //   const payload = { id: 'dlaae', email: 'joao@gmail.com' };
    // colocar o payload dentro de um objeto pra acessar na aplicação.
    // } catch {
    //   throw new UnauthorizedException();
    // }
    return true;
  }

  private verifyIfIsPublic(context: GqlExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationToken = request?.headers?.authorization;
    const [type, token] = authorizationToken?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
