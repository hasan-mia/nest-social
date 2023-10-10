/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // ========create feed post=========
  async createPost(
    dto: PostDto,
    imageUrls: string[],
    req: Request,
    res: Response,
  ) {
    const { userId, content } = dto;

    try {
      // Check if the user exists
      const foundUser = await this.prisma.user.findUnique({
        where: { id: +userId },
      });

      if (!foundUser) {
        throw new NotFoundException('User not found');
      }

      // Create the post and associate images
      const createdPost = await this.prisma.post.create({
        data: {
          content,
          userId: +userId,
          images: {
            createMany: {
              data: imageUrls.map((imageUrl) => ({ imageUrl })),
            },
          },
        },
        include: {
          images: true,
        },
      });

      return res.status(201).json({
        message: 'Post created successfully',
        data: createdPost,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  // ========update feed post=========
  async updatePost(dto: PostDto) {
    return { data: dto };
  }

  // ========delete feed post=========
  async deletePost(id: number) {
    return { id };
  }

  // ========all feed post=========
  async getPosts() {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          images: true,
          author: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
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

      return { data: posts };
    } catch (error) {
      return error;
    }
  }

  // ========single post=========
  async getPost(id: number) {
    return { id };
  }
}
