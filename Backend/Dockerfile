FROM php:8.2-fpm

# Installer les dépendances système
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    libicu-dev \
    git \
    curl \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Installer les extensions PHP requises
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    intl \
    && docker-php-ext-enable pdo_mysql

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY . .

# Installer les dépendances Composer
RUN composer install --no-dev --optimize-autoloader

# Créer les répertoires nécessaires
RUN mkdir -p var/cache var/log public/uploads/profile

# Définir les permissions
RUN chmod -R 755 var/

# Exposer le port
EXPOSE 8000

# Commande par défaut
CMD ["php-fpm"]