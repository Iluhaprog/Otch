DROP DATABASE IF EXISTS OtchDB; 
CREATE DATABASE OtchDB;
USE OtchDB;

CREATE TABLE Roles(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE Users(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(254) NOT NULL,
    `login` VARCHAR(50) UNIQUE NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `age` INT NOT NULL DEFAULT 18,
    `password` TEXT NOT NULL,
    `salt` TEXT NOT NULL,
    `creation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `role_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`role_id`) REFERENCES Roles(`id`)
);

CREATE TABLE Chats(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `creation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `key` VARCHAR(100) NOT NULL UNIQUE,
    `admin_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`admin_id`) REFERENCES Users(`id`)
        ON DELETE CASCADE
);

CREATE TABLE Messages(
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

CREATE TABLE Users_Chats(
    `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `chat_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES Users(`id`)
        ON DELETE CASCADE,
    FOREIGN KEY (`chat_id`) REFERENCES Chats(`id`)
        ON DELETE CASCADE
);

INSERT INTO Roles(`role`) VALUES
    ('ADMIN'),
    ('USER')