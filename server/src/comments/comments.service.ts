/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
import { DeleteCommentDto } from './dto/deletecomment.dto';
import { updatecommentDto } from './dto/updatecomment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  //========= create comment ==========//
  async crateComment(dto: CommentDto, req: Request, res: Response) {
    const { postId, userId, content } = dto;
    try {
      await this.prisma.comment.create({
        data: { postId, userId, content },
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
  //========= update comment ==========//
  async updateComment(dto: updatecommentDto, req: Request) {
    const decodedUserInfo = (req as any).user;
    const { id, postId, userId, content } = dto;
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
      const existingComment = await this.prisma.comment.findUnique({
        where: { postId: +postId, id: +id, userId: +userId },
      });
      if (!existingComment) {
        throw new NotFoundException(`Comment not found`);
      }
      await this.prisma.comment.update({
        where: { id },
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
  //========= delete comment ==========//
  async deleteComment(dto: DeleteCommentDto, req: Request) {
    const decodedUserInfo = (req as any).user;
    const { commentId, postId, userId } = dto;
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
      const existingComment = await this.prisma.comment.findUnique({
        where: { postId: +postId, id: +commentId, userId: +userId },
      });
      if (!existingComment) {
        throw new NotFoundException(`Comment not found`);
      }
      await this.prisma.comment.delete({
        where: { id: +commentId, userId: +userId },
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
