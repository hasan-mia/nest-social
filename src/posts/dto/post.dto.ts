import { IsNotEmpty, IsString } from 'class-validator';

// class ImageDto {
//   @IsString()
//   imageUrl: string;
// }

export class PostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  // @IsArray()
  // @ValidateNested({ each: true })
  // images: ImageDto[];

  @IsNotEmpty()
  userId: number;
}
