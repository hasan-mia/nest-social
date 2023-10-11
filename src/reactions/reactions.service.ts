import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  // ============post reaction==========//
  async postReaction(dto: ReactionDto) {
    const { postId, userId, reactionType } = dto;
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`user not found`);
      }
      const post = await this.prisma.post.findUnique({
        where: { id: postId },
      });

      if (!post) {
        throw new NotFoundException(`Post not found`);
      }
      // Assuming the user can only react once
      const existingReaction = await this.prisma.reaction.findFirst({
        where: { userId: userId, postId: postId },
      });
      if (existingReaction) {
        // If the user has already reacted, update the existing reaction
        await this.prisma.reaction.update({
          where: { id: existingReaction.id },
          data: {
            reactionType,
          },
        });
      } else {
        // If the user hasn't reacted before, create a new reaction
        await this.prisma.reaction.create({
          data: {
            reactionType,
            postId,
            userId: +userId,
          },
        });
      }
      // return all reaction of that posts
      return this.prisma.post.findUnique({
        where: { id: postId },
        include: {
          reactions: true,
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
              reactions: true,
              replies: {
                include: {
                  user: {
                    select: {
                      id: true,
                      username: true,
                      email: true,
                    },
                  },
                  reactions: true,
                  notifications: true,
                },
              },
              notifications: true,
            },
          },
          notifications: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  // ============comment reaction==========//
  async commentReaction(dto: ReactionDto) {
    const { postId, commentId, userId, reactionType } = dto;
    try {
      const comment = await this.prisma.comment.findFirst({
        where: {
          postId: postId,
          id: commentId,
        },
      });
      if (!comment) {
        throw new NotFoundException(`Post with ID ${commentId} not found`);
      }
      // Assuming the user can only react once
      const existingReaction = await this.prisma.reaction.findFirst({
        where: { userId: +userId, postId: +postId, commentId: +commentId },
      });
      if (existingReaction) {
        // If the user has already reacted, update the existing reaction
        await this.prisma.reaction.update({
          where: { id: existingReaction.id },
          data: {
            reactionType,
          },
        });
      } else {
        // If the user hasn't reacted before, create a new reaction
        await this.prisma.reaction.create({
          data: {
            reactionType,
            postId,
            commentId,
            userId: userId,
          },
        });
      }
      // return all reaction of that posts
      return this.prisma.post.findUnique({
        where: { id: postId },
        include: {
          reactions: true,
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
              reactions: true,
              replies: {
                include: {
                  user: {
                    select: {
                      id: true,
                      username: true,
                      email: true,
                    },
                  },
                  reactions: true,
                  notifications: true,
                },
              },
              notifications: true,
            },
          },
          notifications: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  // ============reply reaction==========//
  async replyReaction(dto: ReactionDto) {
    const { postId, commentId, userId, replyId, reactionType } = dto;
    try {
      const comment = await this.prisma.comment.findFirst({
        where: {
          postId: postId,
          id: commentId,
        },
      });
      if (!comment) {
        throw new NotFoundException(`Post with ID ${commentId} not found`);
      }
      // Assuming the user can only react once
      const existingReaction = await this.prisma.reaction.findFirst({
        where: {
          userId: +userId,
          postId: +postId,
          commentId: +commentId,
          replyId: +replyId,
        },
      });
      if (existingReaction) {
        // If the user has already reacted, update the existing reaction
        await this.prisma.reaction.update({
          where: { id: existingReaction.id },
          data: {
            reactionType,
          },
        });
      } else {
        // If the user hasn't reacted before, create a new reaction
        await this.prisma.reaction.create({
          data: {
            reactionType,
            postId,
            commentId,
            replyId,
            userId: userId,
          },
        });
      }
      // return all reaction of that posts
      return this.prisma.post.findUnique({
        where: { id: postId },
        include: {
          reactions: true,
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
              reactions: true,
              replies: {
                include: {
                  user: {
                    select: {
                      id: true,
                      username: true,
                      email: true,
                    },
                  },
                  reactions: true,
                  notifications: true,
                },
              },
              notifications: true,
            },
          },
          notifications: true,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
