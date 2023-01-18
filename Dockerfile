FROM php:8.0-apache

COPY . /var/www/html

RUN apt-get update && apt-get install -y \
    libzip-dev \
    && docker-php-ext-configure zip --with-libzip \
    && docker-php-ext-install zip \
    && a2enmod rewrite
