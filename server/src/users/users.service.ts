/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { UpdatePicDto } from './dto/updatePic.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //========= get user info by token ==========//
  async getUser(req: Request) {
    const decodedUserInfo = (req as any).user;
    const foundUser = await this.prisma.user.findUnique({
      where: { id: +decodedUserInfo.id },
    });

    if (!foundUser) {
      throw new NotFoundException('user not found');
    }

    delete foundUser.password;

    return { message: 'success', user: foundUser };
  }

  //========= get all user ==========//
  async getUsers() {
    try {
      const users = await this.prisma.user.findMany({
        select: { id: true, email: true, name: true },
      });
      return { users };
    } catch (error) {
      return { error };
    }
  }

  //========= update user info ==========//
  async updateUserInfo(
    id: number,
    dto: UpdateUserDto,
    req: Request,
    res: Response,
  ) {
    const { email, name, username } = dto;
    const decodedUserInfo = (req as any).user;
    if (+id !== +decodedUserInfo.id) {
      throw new ForbiddenException('you can update only your info');
    }
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: +id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (email) {
        user.email = email;
      }
      if (name !== undefined && name !== null) {
        user.name = name;
      }
      if (username) {
        user.username = username;
      }
      const updatedUser = await this.prisma.user.update({
        where: { id: +id },
        data: {
          email: user.email,
          name: user.name,
          username: user.username,
        },
      });
      return res
        .status(202)
        .send({ message: 'information updated', data: updatedUser });
    } catch (error) {
      return error;
    }
  }

  //========= update user Profile Pic ==========//
  async updateProfileImage(
    id: number,
    dto: UpdatePicDto,
    profilePic: string,
    req: Request,
    res: Response,
  ) {
    const { profileImage } = dto;
    const decodedUserInfo = (req as any).user;
    if (+id !== +decodedUserInfo.id) {
      throw new ForbiddenException('you can update only your info');
    }
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: +id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (profilePic) {
        const updatedUser = await this.prisma.user.update({
          where: { id: +id },
          data: {
            profileImage: profilePic,
          },
        });
        return res.status(202).send({
          message: 'Profile image updated',
          data: updatedUser,
        });
      } else {
        return res.status(300).send({
          message: 'Failed to uploaded',
        });
      }
    } catch (error) {
      return error;
    }
  }

  //========= update user cover pic ==========//
  async updateCoverImage(
    id: number,
    dto: UpdatePicDto,
    coverPic: string,
    req: Request,
    res: Response,
  ) {
    const { coverImage } = dto;
    const decodedUserInfo = (req as any).user;
    if (+id !== +decodedUserInfo.id) {
      throw new ForbiddenException('you can update only your info');
    }
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: +id },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (coverPic) {
        const updatedUser = await this.prisma.user.update({
          where: { id: +id },
          data: {
            coverImage: coverPic,
          },
        });
        return res.status(202).send({
          message: 'Cover image updated',
          data: updatedUser,
        });
      } else {
        return res.status(300).send({
          message: 'Failed to uploaded',
        });
      }
    } catch (error) {
      return error;
    }
  }

  //========= delete by id ==========//
  async deleteUser(id: number, req: Request) {
    const decodedUserInfo = (req as any).user;

    if (+id !== +decodedUserInfo.id) {
      throw new ForbiddenException('you can not delete');
    }

    const foundUser = await this.prisma.user.findUnique({ where: { id: +id } });

    if (!foundUser) {
      throw new NotFoundException('user not found');
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
