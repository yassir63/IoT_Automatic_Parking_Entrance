@echo off

rem Start npm start in the "IOT-WebApp/api" directory
start cmd /k "cd /d .\WebApp\api && npm start"

rem Start uvicorn in the "IoT_RPi" directory
start cmd /k "cd /d .\IoT_RPi && uvicorn secure:app --reload --host 192.168.137.1 --port 3000"