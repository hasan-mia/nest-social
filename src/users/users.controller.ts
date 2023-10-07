import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getUser(params.id, req);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.deleteUser(params.id, req);
  }
}
