import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '../interfaces/user.interface';

export const GetUser = createParamDecorator(
  (
    data: keyof User | undefined,
    ctx: ExecutionContext,
  ): User | User[keyof User] => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user as User;
    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }
    if (!data) {
      return user;
    }
    return user[data];
  },
);
