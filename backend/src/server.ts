#!/usr/bin/env node

import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { getUrlRouter } from './routers/url-router';

config({ path: __dirname + '/.env' });

// TODO: Default error handling

async function main() {
  const app = makeExpressApp();

  app.use(getUrlRouter());

  const PORT = 1212;
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}.`);
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
