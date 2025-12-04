import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

export const uploadDiskLocal = {
    storage: diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/images');
        }, // folder phải tồn tại
        filename: (req, file, cb) => {
            const extNameFile = extname(file.originalname);
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
