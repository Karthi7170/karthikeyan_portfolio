import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const errors = [];
mkdirSync('artifacts', { recursive: true });
try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  desktop.on('pageerror', err => errors.push('desktop: ' + err.message));
  await desktop.goto(base, { waitUntil: 'domcontentloaded' });
  await desktop.waitForSelector('#hero-heading');
  assert.equal(await desktop.title(), 'AI X MAD — Web, App & AI Creative Studio');
  assert.match(await desktop.locator('#hero-heading').innerText(), /Ideas, meet/);
  assert.match(await desktop.locator('#hero-heading').innerText(), /MAD/);
  assert.equal(await desktop.locator('.hero img').count(), 0, 'Homepage must contain no founder portrait');
  assert.equal(await desktop.locator('.robot-svg').count(), 1, 'Scalable original robot must render');
  assert.ok((await desktop.locator('.robot-svg').boundingBox()).width > 300, 'Robot is visible on desktop');
  assert.match(await desktop.locator('.logo').innerText(), /AI X MAD/);
  assert.equal(await desktop.locator('.project:not([hidden])').count(), 4);
  await desktop.locator('[data-filter="app"]').click();
  assert.equal(await desktop.locator('.project:not([hidden])').count(), 1, 'App filter');
  await desktop.locator('[data-filter="website"]').click();
  assert.equal(await desktop.locator('.project:not([hidden])').count(), 3, 'Website filter');
  await desktop.locator('[data-filter="all"]').click();
  await desktop.locator('.theme-toggle').click();
  assert.equal(await desktop.locator('html').getAttribute('data-theme'), 'dark');
  await desktop.reload({ waitUntil: 'domcontentloaded' });
  assert.equal(await desktop.locator('html').getAttribute('data-theme'), 'dark', 'Theme preference persists');
  await desktop.locator('.theme-toggle').click();
  await desktop.keyboard.press('Control+k');
  assert.equal(await desktop.locator('.command-dialog').evaluate(el => el.open), true, 'Command palette opens');
  await desktop.keyboard.press('Escape');
  assert.equal(await desktop.locator('.command-dialog').evaluate(el => el.open), false, 'Palette closes on Escape');
  assert.equal(await desktop.locator('#wa-panel').isVisible(), false, 'Non-intrusive desktop WhatsApp prompt starts collapsed');
  await desktop.locator('.wa-launcher').click();
  assert.equal(await desktop.locator('#wa-panel').isVisible(), true, 'WhatsApp prompt opens on demand');
  await desktop.locator('.wa-close').click();
  assert.equal(await desktop.locator('#wa-panel').isVisible(), false, 'WhatsApp pop-up dismisses');
  await desktop.locator('.wa-launcher').click();
  assert.equal(await desktop.locator('#wa-panel').isVisible(), true, 'WhatsApp pop-up reopens');
  await desktop.locator('.wa-close').click();
  assert.equal(await desktop.locator('.wa-chat-link').getAttribute('href'), 'https://wa.me/919944754339?text=Hi%20AI%20X%20MAD%2C%20I%20want%20to%20discuss%20a%20project.');

  // Native validity prevents an empty message from navigating away.
  await desktop.locator('.form-submit').click();
  assert.equal(await desktop.locator('#contact-name').evaluate(field => field.validity.valueMissing), true);
  await desktop.locator('#contact-name').fill('Alex Example');
  await desktop.locator('#contact-email').fill('alex@example.com');
  await desktop.locator('#contact-project').selectOption('Website development');
  await desktop.locator('#contact-message').fill('I need a modern responsive website for my company.');
  await desktop.evaluate(() => {
    window.__capturedWhatsapp = '';
    const original = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () {
      if (this.href.startsWith('https://wa.me/919944754339?text=')) {
        window.__capturedWhatsapp = this.href;
        return;
      }
      return original.call(this);
    };
  });
  await desktop.locator('.form-submit').click();
  const whatsappUrl = await desktop.evaluate(() => window.__capturedWhatsapp);
  assert.ok(whatsappUrl.startsWith('https://wa.me/919944754339?text='), 'Form produces the correct WhatsApp destination');
  const message = new URL(whatsappUrl).searchParams.get('text');
  assert.ok(message.includes('Alex Example') && message.includes('alex@example.com'));
  assert.ok(message.includes('Website development') && message.includes('I need a modern responsive website'));
  await desktop.locator('#contact-form').evaluate(form => form.reset());
  console.log('Contact form WhatsApp message and dismissible chat pop-up: PASS');
  await desktop.evaluate(async () => { await document.fonts.ready; window.scrollTo(0, 0); });
  await desktop.waitForTimeout(850);
  assert.equal(await desktop.locator('.nav-item.is-current').getAttribute('href'), '#home', 'Home should be active at top');
  await desktop.screenshot({ path: 'artifacts/desktop-hero.png', animations: 'disabled' });
  for (const item of await desktop.locator('.reveal').all()) { await item.scrollIntoViewIfNeeded(); await desktop.waitForTimeout(18); }
  await desktop.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await desktop.waitForTimeout(100);
  await desktop.screenshot({ path: 'artifacts/desktop-full.png', fullPage: true, animations: 'disabled' });
  const desktopOverflow = await desktop.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  if (desktopOverflow) console.log('DESKTOP OVERFLOW ELEMENTS:', await desktop.evaluate(() => Array.from(document.querySelectorAll('*')).filter(el => el.getBoundingClientRect().right > innerWidth + 2).slice(0, 12).map(el => ({ tag: el.tagName, className: typeof el.className === 'string' ? el.className.slice(0, 100) : '', right: Math.round(el.getBoundingClientRect().right), width: Math.round(el.getBoundingClientRect().width) }))));
  assert.equal(desktopOverflow, false, 'Desktop must not overflow horizontally');
  console.log('Desktop AI X MAD robot hero, filters, theme persistence, keyboard palette and layout: PASS');

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  mobile.on('pageerror', err => errors.push('mobile: ' + err.message));
  await mobile.goto(base, { waitUntil: 'domcontentloaded' });
  assert.match(await mobile.locator('#hero-heading').innerText(), /AI/);
  assert.equal(await mobile.locator('.robot-svg').count(), 1, 'Mobile robot SVG is present');
  assert.equal(await mobile.locator('.hero img').count(), 0);
  assert.equal(await mobile.locator('.menu-button').getAttribute('aria-expanded'), 'false');
  await mobile.locator('.menu-button').click();
  assert.equal(await mobile.locator('.menu-button').getAttribute('aria-expanded'), 'true', 'Mobile menu opens');
  await mobile.locator('.nav-item[href="#project"]').click();
  assert.equal(await mobile.locator('.menu-button').getAttribute('aria-expanded'), 'false', 'Mobile navigation closes');
  assert.equal(await mobile.locator('#wa-panel').isVisible(), false, 'Mobile WhatsApp prompt starts collapsed');
  await mobile.locator('.wa-launcher').click();
  assert.equal(await mobile.locator('#wa-panel').isVisible(), true, 'Mobile WhatsApp prompt opens');
  await mobile.locator('.wa-close').click();
  assert.equal(await mobile.locator('#wa-panel').isVisible(), false, 'Mobile WhatsApp prompt dismisses');
  await mobile.evaluate(async () => { await document.fonts.ready; window.scrollTo(0, 0); });
  await mobile.waitForTimeout(900);
  assert.equal(await mobile.locator('.nav-item.is-current').getAttribute('href'), '#home', 'Home should be active on mobile after return');
  await mobile.screenshot({ path: 'artifacts/mobile-hero.png', animations: 'disabled' });
  for (const item of await mobile.locator('.reveal:visible').all()) { await item.scrollIntoViewIfNeeded({ timeout: 3000 }); await mobile.waitForTimeout(18); }
  await mobile.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await mobile.waitForTimeout(100);
  await mobile.screenshot({ path: 'artifacts/mobile-full.png', fullPage: true, animations: 'disabled' });
  const mobileOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  if (mobileOverflow) console.log('MOBILE OVERFLOW ELEMENTS:', await mobile.evaluate(() => Array.from(document.querySelectorAll('*')).filter(el => el.getBoundingClientRect().right > innerWidth + 2).slice(0, 12).map(el => ({ tag: el.tagName, className: typeof el.className === 'string' ? el.className.slice(0, 100) : '', right: Math.round(el.getBoundingClientRect().right), width: Math.round(el.getBoundingClientRect().width) }))));
  assert.equal(mobileOverflow, false, 'Mobile must not overflow horizontally');
  console.log('Mobile AI X MAD business hero, menu, anchors and layout at 390px: PASS');

  await mobile.setViewportSize({ width: 320, height: 760 });
  await mobile.waitForTimeout(100);
  const smallOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  assert.equal(smallOverflow, false, 'Small mobile must not overflow horizontally');
  console.log('Small mobile width 320px: PASS');
  const uhd = await browser.newPage({ viewport: { width: 3840, height: 2160 }, deviceScaleFactor: 1 });
  uhd.on('pageerror', err => errors.push('4k: ' + err.message));
  await uhd.goto(base, { waitUntil: 'domcontentloaded' });
  await uhd.evaluate(async () => { await document.fonts.ready; });
  assert.ok((await uhd.locator('.robot-svg').boundingBox()).width > 650, 'Robot vector must scale to UHD');
  assert.equal(await uhd.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2), false, 'UHD layout has no horizontal overflow');
  await uhd.screenshot({ path: 'artifacts/4k-hero.png', animations: 'disabled' });
  console.log('4K 3840x2160 responsive vector hero: PASS');

  const reduced = await browser.newPage({ viewport: { width: 1024, height: 768 }, reducedMotion: 'reduce' });
  await reduced.goto(base, { waitUntil: 'domcontentloaded' });
  assert.equal(await reduced.locator('.robot-svg').evaluate(el => getComputedStyle(el).animationName), 'none');
  await reduced.close();
  console.log('Reduced-motion robot animation fallback: PASS');
  assert.deepEqual(errors, [], 'No uncaught page errors');
  console.log('Browser smoke suite: ALL PASSED');
} finally {
  await browser.close();
}