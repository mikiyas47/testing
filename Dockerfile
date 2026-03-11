FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions (PostgreSQL instead of SQLite)
RUN docker-php-ext-install pdo pdo_pgsql pgsql mbstring exif pcntl bcmath

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy application
COPY . /var/www

# Install composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy startup script and make it executable
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh

ENV PORT=8000
EXPOSE 8000

ENTRYPOINT ["/startup.sh"]
