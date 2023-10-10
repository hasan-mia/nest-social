import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificationDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsInt()
  @IsNotEmpty()
  commentId: number;

  @IsOptional()
  @IsString()
  content?: string;
}
