import { Router } from 'express';
import puppeteer from 'puppeteer';

const router = Router();

router.post('/pdf', async (req, res, next) => {
  try {
    const { html } = req.body;
    if (!html) {
      return res.status(400).json({ message: 'html is required' });
    }

    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="optimized-resume.pdf"');
    res.send(pdf);
  } catch (error) {
    next(error);
  }
});

export default router;
