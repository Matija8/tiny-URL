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

    // No need to await
    urlService.updateTimesUsed(shortUrl);

    // Debug only
    // if (!urlService.isUrlValid(longUrl)) throw Error('Invalid long url');

    // If we wanted to decrease server load for the price of worsened analytics,
    // we could use a 301 redirect which would make browsers cache the redirect
    // res.redirect(301, longUrl);
    res.redirect(302, longUrl);
  });

  router.post('/shortenUrl', async (req, res) => {
    const longUrl = req.body.longUrl;
    if (typeof longUrl !== 'string') {
      res.status(400).json({ error: 'Long url invalid!' });
      return;
    }
    try {
      const shortUrl = await urlService.insertLongUrl(longUrl);
      console.log('Shortened a longUrl', { longUrl, shortUrl });
      res.json({ shortUrl });
    } catch (err) {
      res.status(500).json({ error: 'Insert failed' });
      // TODO: Log to fs based on error type.
    }
  });

  router.post('/getAnalytics', async (req, res) => {
    try {
      const data = await urlService.getMostUpdated();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Get failed' });
      // TODO: Log to fs based on error type.
    }
  });

  return router;
}
