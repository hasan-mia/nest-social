import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteReplyDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsInt()
  @IsNotEmpty()
  replyId: number;
}
