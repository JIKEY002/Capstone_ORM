USE db_capstone_orm;
CREATE TABLE IF NOT EXISTS `Users` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255),
    `fistname` VARCHAR(255),
    `name` VARCHAR(255),
    `fullName` VARCHAR(255),
    `introduce` VARCHAR(255),
    `username` VARCHAR(255) UNIQUE,
    `website` VARCHAR(255),
    `age` INT,
    `avatar` VARCHAR(255),
    `facebookId` VARCHAR(255) UNIQUE,
    `googleId` VARCHAR(255) UNIQUE,
    -- mặc định luôn luôn có
    -- mặc định luôn luôn có
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS `Posts` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255),
    `href` VARCHAR(255),
    `fileName` VARCHAR(255),
    `fileType` VARCHAR(255),
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
CREATE TABLE IF NOT EXISTS `SavePosts` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `userId` int NOT NULL,
    `postId` int NOT NULL,
    `saveDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`),
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
    `postId` int NOT NULL,
    `content` TEXT,
    `commentDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
    FOREIGN KEY (`postId`) REFERENCES `Posts` (`id`),
    -- mặc định luôn luôn có
    -- mặc định luôn luôn có
    `deletedBy` INT NOT NULL DEFAULT 0,
    `isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
    `deletedAt` TIMESTAMP NULL DEFAULT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);