import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { NotificationDto } from './dto/notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notification')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  //========= create reply ==========//
  @UseGuards(JwtAuthGuard)
  @Post('create')
  crateReply(@Body() dto: NotificationDto) {
    return this.notificationsService.crateReply(dto);
  }
  //========= update reply ==========//
  @UseGuards(JwtAuthGuard)
  @Get('update')
  updateReply(@Body() dto: NotificationDto) {
    return this.notificationsService.updateReply(dto);
  }
  //========= delete reply ==========//
  @UseGuards(JwtAuthGuard)
  @Post('delete')
  deleteReply(@Body() dto: NotificationDto) {
    return this.notificationsService.deleteReply(dto);
  }
}
