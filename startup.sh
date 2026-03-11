#!/bin/bash
set -e

echo "=== Starting Laravel Backend ==="

echo "Running database migrations..."
# Try normal migrate first; if it fails due to existing tables, do a fresh migrate
php artisan migrate --force || php artisan migrate:fresh --force

echo "Starting server on port $PORT..."
php artisan serve --host=0.0.0.0 --port=$PORT
