USE db_capstone_orm;
CREATE TABLE IF NOT EXISTS `Users` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255),
    `fullName` VARCHAR(255),
    `age` INT,
    `avatar` VARCHAR(255),
    -- mặc định luôn luôn có
    -- mặc định luôn luôn có
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS `Pictures` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `imageName` VARCHAR(255),
    `path` VARCHAR(255),
    `desc` VARCHAR(255),
    `userId` int NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
    -- mặc định luôn luôn có
    -- mặc định luôn luôn có
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS `UserPictures` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `userId` int NOT NULL,
    `pictureId` int NOT NULL,
    `creationDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`pictureId`) REFERENCES `Pictures` (`id`),
    -- mặc định luôn luôn có
    -- mặc định luôn luôn có
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS `Comments` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `userId` int NOT NULL,
    `pictureId` int NOT NULL,
    `content` TEXT,
    `commentDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`pictureId`) REFERENCES `Pictures` (`id`),
    -- mặc định luôn luôn có
    -- mặc định luôn luôn có
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);