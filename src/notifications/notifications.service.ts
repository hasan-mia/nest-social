import { Injectable } from '@nestjs/common';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  //========= create reply ==========//
  async crateReply(dto: NotificationDto) {
    return dto;
  }
  //========= update reply ==========//
  async updateReply(dto: NotificationDto) {
    return dto;
  }
  //========= delete reply ==========//
  async deleteReply(dto: NotificationDto) {
    return dto;
  }
}
