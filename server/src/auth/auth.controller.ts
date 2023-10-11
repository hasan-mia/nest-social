import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ResetDto } from './dto/reset.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto, @Request() req, @Response() res) {
    return this.authService.signin(dto, req, res);
  }

  @Get('signout')
  signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('resettoken')
  resetToken(@Body() dto: ResetDto, @Request() req, @Response() res) {
    return this.authService.resetToken(dto, req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Put('reset/password')
  resetPass(@Body() dto: AuthDto, @Request() req, @Response() res) {
    return this.authService.resetPass(dto, req, res);
  }
}
