import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import multer, { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'utils/imageupload';
import { MulterInterceptor } from './multer.interceptor';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(
    new MulterInterceptor(
      multer({
        storage: diskStorage({
          destination: './uploads',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      }),
    ),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<string[]> {
    const response: string[] = [];
    files.forEach((file) => {
      response.push(file.filename);
    });
    return response;
  }
}
