import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions: MulterModuleOptions = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      const destination =
        file.fieldname === 'video'
          ? './public/upload/videos'
          : './public/upload/images';
      callback(null, destination);
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      const extension = extname(file.originalname);
      callback(null, `${uniqueSuffix}${extension}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 50, // 50MB
  },
  fileFilter: (req, file, callback) => {
    if (file.fieldname === 'video') {
      // Check if it's a video (single video upload)
      const allowedVideoTypes = /mp4/;
      const mimetype = allowedVideoTypes.test(file.mimetype);
      const extnameCheck = allowedVideoTypes.test(
        extname(file.originalname).toLowerCase(),
      );
      if (mimetype && extnameCheck) {
        callback(null, true);
      } else {
        callback(new Error('Only MP4 files are allowed.'), false);
      }
    } else {
      // Check if it's an image (multiple images upload)
      const allowedImageTypes = /png|jpg|jpeg|gif/;
      const mimetype = allowedImageTypes.test(file.mimetype);
      const extnameCheck = allowedImageTypes.test(
        extname(file.originalname).toLowerCase(),
      );
      if (mimetype && extnameCheck) {
        callback(null, true);
      } else {
        callback(
          new Error('Only PNG, JPG, JPEG, GIF files are allowed.'),
          false,
        );
      }
    }
  },
};
