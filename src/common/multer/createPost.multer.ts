import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as fs from 'fs-extra';
import * as path from 'path';

export const createPostMulterOptions = {
    storage: diskStorage({
        destination: function (req, file, cb) {
            if (!req.user) {
                return cb(
                    new UnauthorizedException('User not authenticated'),
                    '',
                );
            }

            const uploadPath = path.join(
                'uploads',
                'images',
                'posts',
                `user-${(req.user as any).id}`,
            );

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirsSync(uploadPath);
                cb(null, uploadPath);
                return;
            }

            cb(null, uploadPath); // Lưu vào thư mục tương ứng với user ID
        },
        filename: (req, file, cb) => {
            const extNameFile = path.extname(file.originalname);
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            const uniqueName = `local-${uniqueSuffix}${extNameFile}`;
            cb(null, uniqueName);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowed = /\/(jpg|jpeg|png|gif)$/;
        if (!file.mimetype.match(allowed)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return cb(new BadRequestException('Unsupported file type'), false);
        }
        cb(null, true);
    },
};
