import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { DeleteReplyDto } from './dto/deletereply.dto';
import { ReplyDto } from './dto/reply.dto';
import { updateReplyDto } from './dto/updatereply.dto';
import { RepliesService } from './replies.service';

@Controller('reply')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}
  //========= create reply ==========//
  @UseGuards(JwtAuthGuard)
  @Post('create')
  crateReply(@Body() dto: ReplyDto, @Request() req, @Response() res) {
    return this.repliesService.crateReply(dto, req, res);
  }
  //========= update reply ==========//
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateReply(@Body() dto: updateReplyDto, @Req() req) {
    return this.repliesService.updateReply(dto, req);
  }
  //========= delete reply ==========//
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteReply(@Body() dto: DeleteReplyDto, @Req() req) {
    return this.repliesService.deleteReply(dto, req);
  }
}
