/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { domain } from 'utils/constants';
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

      const allPosts = await this.prisma.post.findMany({
        include: {
          images: true,
          author: {
            select: {
              id: true,
              username: true,
              email: true,
              name: true,
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
                  name: true,
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
                      name: true,
                    },
                  },
                  reactions: true,
                  notifications: true,
                },
                orderBy: {
                  createdAt: 'desc',
                },
              },
              notifications: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          notifications: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(201).json({
        message: 'Post created successfully',
        data: allPosts,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  // ========update feed post=========
  async updatePost(
    id: number,
    dto: PostDto,
    imageUrls: string[],
    req: Request,
    res: Response,
  ) {
    const { userId, content } = dto;

    const decodedUserInfo = (req as any).user;
    if (+userId !== +decodedUserInfo.id) {
      throw new ForbiddenException('you can update only your post');
    }

    const foundUser = await this.prisma.user.findUnique({
      where: { id: +userId },
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    try {
      const post = await this.prisma.post.findUnique({
        where: { id: +id },
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      const updateData: {
        content: string;
        images?: { createMany: { data: { imageUrl: string }[] } };
      } = {
        content: content,
      };

      if (imageUrls && imageUrls.length > 0) {
        // find related images
        const existingImages = await this.prisma.image.findMany({
          where: {
            postId: +id,
          },
          select: {
            id: true,
          },
        });

        // delete existing images
        await this.prisma.image.deleteMany({
          where: {
            id: {
              in: existingImages.map((image) => image.id),
            },
          },
        });

        updateData.images = {
          createMany: {
            data: imageUrls.map((imageUrl) => ({ imageUrl })),
          },
        };
      }

      const updatedPost = await this.prisma.post.update({
        where: {
          id: +id,
        },
        data: updateData,
        include: {
          images: true,
        },
      });

      return res.status(201).json({
        message: 'Updated successfully',
        data: updatedPost,
      });
    } catch (error) {
      return { message: 'Internal server error', error };
    }
  }

  // ========delete feed post=========
  async deletePost(id: number, req: Request) {
    try {
      const decodedUserInfo = (req as any).user;
      const post = await this.prisma.post.findUnique({
        where: { id: +id },
        select: { userId: true },
      });

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      if (post.userId !== +decodedUserInfo.id) {
        throw new ForbiddenException('you can not delete it');
      }
      // find related images
      const existingImages = await this.prisma.image.findMany({
        where: {
          postId: +id,
        },
        select: {
          id: true,
        },
      });

      // delete existing images
      await this.prisma.image.deleteMany({
        where: {
          id: {
            in: existingImages.map((image) => image.id),
          },
        },
      });

      return { message: 'Delete successfully' };
    } catch (error) {
      return error;
    }
  }

  // ========all feed post=========
  async getPosts(page: number, limit: number) {
    const currentPage = page || 1;
    const perPage = limit || 5;
    const skip = (currentPage - 1) * perPage;

    try {
      const [posts, totalPosts] = await Promise.all([
        await this.prisma.post.findMany({
          skip,
          take: perPage,
          include: {
            images: true,
            author: {
              select: {
                id: true,
                username: true,
                email: true,
                name: true,
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
                    name: true,
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
                        name: true,
                      },
                    },
                    reactions: true,
                    notifications: true,
                  },
                  orderBy: {
                    createdAt: 'desc',
                  },
                },
                notifications: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
            notifications: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.post.count(),
      ]);

      const totalPages = Math.ceil(totalPosts / perPage);
      const nextPage = currentPage + 1;
      const nextPageUrl =
        currentPage < totalPages
          ? `${domain}/post/all?page=${nextPage}&limit=${perPage}`
          : null;
      return {
        message: 'posts found',
        total: totalPosts,
        perPage,
        currentPage,
        totalPages,
        nextPage,
        nextPageUrl,
        data: posts,
      };
    } catch (error) {
      return { message: 'Internal server error', error };
    }
  }

  // ========single post=========
  async getPost(id: number) {
    try {
      const singlePost = await this.prisma.post.findUnique({
        where: {
          id: id,
        },
        include: {
          images: true,
          author: {
            select: {
              id: true,
              username: true,
              email: true,
              name: true,
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
                  name: true,
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
                      name: true,
                    },
                  },
                  reactions: true,
                  notifications: true,
                },
                orderBy: {
                  createdAt: 'desc',
                },
              },
              notifications: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          notifications: true,
        },
      });
      return { message: 'success', data: singlePost };
    } catch (error) {
      return { message: 'Internal server error', error };
    }
  }
}
