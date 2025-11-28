FROM php:8.3-fpm

# Installer dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    libicu-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Installer les extensions PHP nécessaires à Symfony + API Platform + JWT
RUN docker-php-ext-install \
    pdo pdo_mysql \
    intl \
    zip \
    opcache \
    && docker-php-ext-enable intl

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY . .

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Créer les dossiers nécessaires
RUN mkdir -p var/cache var/log public/uploads/profile \
    && chmod -R 777 var/

EXPOSE 8000

CMD ["php-fpm"]
