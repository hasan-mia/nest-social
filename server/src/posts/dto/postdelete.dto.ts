import { IsNotEmpty } from 'class-validator';

export class PostDeleteDto {
  @IsNotEmpty()
  userId: number;
}
