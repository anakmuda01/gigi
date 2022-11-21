@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Are you sure (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

echo Proses update :
echo.
php artisan db:seed --class=SupportTableSeeder
echo.
pause


:END
endlocal