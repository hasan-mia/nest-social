import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Response,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { multerOptions } from 'src/multer/multer.provider';
import { domain } from 'utils/constants';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //========= create post ==========//
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 4, multerOptions))
  createPost(
    @Body() dto: PostDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Request() req,
    @Response() res,
  ) {
    //========= handle multiple image upload ==========//
    const imageUrls = images.map((image) => {
      return `${domain}/upload/images/${image.filename}`;
    });
    return this.postsService.createPost(dto, imageUrls, req, res);
  }
  //========= update post ==========//
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('images', 4, multerOptions))
  updatePost(
    @Param() params: { id: number },
    @Body() dto: PostDto,
    @UploadedFiles() images: Express.Multer.File[],
    @Request() req,
    @Response() res,
  ) {
    const imageUrls = images.map((image) => {
      return `${domain}/upload/images/${image.filename}`;
    });
    return this.postsService.updatePost(params.id, dto, imageUrls, req, res);
  }
  //========= update post ==========//
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deletePost(@Param() params: { id: number }) {
    return this.postsService.deletePost(params.id);
  }

  //========= get all post ==========//
  @Get('all')
  getPosts(@Query('page') page: number, @Query('limit') limit: number) {
    return this.postsService.getPosts(page, limit);
  }

  //========= get a post ==========//
  @Get(':id')
  getPost(@Param() params: { id: number }) {
    return this.postsService.getPost(params.id);
  }
  //========= image uploads ==========//
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async upload(@UploadedFiles() images) {
    return images;
  }
}
