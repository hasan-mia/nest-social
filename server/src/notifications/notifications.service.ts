/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  //========= create notification ==========//
  async createNotification(dto: NotificationDto, req: Request, res: Response) {
    const { notificationType, postId, userId, commentId, replyId, isRead } =
      dto;
    const decodedUserInfo = (req as any).user;
    const foundUser = await this.prisma.user.findUnique({
      where: { id: +decodedUserInfo.id },
    });

    if (!foundUser) {
      throw new NotFoundException('user not found');
    }
    const foundPost = await this.prisma.post.findUnique({
      where: { id: +postId },
    });

    if (!foundPost) {
      throw new NotFoundException('post not found');
    }

    try {
      await this.prisma.notification.create({
        data: {
          notificationType,
          userId: +userId,
          postId,
          commentId,
          replyId,
          isRead,
        },
      });
      return res.send({ message: 'success' });
    } catch (error) {
      return error;
    }
  }

  //========= get user notification ==========//
  async getNotification(req: Response) {
    const decodedUserInfo = (req as any).user;
    const foundUser = await this.prisma.user.findUnique({
      where: { id: +decodedUserInfo.id },
    });

    if (!foundUser) {
      throw new NotFoundException('user not found');
    }
    try {
      const userNotification = await this.prisma.notification.findMany({
        where: {
          userId: +decodedUserInfo.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return userNotification;
    } catch (error) {
      return error;
    }
  }

  //========= read notification ==========//
  async markNotificationAsRead(notificationId: number) {
    try {
      const updatedNotification = await this.prisma.notification.update({
        where: {
          id: notificationId,
        },
        data: {
          isRead: true,
        },
      });
      return updatedNotification;
    } catch (error) {
      return error;
    }
  }
}
