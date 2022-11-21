@echo off
echo Proses backup database :
echo.
php artisan backup:run --only-db --disable-notifications
echo.
pause