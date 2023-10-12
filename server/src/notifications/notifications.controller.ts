import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { NotificationDto } from './dto/notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notification')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  //========= create notification ==========//
  // @UseGuards(JwtAuthGuard)
  @Post('create')
  createNotification(@Body() dto: NotificationDto) {
    return this.notificationsService.createNotification(dto);
  }

  //========= get user notification ==========//
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getNotification(@Param('userId') userId: number, @Req() req) {
    return this.notificationsService.getNotification(userId, req);
  }

  //========= read notification ==========//
  @UseGuards(JwtAuthGuard)
  @Put('read/:notificationId')
  markNotificationAsRead(@Param('notificationId') notificationId: number) {
    return this.notificationsService.markNotificationAsRead(notificationId);
  }
}
