import { IsOptional, IsString } from 'class-validator';

export class UpdatePicDto {
  @IsOptional()
  @IsString()
  public profileImage?: string;

  @IsOptional()
  @IsString()
  public coverImage?: string;

  @IsOptional()
  @IsString()
  public imageUrl: string;
}
