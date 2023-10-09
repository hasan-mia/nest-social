import { IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
export class ReactionDto {
  @IsArray()
  reactions: string[];

  @IsOptional()
  @IsString()
  @IsIn(['like', 'love', 'laugh'])
  reactionType?: string;

  @IsInt()
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
