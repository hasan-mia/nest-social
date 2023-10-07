import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    const {} = dto;
    return { message: 'sign up' };
  }
  async signin() {
    return { message: 'sing in' };
  }

  async signout() {
    return { message: 'sign out' };
  }
  async reset() {
    return { message: 'reset password' };
  }
}
