-- Active: 1666166263510@@127.0.0.1@3306@newsletter_db

CREATE DATABASE newsletter_db;

USE newsletter_db;

CREATE TABLE
    emails (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        email_status VARCHAR(255) DEFAULT "new",
        time_stamp TIMESTAMP
    );