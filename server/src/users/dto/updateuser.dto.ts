import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  @Length(6, 20, { message: 'Passowrd has to be at between 6 and 20 chars' })
  public password: string;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public username?: string;

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
