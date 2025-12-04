import { extname } from 'path';

// Định nghĩa các loại file được phép
export enum FileType {
    IMAGE = 'image',
    VIDEO = 'video',
    DOCUMENT = 'document',
    AUDIO = 'audio',
}

// MIME types cho từng loại file
export const FILE_MIME_TYPES = {
    [FileType.IMAGE]: [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
    ],
    [FileType.VIDEO]: [
        'video/mp4',
        'video/mpeg',
        'video/quicktime',
        'video/x-msvideo',
        'video/x-ms-wmv',
        'video/webm',
    ],
    [FileType.DOCUMENT]: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
    ],
    [FileType.AUDIO]: [
        'audio/mpeg',
        'audio/mp3',
        'audio/wav',
        'audio/ogg',
        'audio/webm',
    ],
};

// File extensions cho từng loại
export const FILE_EXTENSIONS = {
    [FileType.IMAGE]: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    [FileType.VIDEO]: ['.mp4', '.mpeg', '.mov', '.avi', '.wmv', '.webm'],
    [FileType.DOCUMENT]: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt'],
    [FileType.AUDIO]: ['.mp3', '.wav', '.ogg', '.webm'],
};

// Kích thước tối đa cho từng loại file (bytes)
export const MAX_FILE_SIZE = {
    [FileType.IMAGE]: 5 * 1024 * 1024, // 5MB
    [FileType.VIDEO]: 100 * 1024 * 1024, // 100MB
    [FileType.DOCUMENT]: 10 * 1024 * 1024, // 10MB
    [FileType.AUDIO]: 20 * 1024 * 1024, // 20MB
};

/**
 * Xác định loại file dựa trên MIME type
 */
export function getFileType(mimetype: string): FileType | null {
    for (const [type, mimeTypes] of Object.entries(FILE_MIME_TYPES)) {
        if (mimeTypes.includes(mimetype)) {
            return type as FileType;
        }
    }
    return null;
}

/**
 * Kiểm tra file có hợp lệ không (MIME type + extension)
 */
export function validateFile(
    file: Express.Multer.File,
    allowedTypes: FileType[],
): { isValid: boolean; fileType: FileType | null; error?: string } {
    const fileType = getFileType(file.mimetype);

    // Kiểm tra MIME type
    if (!fileType) {
        return {
            isValid: false,
            fileType: null,
            error: 'File type not supported',
        };
    }

    // Kiểm tra file type có trong danh sách cho phép
    if (!allowedTypes.includes(fileType)) {
        return {
            isValid: false,
            fileType,
            error: `Only ${allowedTypes.join(', ')} files are allowed`,
        };
    }

    // Kiểm tra extension khớp với MIME type (chống giả mạo)
    const ext = extname(file.originalname).toLowerCase();
    const validExtensions = FILE_EXTENSIONS[fileType];
    if (!validExtensions.includes(ext)) {
        return {
            isValid: false,
            fileType,
            error: 'File extension does not match file type',
        };
    }

    // Kiểm tra kích thước file
    const maxSize = MAX_FILE_SIZE[fileType];
    if (file.size > maxSize) {
        return {
            isValid: false,
            fileType,
            error: `File size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB`,
        };
    }

    return { isValid: true, fileType };
}

/**
 * Tạo đường dẫn thư mục dựa trên loại file và user
 */
export function getUploadPath(
    fileType: FileType,
    userId?: number,
): { typePath: string; fullPath: string } {
    const basePath = 'uploads';
    const typePath = `${fileType}s`; // images, videos, documents, audios

    if (userId) {
        return {
            typePath,
            fullPath: `${basePath}/${typePath}/user-${userId}`,
        };
    }

    return {
        typePath,
        fullPath: `${basePath}/${typePath}`,
    };
}

/**
 * Tạo tên file unique với timestamp
 */
export function generateFileName(
    originalName: string,
    userId?: number,
): string {
    const timestamp = Date.now();
    const uniqueSuffix = timestamp + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(originalName);
    const prefixName = 'local';

    if (userId) {
        return `${prefixName}-${userId}-${uniqueSuffix}${ext}`;
    }

    return `${prefixName}-${uniqueSuffix}${ext}`;
}
