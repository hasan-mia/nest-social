import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteCommentDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsInt()
  @IsNotEmpty()
  commentId: number;
}
