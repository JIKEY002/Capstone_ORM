import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import {
    FileType,
    validateFile,
    getUploadPath,
    generateFileName,
    MAX_FILE_SIZE,
} from '../helper/file-upload.helper';

/**
 * Cấu hình Multer với tự động phân loại file theo type
 * @param allowedTypes - Các loại file được phép upload
 * @param getUserId - Function để lấy userId từ request (optional)
 */
export const createDynamicMulterConfig = (
    allowedTypes: FileType[],
    getUserId?: (req: any) => number,
) => ({
    storage: diskStorage({
        destination: (req, file, cb) => {
            try {
                // Validate file trước
                const validation = validateFile(file, allowedTypes);

                if (!validation.isValid) {
                    return cb(new BadRequestException(validation.error), '');
                }

                // Lấy userId nếu có
                const userId = getUserId ? getUserId(req) : undefined;

                if (!validation.fileType) {
                    return cb(
                        new BadRequestException('Unsupported file type'),
                        '',
                    );
                }
                // Tạo đường dẫn thư mục dựa trên file type
                const uploadPath = getUploadPath(validation.fileType, userId);

                file['fileType'] = uploadPath.typePath;

                // Tạo thư mục nếu chưa tồn tại
                if (!existsSync(uploadPath.fullPath)) {
                    mkdirSync(uploadPath.fullPath, { recursive: true });
                }

                cb(null, uploadPath.fullPath);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                cb(new BadRequestException('Error processing file upload'), '');
            }
        },

        filename: (req, file, cb) => {
            try {
                const userId = getUserId ? getUserId(req) : undefined;
                const fileName = generateFileName(file.originalname, userId);
                cb(null, fileName);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                cb(new BadRequestException('Error generating filename'), '');
            }
        },
    }),

    fileFilter: (req, file, cb) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const validation = validateFile(file, allowedTypes);

        if (!validation.isValid) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return cb(new BadRequestException(validation.error), false);
        }

        cb(null, true);
    },

    limits: {
        fileSize: Math.max(...allowedTypes.map((type) => MAX_FILE_SIZE[type])),
    },
});
