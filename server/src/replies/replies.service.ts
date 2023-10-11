import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { DeleteReplyDto } from './dto/deletereply.dto';
import { ReplyDto } from './dto/reply.dto';
import { updateReplyDto } from './dto/updatereply.dto';

@Injectable()
export class RepliesService {
  constructor(private prisma: PrismaService) {}

  //========= create reply ==========//
  async crateReply(dto: ReplyDto, req: Request, res: Response) {
    const { postId, userId, commentId, content } = dto;
    try {
      const existingComment = await this.prisma.comment.findUnique({
        where: { postId: +postId, id: +commentId },
      });
      if (!existingComment) {
        throw new NotFoundException(`Comment not found`);
      }
      await this.prisma.reply.create({
        data: { commentId, userId, content },
      });
      // return all comments of that posts
      const postWithComments = await this.prisma.post.findUnique({
        where: { id: +postId },
        include: {
          comments: {
            include: {
              replies: true,
            },
          },
        },
      });

      const comments = postWithComments?.comments || [];
      return res.send(comments);
    } catch (error) {
      return res.send(error);
    }
  }
  //========= update reply ==========//
  async updateReply(dto: updateReplyDto, req: Response) {
    const decodedUserInfo = (req as any).user;
    const { id, postId, userId, commentId, content } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { id: +userId },
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== +decodedUserInfo.id) {
      throw new ForbiddenException();
    }
    try {
      const existingReply = await this.prisma.reply.findUnique({
        where: { commentId: +commentId, id: +id, userId: +userId },
      });
      if (!existingReply) {
        throw new NotFoundException(`Comment not found`);
      }
      await this.prisma.reply.update({
        where: { id: +id },
        data: { content },
      });

      // return all comments of that posts
      const postWithComments = await this.prisma.post.findUnique({
        where: { id: +postId },
        include: {
          comments: {
            include: {
              replies: true,
            },
          },
        },
      });

      const comments = postWithComments?.comments || [];
      return comments;
    } catch (error) {
      return error;
    }
  }
  //========= delete reply ==========//
  async deleteReply(dto: DeleteReplyDto, req: Response) {
    const decodedUserInfo = (req as any).user;
    const { replyId, postId, userId } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { id: +userId },
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== +decodedUserInfo.id) {
      throw new ForbiddenException();
    }
    try {
      const existingComment = await this.prisma.reply.findUnique({
        where: { id: +replyId, userId: +userId },
      });
      if (!existingComment) {
        throw new NotFoundException(`Comment not found`);
      }
      await this.prisma.reply.delete({
        where: { id: +replyId, userId: +userId },
      });

      // return all comments of that posts
      const postWithComments = await this.prisma.post.findUnique({
        where: { id: +postId },
        include: {
          comments: {
            include: {
              replies: true,
            },
          },
        },
      });
      const comments = postWithComments?.comments || [];
      return { message: 'Delete successfully', data: comments };
    } catch (error) {
      return error;
    }
  }
}
