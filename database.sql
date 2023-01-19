CREATE DATABASE newsletter_db;

USE newsletter_db;

CREATE TABLE
    emails (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL
    );