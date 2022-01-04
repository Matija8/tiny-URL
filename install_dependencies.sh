#!/usr/bin/env bash
# coding: UTF-8

function install_npm_deps {
    echo "Installing npm deps for folder" $(basename $(pwd))
    npm i && npm i -D
    # yarn
}

cd "$(dirname "$0")"

cd frontend
install_npm_deps
npm run prerender

cd ../docker
npm run up

cd ../backend
install_npm_deps

cd ..
