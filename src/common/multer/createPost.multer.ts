import { UnauthorizedException } from '@nestjs/common';
import * as express from 'express';

import { FileType } from '../helper/file-upload.helper';
import { createDynamicMulterConfig } from './dynamic-upload.multer';

/**
 * Multer config cho Post - chỉ cho phép upload ảnh và video
 * Tự động phân loại vào thư mục images/ hoặc videos/ theo user
 */
export const createPostMulterOptions = createDynamicMulterConfig(
    [FileType.IMAGE, FileType.VIDEO], // Cho phép cả ảnh và video
    (req: express.Request) => {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return req.user['id'] as number;
    },
);

/**
 * Multer config cho Post - chỉ cho phép upload ảnh
 */
export const createPostImageOnlyOptions = createDynamicMulterConfig(
    [FileType.IMAGE], // Chỉ cho phép ảnh
    (req) => {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return req.user['id'] as number;
    },
);

/**
 * Multer config cho tài liệu - cho phép upload PDF, Word, Excel...
 */
export const createPostDocumentOptions = createDynamicMulterConfig(
    [FileType.DOCUMENT],
    (req) => {
        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }
        return req.user['id'] as number;
    },
);
