#!/usr/bin/env bash
# coding: UTF-8

function clear_node_stuff {
    echo "clearing node_modules for folder" $(basename $(pwd))
    rm -rf node_modules
    rm -f package-lock.json
    rm -f yarn.lock
}

cd "$(dirname "$0")"
clear_node_stuff

cd frontend
clear_node_stuff

cd ../backend
clear_node_stuff

cd ../docker
npm run rm
