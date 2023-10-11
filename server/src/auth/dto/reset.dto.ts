import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  public resetToken?: string;
}
