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

  //========= get user by id ==========//
  async getUser(id: number, req: Request) {
    const decodedUserInfo = (req as any).user;
    const foundUser = await this.prisma.user.findUnique({ where: { id: +id } });

    if (!foundUser) {
      throw new NotFoundException('user not found');
    }

    if (foundUser.id !== +decodedUserInfo.id) {
      throw new ForbiddenException('you can access only your info');
    }

    delete foundUser.password;

    return { user: foundUser };
  }

  //========= get all user ==========//
  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, email: true },
    });

    return { users };
  }

  //========= delete by id ==========//
  async deleteUser(id: number, req: Request) {
    const decodedUserInfo = (req as any).user;
    const foundUser = await this.prisma.user.findUnique({ where: { id: +id } });

    if (!foundUser) {
      throw new NotFoundException('user not found');
    }

    if (foundUser.id !== +decodedUserInfo.id) {
      throw new ForbiddenException('you can not delete');
    }

    const deleteUser = await this.prisma.user.delete({
      where: {
        id: +id,
      },
    });
    if (deleteUser) {
      return { message: 'Delete successfully' };
    }
  }
}
