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

# Solution 1: Désactiver les scripts Composer problématiques
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts

# Créer les dossiers nécessaires
RUN mkdir -p var/cache var/log public/uploads/profile

# Solution 2: Nettoyer manuellement le cache pour prod
RUN APP_ENV=prod APP_DEBUG=0 php bin/console cache:clear --no-warmup || true
RUN APP_ENV=prod APP_DEBUG=0 php bin/console cache:warmup || true

# Définir les permissions
RUN chmod -R 777 var/

EXPOSE 8000

CMD ["php-fpm"]