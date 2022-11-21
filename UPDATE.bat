@echo off
echo Proses update :
echo.
php artisan db:seed --class=SupportTableSeeder
echo.
pause