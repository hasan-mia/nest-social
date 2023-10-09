import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class ReactionsService {
  constructor(private readonly prisma: PrismaService) {}
  // post reaction
  async postReaction(dto: ReactionDto) {
    const { postId, reactionType } = dto;
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const existingReaction = await this.prisma.reaction.findFirst({
      where: { postId, userId: post.userId }, // Assuming the user can only react once
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
          userId: post.userId,
        },
      });
    }

    // Retrieve all reactions for the post and update the reactions field
    // const reactions = await this.prisma.reaction.findMany({
    //   where: { postId },
    //   select: {
    //     reactionType: true,
    //   },
    // });

    // const updatedReactions = reactions.map((r) => r.reactionType);

    // // Update the reactions field in the Post model
    // await this.prisma.post.update({
    //   where: { id: postId },
    //   data: {
    //     reactions: updatedReactions,
    //   },
    // });

    return this.prisma.post.findUnique({
      where: { id: postId },
    });
  }

  // comment reply reaction
  async commentReaction(dto: ReactionDto) {
    const { commentId } = dto;
    return commentId;
  }
}
