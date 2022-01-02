import express from 'express';

export function getUrlRouter(): express.Router {
  const router = express.Router();
  router.get('/test', (req, res) => {
    res.json('All is well!');
  });

  return router;
}
