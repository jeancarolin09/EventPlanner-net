FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    default-libmysqlclient-dev \
    libicu-dev \
    git \
    curl \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql intl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy project
COPY . .

RUN composer install --optimize-autoloader --no-dev

# Configure Nginx
RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create necessary directories
RUN mkdir -p var/cache var/log public/uploads/profile && \
    chmod -R 777 var/ public/uploads/profile

# Railway exposes $PORT dynamically
ENV PORT=8080

# Start Nginx + PHP-FPM
CMD service nginx start && php-fpm
