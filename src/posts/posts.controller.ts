import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Response,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { multerOptions } from 'src/multer/multer.provider';
import { PostDto } from './dto/post.dto';
import { PostsService } from './posts.service';

@Controller('post')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // create post
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  createPost(
    @Body() dto: PostDto,
    @UploadedFile() images: Express.Multer.File[],
    @Request() req,
    @Response() res,
  ) {
    return this.postsService.createPost(dto, images, req, res);
  }
  // update post
  @Put('update')
  updatePost(@Body() dto: PostDto) {
    return this.postsService.updatePost(dto);
  }
  // update post
  @Delete('delete/:id')
  deletePost(@Param() params: { id: number }) {
    return this.postsService.deletePost(params.id);
  }

  // get all post
  @Get('all')
  getPosts() {
    return this.postsService.getPosts();
  }

  // get a post
  @Get(':id')
  getPost(@Param() params: { id: number }) {
    return this.postsService.getPost(params.id);
  }
  // image uploads
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('images', multerOptions))
  async upload(@UploadedFiles() images) {
    return images;
  }
}
