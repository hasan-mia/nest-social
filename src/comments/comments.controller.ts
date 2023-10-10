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
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { DeleteCommentDto } from './dto/deletecomment.dto';
import { updatecommentDto } from './dto/updatecomment.dto';

@Controller('comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  //========= create comment ==========//
  @UseGuards(JwtAuthGuard)
  @Post('create')
  crateComment(@Body() dto: CommentDto, @Request() req, @Response() res) {
    return this.commentsService.crateComment(dto, req, res);
  }
  //========= update comment ==========//
  @UseGuards(JwtAuthGuard)
  @Put('update')
  updateComment(@Body() dto: updatecommentDto, @Req() req) {
    return this.commentsService.updateComment(dto, req);
  }
  //========= delete comment ==========//
  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteComment(@Body() dto: DeleteCommentDto, @Req() req) {
    return this.commentsService.deleteComment(dto, req);
  }
}
