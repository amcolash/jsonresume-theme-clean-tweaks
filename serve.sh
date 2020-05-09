#!/bin/sh

if ! [ -x "$(command -v nodemon)" ]; then
  echo 'Error: nodemon is not installed, please install via "npm install -g nodemon"' >&2
  exit 1
fi

if ! [ -x "$(command -v simplehttpserver)" ]; then
  echo 'Error: simplehttpserver is not installed, please install via "npm install -g simplehttpserver"' >&2
  exit 1
fi

nodemon --exec "node index.js && simplehttpserver -p 8081 public" -e json,hbs,css,js