import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class ReactionDto {
  @IsOptional()
  @IsString()
  @IsIn(['like', 'love', 'laugh'])
  reactionType?: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsInt()
  @IsOptional()
  commentId?: number;

  @IsInt()
  @IsOptional()
  replyId?: number;

  @IsOptional()
  @IsString()
  content?: string;
}
