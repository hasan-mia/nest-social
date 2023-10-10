import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificationDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsInt()
  postId: number;

  @IsOptional()
  @IsInt()
  commentId: number;

  @IsOptional()
  @IsInt()
  replyId: number;

  @IsOptional()
  @IsString()
  notificationType?: string;
}
