import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CommentDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Minimum 3 chars' })
  content: string;
}
