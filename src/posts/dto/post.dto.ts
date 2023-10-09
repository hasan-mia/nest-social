import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  userId: number;
}
