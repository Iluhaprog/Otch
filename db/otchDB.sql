DROP DATABASE IF EXISTS heroku_2a79b42d4f668ed; 
CREATE DATABASE heroku_2a79b42d4f668ed;
USE heroku_2a79b42d4f668ed;

CREATE TABLE `Roles`(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Users`(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(254) NOT NULL,
    `login` VARCHAR(50) UNIQUE NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `age` INT NOT NULL DEFAULT 18,
    `password` TEXT NOT NULL,
    `salt` TEXT NOT NULL,
    `creation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `role_id` INT NOT NULL,
    `avatar_image` VARCHAR(150) DEFAULT '',
    `verified` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`role_id`) REFERENCES Roles(`id`)
);

CREATE TABLE `Chats`(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(150) DEFAULT '',
    `creation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `key` VARCHAR(100) NOT NULL UNIQUE,
    `admin_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`admin_id`) REFERENCES Users(`id`)
        ON DELETE CASCADE
);

CREATE TABLE `Messages`(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `chat_id` INT NOT NULL,
    `creation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `message` TEXT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES Users(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`chat_id`) REFERENCES Chats(`id`)
        ON DELETE CASCADE
);

CREATE TABLE `Users_Chats`(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `chat_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES Users(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`chat_id`) REFERENCES Chats(`id`)
        ON DELETE CASCADE
);

CREATE TABLE `Files`(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL UNIQUE,
    `creation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `chat_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `message_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`chat_id`) REFERENCES Chats(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES Users(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`message_id`) REFERENCES Messages(`id`)
        ON DELETE CASCADE
);

CREATE TABLE `Notifications`(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(120) NOT NULL,
    `viewed` INT DEFAULT 0,
    `creation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES Users(`id`)
        ON DELETE CASCADE
);

CREATE TABLE `VerificationCodes`(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(6) NOT NULL UNIQUE,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES Users(`id`)
        ON DELETE CASCADE
);

INSERT INTO `Roles`(`role`) VALUES
    ('ADMIN'),
    ('USER')