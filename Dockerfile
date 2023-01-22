FROM php:8.0-apache-buster

RUN apt-get update && apt-get install -y \
    libzip-dev \
    && docker-php-ext-configure zip --with-libzip \
    && docker-php-ext-install zip \
    && a2enmod rewrite \
    && apt-get install -y libpng-dev \
    && docker-php-ext-install gd \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && apt-get install -y libonig-dev \
    && docker-php-ext-install mbstring \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install imap \
    && docker-php-ext-install ssl

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Symfony mailer
RUN composer require "symfony/mailer"

# Install dotenv
RUN composer require symfony/dotenv

COPY . /var/www/html
COPY .env /var/www/html/.env

EXPOSE 90

CMD ["apache2-foreground"]
