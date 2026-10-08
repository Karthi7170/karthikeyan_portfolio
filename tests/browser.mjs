import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const base = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const errors = [];
mkdirSync('artifacts', { recursive: true });

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  desktop.on('pageerror', e => errors.push('desktop: ' + e.message));

  const pages = ['index.html', 'about.html', 'services.html', 'projects.html', 'process.html', 'contact.html', 'website-development-chennai.html'];
  for (const path of pages) {
    const response = await desktop.goto(new URL(path, base).href, { waitUntil: 'domcontentloaded' });
    assert.equal(response?.status(), 200, path + ' responds with HTTP 200');
    assert.ok((await desktop.title()).length > 15, path + ' has a title');
    assert.ok(await desktop.locator('h1').count() >= 1, path + ' has a heading');
    assert.equal(await desktop.locator('meta[name="description"]').count(), 1, path + ' has a description');
    assert.equal(await desktop.locator('link[rel="canonical"]').getAttribute('href'),
      path === 'index.html' ? 'https://aimadstudio.in/' : 'https://aimadstudio.in/' + path,
      path + ' canonical matches the page');
  }
  await desktop.goto(new URL('index.html', base).href, { waitUntil: 'domcontentloaded' });
  assert.match(await desktop.title(), /Website Developers in Chennai/);
  assert.match(await desktop.locator('.hero h1').innerText(), /Chennai/);
  assert.match(await desktop.locator('.hero h1').innerText(), /Worldwide/);
  assert.ok(await desktop.locator('.service-card').count() >= 10, 'Full service offerings retained');
  assert.equal(await desktop.locator('.brand-logo img').first().count(), 1);
  assert.equal(await desktop.locator('.desktop-nav a').count(), 6);
  await desktop.screenshot({ path: 'artifacts/desktop-seo-home.png', animations: 'disabled' });

  await desktop.goto(new URL('website-development-chennai.html', base).href, { waitUntil: 'domcontentloaded' });
  assert.match(await desktop.locator('h1').innerText(), /Website Development in Chennai/);
  assert.ok(await desktop.locator('a[href="contact.html"]').count() >= 1);
  await desktop.screenshot({ path: 'artifacts/desktop-chennai-landing.png', animations: 'disabled' });

  await desktop.goto(new URL('contact.html', base).href, { waitUntil: 'domcontentloaded' });
  await desktop.locator('#name').fill('Test Client');
  await desktop.locator('#email').fill('test@example.com');
  await desktop.locator('#phone').fill('+91 9000000000');
  await desktop.locator('#service').selectOption({ label: 'Business Websites' });
  await desktop.locator('#message').fill('Please share details about a new website.');
  await desktop.evaluate(() => {
    window.__testedWhatsApp = '';
    window.open = url => { window.__testedWhatsApp = url; return null; };
  });
  await desktop.locator('#contact-form button[type="submit"]').click();
  const whatsapp = await desktop.evaluate(() => window.__testedWhatsApp);
  assert.ok(whatsapp.startsWith('https://wa.me/919944754339?text='), 'Contact form opens WhatsApp');
  const message = new URL(whatsapp).searchParams.get('text');
  assert.ok(message.includes('Test Client') && message.includes('Business Websites'));

  for (const width of [390, 320]) {
    const mobile = await browser.newPage({ viewport: { width, height: 840 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
    mobile.on('pageerror', e => errors.push(width + 'px: ' + e.message));
    const response = await mobile.goto(new URL('index.html', base).href, { waitUntil: 'domcontentloaded' });
    assert.equal(response?.status(), 200);
    const menu = mobile.locator('.menu-btn');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    await menu.click();
    assert.equal(await menu.getAttribute('aria-expanded'), 'true');
    assert.equal(await mobile.locator('.mobile-nav').isVisible(), true);
    await mobile.locator('.mobile-nav a[href="services.html"]').click();
    await mobile.waitForURL(new URL('services.html', base).href);
    assert.equal(await mobile.locator('.menu-btn').getAttribute('aria-expanded'), 'false');
    await mobile.screenshot({ path: 'artifacts/mobile-services-' + width + '.png', animations: 'disabled' });
    await mobile.close();
  }
  const map = await desktop.request.get(new URL('sitemap.xml', base).href);
  assert.equal(map.status(), 200);
  assert.ok((await map.text()).includes('website-development-chennai.html'));
  const robots = await desktop.request.get(new URL('robots.txt', base).href);
  assert.equal(robots.status(), 200);
  assert.ok((await robots.text()).includes('sitemap.xml'));
  assert.deepEqual(errors, [], 'No uncaught JavaScript errors during site checks');
  console.log('PASS: 7 pages, on-page SEO, Chennai landing, WhatsApp form, mobile navigation and sitemap.');
} finally {
  await browser.close();
}
