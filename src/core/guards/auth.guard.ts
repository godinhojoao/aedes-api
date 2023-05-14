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
import { JwtAdapter } from './../../domain/adapters/JwtAdapter';
import { RoleEnum } from './../../domain/entities/accounts/accounts.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtAdapter: JwtAdapter) {}

  async canActivate(executionContext: ExecutionContext): Promise<boolean> {
    const graphqlContext = GqlExecutionContext.create(executionContext);
    if (this.verifyIfIsPublic(graphqlContext)) {
      return true;
    }

    const { req } = graphqlContext.getContext();
    const authorizationToken = this.extractTokenFromHeader(req);
    if (!authorizationToken) {
      throw new UnauthorizedException();
    }

    const decodedTokenPayload = this.jwtAdapter.decodeToken(authorizationToken);
    const account = decodedTokenPayload && decodedTokenPayload.data;
    if (account.id && account.email && account.name) {
      req.account = account;
      return this.hasNecessaryRoles(graphqlContext, account.role);
    }

    return false;
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

  private hasNecessaryRoles(
    context: GqlExecutionContext,
    accountRole: RoleEnum,
  ): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!(roles && roles.length)) {
      return true;
    }
    const nedeedRoles = roles
      .map((role) => RoleEnum[role])
      .filter((role) => !!role || role === 0);
    return nedeedRoles.includes(accountRole);
  }
}
