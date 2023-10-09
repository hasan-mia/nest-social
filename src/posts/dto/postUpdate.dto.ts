import { IsArray, IsOptional, IsString } from 'class-validator';

export class PostUpdateDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  reactions?: string[];

  @IsOptional()
  @IsString()
  reactionType?: string;
}
