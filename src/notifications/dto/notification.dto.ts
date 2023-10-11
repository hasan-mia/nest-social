import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsIn([
    'new_post',
    'new_comment',
    'new_reply',
    'post_like',
    'friend_request',
    'new_message',
    'mention',
  ])
  notificationType?: string;

  @IsBoolean()
  @IsNotEmpty()
  isRead: boolean;
}
