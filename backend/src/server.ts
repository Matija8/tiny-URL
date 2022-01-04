#!/usr/bin/env node

import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import open from 'open';
import path from 'path';
import { getUrlRouter } from './routers/url-router';

config({ path: __dirname + '/.env' });
const defaultClientPort = 4200;

// TODO: Default error handling

async function main() {
  startApiServer();

  if (process.argv.includes('-openClient')) {
    startClientCodeServer(defaultClientPort);
    open(`http://localhost:${defaultClientPort}/`);
  }
}

function startApiServer(PORT = 1212) {
  const app = makeExpressApp();
  app.use(getUrlRouter());

  app.listen(PORT, () => {
    console.log(`Api server listening on ${PORT}.`);
  });
}

function startClientCodeServer(PORT = defaultClientPort) {
  const app = express();

  const buildDir = path.join(__dirname, '../../frontend/dist/tinyURL/browser');
  app.use(express.static(buildDir));

  app.listen(PORT, () => {
    console.log(`Client code server listening on ${PORT}.`);
  });
}

function makeExpressApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  const morganFormat =
    ':method :url :status :res[content-length] (:response-time ms)';
  app.use(morgan(morganFormat));
  return app;
}

main();
