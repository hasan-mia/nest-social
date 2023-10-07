import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MulterController } from './multer/multer.controller';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule],
  controllers: [AppController, MulterController],
  providers: [AppService],
})
export class AppModule {}
