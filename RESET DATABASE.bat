@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Anda Yakin Ingin Mereset Semua Data dari Database (Hati-hati) (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

echo Proses RESET DATABASE :
echo.
php artisan migrate:refresh --seed
echo.
pause


:END
endlocal