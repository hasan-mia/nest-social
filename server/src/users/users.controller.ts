import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  Request,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { multerOptions } from 'src/multer/multer.provider';
import { domain } from 'utils/constants';
import { UpdatePicDto } from './dto/updatePic.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //========= get user by id ==========//
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param() params: { id: number }, @Req() req) {
    return this.usersService.getUser(params.id, req);
  }

  //========= update user Info ==========//
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  updateUserInfo(
    @Param() params: { id: number },
    @Body() dto: UpdateUserDto,
    @Request() req,
    @Response() res,
  ) {
    return this.usersService.updateUserInfo(params.id, dto, req, res);
  }

  //========= update user Profile Pic ==========//
  @UseGuards(JwtAuthGuard)
  @Put('update/profile/:id')
  @UseInterceptors(FileInterceptor('profileImage', multerOptions))
  updateProfileImage(
    @Param() params: { id: number },
    @Body() dto: UpdatePicDto,
    @UploadedFile() profileImage: Express.Multer.File,
    @Request() req,
    @Response() res,
  ) {
    if (!profileImage) {
      return res.status(400).send('No file uploaded.');
    }
    const profilePic = `${domain}/upload/images/${profileImage.filename}`;
    return this.usersService.updateProfileImage(
      params.id,
      dto,
      profilePic,
      req,
      res,
    );
  }

  //========= update user Profile Pic ==========//
  @UseGuards(JwtAuthGuard)
  @Put('update/cover/:id')
  @UseInterceptors(FileInterceptor('coverImage', multerOptions))
  updateCoverImage(
    @Param() params: { id: number },
    @Body() dto: UpdatePicDto,
    @UploadedFile() coverImage: Express.Multer.File,
    @Request() req,
    @Response() res,
  ) {
    if (!coverImage) {
      return res.status(400).send('No file uploaded.');
    }
    const coverPic = `${domain}/upload/images/${coverImage.filename}`;
    return this.usersService.updateCoverImage(
      params.id,
      dto,
      coverPic,
      req,
      res,
    );
  }

  //========= get all user ==========//
  @Get('get/all')
  getUsers() {
    return this.usersService.getUsers();
  }

  //========= delete by id ==========//
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteUser(@Param() params: { id: number }, @Req() req) {
    return this.usersService.deleteUser(params.id, req);
  }
}
