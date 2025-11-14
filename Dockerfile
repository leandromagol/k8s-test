FROM php:8.4-apache

WORKDIR /var/www/html

COPY main.php ./index.php

EXPOSE 80

RUN chown -R www-data:www-data /var/www/html
