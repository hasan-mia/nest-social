import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}
  //========= create notification ==========//
  async createNotification(dto: NotificationDto) {
    const { notificationType, userId, postId, commentId, replyId } = dto;
    try {
      const notifications = await this.prisma.notification.create({
        data: { notificationType, userId, postId, commentId, replyId },
      });
      return notifications;
    } catch (error) {
      return error;
    }
  }

  //========= get user notification ==========//
  async getNotification(userId: number) {
    try {
      const userNotification = await this.prisma.notification.findMany({
        where: {
          userId: +userId,
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
      const updateNotification = await this.prisma.notification.findMany({
        where: {
          id: +notificationId,
        },
      });
      return updateNotification;
    } catch (error) {
      return error;
    }
  }
}
