#!/usr/bin/env node
/* Captures de contrôle visuel (outil de développement, non publié).
   Usage : node scripts/screenshots.js [url] [dossier]
   Nécessite Playwright (préinstallé dans l'environnement de développement). */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const url = process.argv[2] || "http://localhost:8000/";
const out = process.argv[3] || path.join(__dirname, "..", "docs", "preview");
const widths = [320, 375, 768, 1024, 1440];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    await page.goto(url, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    await page.screenshot({ path: path.join(out, `home-${width}.jpg`), fullPage: true, type: "jpeg", quality: 72 });
    console.log(`${width}px — débordement horizontal : ${overflow}px`);
    await page.close();
  }
  await browser.close();
})();
