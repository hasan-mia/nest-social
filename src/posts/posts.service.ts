/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async createPost(
    dto: PostDto,
    images: Express.Multer.File[],
    req: Request,
    res: Response,
  ) {
    const { userId, content } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { id: +userId },
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    // const domain = 'http://localhost:5000';
    // const imageUrls = images?.map(
    //   (image) => `${domain}/upload/images/${image.filename}`,
    // );
    return res.send({
      message: 'Images uploaded successfully',
    });

    // Create the post and associate images
    // const createdPost = await this.prisma.post.create({
    //   data: {
    //     content,
    //     userId: +userId,
    //     images: {
    //       createMany: {
    //         data: imageUrls.map((imageUrl) => ({ imageUrl })),
    //       },
    //     },
    //   },
    // });

    // return res.status(201).send({ message: 'create post successfull', data });
  }

  // update post
  async updatePost(dto: PostDto) {
    return { data: dto };
  }

  // delete post
  async deletePost(id: number) {
    return { id };
  }

  // get all post
  async getPosts() {
    return 'get all post';
  }

  // get a post
  async getPost(id: number) {
    return { id };
  }
}
