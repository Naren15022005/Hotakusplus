#!/bin/bash
cd "$(dirname "$0")"
if [ -d /tmp/hotakus ]; then
  echo "Usando /tmp/hotakus (ya instalado)"
  cd /tmp/hotakus
else
  echo "Primera vez: copiando a /tmp/hotakus..."
  cp -r . /tmp/hotakus
  cd /tmp/hotakus
  npm install --no-fund --no-audit
  npx nest build
fi
echo "Iniciando servidor en http://localhost:4000"
nohup node dist/main.js > server.log 2>&1 &
echo "PID: $!"
echo "Log: server.log"
