import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class updatecommentDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  postId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Minimum 3 chars' })
  content: string;
}
