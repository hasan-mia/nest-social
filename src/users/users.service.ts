/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number, req: Request) {
    const decodedUserInfo = (req as any).user;
    const foundUser = await this.prisma.user.findUnique({ where: { id: +id } });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== +decodedUserInfo.id) {
      throw new ForbiddenException();
    }

    delete foundUser.password;

    return { user: foundUser };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, email: true },
    });

    return { users };
  }

  async deleteUser(id: number, req: Request) {
    const decodedUserInfo = (req as any).user;
    const foundUser = await this.prisma.user.findUnique({ where: { id: +id } });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== +decodedUserInfo.id) {
      throw new ForbiddenException();
    }

    const deleteUser = await this.prisma.user.delete({
      where: {
        id: +req.params.id,
      },
    });
    if (deleteUser) {
      return { message: 'Delete successfully' };
    }
  }
}
