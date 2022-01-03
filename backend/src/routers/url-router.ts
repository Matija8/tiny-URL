import express from 'express';
import { TinyUrlService } from '../services/tiny-url-service';

export function getUrlRouter(): express.Router {
  const router = express.Router();
  const urlService = new TinyUrlService();

  router.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const longUrl = await urlService.findLongUrl(shortUrl);
    console.log('Getting shortUrl', { longUrl, shortUrl });
    if (!longUrl) {
      res.json('Corresponding url not found!');
      return;
    }
    // Debug only
    // if (!urlService.isUrlValid(longUrl)) throw Error('Invalid long url');
    res.redirect(longUrl);
  });

  router.post('/shortenUrl', async (req, res) => {
    const longUrl = req.body.longUrl;
    if (typeof longUrl !== 'string') {
      res.status(400).json({ error: 'Long url invalid!' });
      return;
    }
    const shortUrl = await urlService.insertLongUrl(longUrl);
    console.log('Shortening longUrl', { longUrl, shortUrl });
    res.json({ shortUrl });
  });

  return router;
}
