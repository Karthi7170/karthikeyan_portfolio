import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const pages = ['index.html', 'about.html', 'services.html', 'projects.html', 'process.html', 'contact.html'];
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'], ...(process.env.CHROMIUM_PATH && { executablePath: process.env.CHROMIUM_PATH }) });
mkdirSync('artifacts', { recursive: true });

async function checkLogos(page, label) {
  const logos = page.locator('.brand-logo img');
  assert.equal(await logos.count(), 2, `${label}: header and footer logos`);
  await page.waitForFunction(() => [...document.querySelectorAll('.brand-logo img')].every(img => img.complete && img.naturalWidth > 0));
  for (const logo of await logos.all()) {
    const result = await logo.evaluate(async img => {
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0);
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparent = 0, opaque = 0;
      for (let i = 3; i < pixels.length; i += 4) { transparent += pixels[i] === 0; opaque += pixels[i] >= 128; }
      const rect = img.getBoundingClientRect(), header = img.closest('.site-header');
      return { ratio: img.naturalWidth / img.naturalHeight, transparent, opaque, total: pixels.length / 4,
        width: rect.width, height: rect.height, left: rect.left, right: rect.right,
        headerHeight: header?.getBoundingClientRect().height,
        contained: !header || (rect.top >= header.getBoundingClientRect().top - 1 && rect.bottom <= header.getBoundingClientRect().bottom + 1),
        visible: getComputedStyle(img).visibility === 'visible' && Number(getComputedStyle(img).opacity) > 0 };
    });
    assert.ok(result.ratio > 2 && result.ratio < 5, `${label}: wide wordmark`);
    assert.ok(result.transparent > result.total * .1 && result.opaque > result.total * .02, `${label}: visible artwork and transparent background`);
    assert.ok(result.width >= 80 && result.height >= 20 && result.height <= 90, `${label}: readable compact logo`);
    assert.ok(result.left >= -1 && result.right <= page.viewportSize().width + 1 && result.contained && result.visible, `${label}: logo visible without clipping`);
    assert.ok(!result.headerHeight || result.headerHeight <= 100, `${label}: compact header`);
  }
}

async function checkNavigation(page, label, click = false) {
  const nav = page.locator('.site-header .desktop-nav');
  assert.equal(await nav.isVisible(), true, `${label}: navigation visible`);
  assert.deepEqual(await nav.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href'))), pages);
  for (const href of pages) {
    const link = page.locator(`.site-header .desktop-nav a[href="${href}"]`);
    await link.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' }));
    const reachable = await link.evaluate(el => {
      const rect = el.getBoundingClientRect(), navRect = el.closest('nav').getBoundingClientRect();
      return rect.left >= navRect.left - 1 && rect.right <= navRect.right + 1 && document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)?.closest('a') === el;
    });
    assert.ok(reachable, `${label}: ${href} reachable by scrolling`);
    if (click) { await link.click(); await page.waitForURL(new URL(href, base).href); }
  }
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const file of pages) {
      await page.goto(new URL(file, base).href, { waitUntil: 'domcontentloaded' });
      await checkLogos(page, `${width}px ${file}`);
      await checkNavigation(page, `${width}px ${file}`);
    }
    await checkNavigation(page, `${width}px navigation`, true);
    for (const selector of ['.site-header .brand-logo', '.footer-brand.brand-logo']) {
      await page.goto(new URL('contact.html', base).href, { waitUntil: 'domcontentloaded' });
      await page.locator(selector).click(); await page.waitForURL(new URL('index.html', base).href);
    }
    await page.screenshot({ path: `artifacts/header-${width}.png`, animations: 'disabled' });
  }
  for (const width of [1024, 821, 820, 768, 560, 3840]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(new URL('index.html', base).href, { waitUntil: 'domcontentloaded' });
    await checkLogos(page, `${width}px index.html`); await checkNavigation(page, `${width}px navigation`);
  }
  await page.route('**/ai-x-mad-logo.webp*', route => route.abort());
  for (const width of [1440, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(new URL('index.html', base).href, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => [...document.querySelectorAll('.brand-logo img')].every(img => img.currentSrc.includes('ai-x-mad-logo.png') && img.complete && img.naturalWidth > 0));
    await checkLogos(page, `${width}px failed WebP fallback`);
  }
  assert.deepEqual(errors, [], 'No JavaScript errors');
  console.log('PASS: six-page desktop/mobile logos, nine viewport widths, scrolling navigation, home links, transparent decode and PNG fallback.');
} finally { await browser.close(); }
