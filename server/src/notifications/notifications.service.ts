import { ForbiddenException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  //========= create notification ==========//
  async createNotification(dto: NotificationDto) {
    const { notificationType, userId, postId, commentId, replyId, isRead } =
      dto;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const notifications = await this.prisma.notification.create({
        data: { notificationType, userId, postId, commentId, replyId, isRead },
      });
      return notifications;
    } catch (error) {
      return error;
    }
  }

  //========= get user notification ==========//
  async getNotification(userId: number, req: Response) {
    const decodedUserInfo = (req as any).user;
    if (+userId !== +decodedUserInfo.id) {
      throw new ForbiddenException('you can access only your notification');
    }
    try {
      const userNotification = await this.prisma.notification.findMany({
        where: {
          userId: +userId,
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
