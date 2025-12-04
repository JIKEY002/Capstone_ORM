import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { uploadDiskLocal } from 'src/common/multer/disk-local.multer';
import { PrismaModule } from 'src/modules-system/prisma/prisma.module';

@Module({
    imports: [MulterModule.register(uploadDiskLocal), PrismaModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
