FROM php:8.0-apache

RUN apt-get update && \
    apt-get install -y libzip-dev && \
    docker-php-ext-install zip && \
    a2enmod rewrite

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install SwiftMailer
RUN composer require "swiftmailer/swiftmailer"

COPY . /var/www/html

EXPOSE 6000

CMD ["apache2-foreground"]
