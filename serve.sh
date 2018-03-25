#!/bin/sh

if ! [ -x "$(command -v nodemon)" ]; then
  echo 'Error: nodemon is not installed, please install via "npm install -g nodemon"' >&2
  exit 1
fi

nodemon -e json,hbs,css,js index.js