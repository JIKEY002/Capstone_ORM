import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

export const uploadMemoryCloud = {
    storage: memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowed = /\/(jpg|jpeg|png|gif)$/;
        if (!file.mimetype.match(allowed)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return cb(new BadRequestException('Unsupported file type'), false);
        }
        cb(null, true);
    },
};
