import { chromium } from 'playwright';
import fs from 'node:fs';

const targets = [
  ['jali-ecosystems', 'https://jaliecosystems.co.ke'],
  ['artnation-group', 'https://theartnationgroup.site/'],
  ['shiv-construction', 'https://shivconstruction.co.ke'],
  ['my-school-partner', 'https://myschoolpartner.co.ke'],
  ['skilite-education', 'https://skiliteducation.com'],
  ['chrisale-solutions', 'https://chrisalesolutions.co.ke'],
  ['tvogim-kenya', 'https://tvogimkenya.vercel.app'],
];

async function shoot(name, url) {
  let browser;
  try {
    browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    });
    const context = await browser.newContext({
      viewport: { width: 1200, height: 750 },
      ignoreHTTPSErrors: true,
      userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    let navigated = false;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      navigated = true;
    } catch {
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 30000 });
        navigated = true;
      } catch {
        try {
          await page.goto(url, { waitUntil: 'commit', timeout: 30000 });
          navigated = true;
        } catch {
          /* keep false */
        }
      }
    }
    if (!navigated) return false;

    // let lazy images and fonts settle
    await page
      .evaluate(() =>
        Promise.all(
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map(
              (img) =>
                new Promise((resolve) => {
                  img.onload = img.onerror = resolve;
                  setTimeout(resolve, 6000);
                }),
            ),
        ),
      )
      .catch(() => {});
    await page.waitForTimeout(2500);

    await page.screenshot({
      path: `public/thumbnails/${name}.jpg`,
      type: 'jpeg',
      quality: 78,
    });
    await browser.close();
    return true;
  } catch (error) {
    console.log('  fail:', String(error).split('\n')[0].slice(0, 120));
    if (browser) await browser.close().catch(() => {});
    return false;
  }
}

const results = {};
for (const [name, url] of targets) {
  let ok = false;
  for (let attempt = 1; attempt <= 2 && !ok; attempt += 1) {
    console.log(`${name} attempt ${attempt}`);
    ok = await shoot(name, url);
  }
  results[name] = ok;
  console.log(ok ? `captured ${name}` : `FAILED ${name}`);
  // remove stale png versions once a jpg exists
  if (ok && fs.existsSync(`public/thumbnails/${name}.png`)) {
    fs.unlinkSync(`public/thumbnails/${name}.png`);
  }
}

console.log('SUMMARY', JSON.stringify(results));
