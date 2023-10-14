import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: 'Passowrd has to be at between 6 and 20 chars' })
  public password: string;

  public resetToken?: string;
}
