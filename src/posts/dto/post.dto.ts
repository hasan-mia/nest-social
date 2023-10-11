import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  userId: number;

  @IsArray()
  @IsOptional()
  images: string[];

  @IsOptional()
  imageUrl: string;
}
