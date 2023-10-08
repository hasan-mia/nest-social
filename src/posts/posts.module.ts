import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/multer/multer.provider';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [MulterModule.register(multerOptions)],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
