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
  assert.equal(await desktop.title(), 'Karthikeyan — Vibe coder, Web developer & App developer | AI X MAD');
  assert.equal(await desktop.locator('#hero-heading').innerText(), 'KARTHIKEYAN');
  assert.equal(await desktop.locator('.hero-roles').innerText(), 'Vibe coder - web developer - App developer');
  assert.equal(await desktop.locator('.hero img').count(), 0, 'Homepage must contain no portrait');
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
  console.log('Desktop name-only hero, filters, theme persistence, keyboard palette and layout: PASS');

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  mobile.on('pageerror', err => errors.push('mobile: ' + err.message));
  await mobile.goto(base, { waitUntil: 'domcontentloaded' });
  assert.equal(await mobile.locator('#hero-heading').innerText(), 'KARTHIKEYAN');
  assert.equal(await mobile.locator('.hero img').count(), 0);
  assert.equal(await mobile.locator('.menu-button').getAttribute('aria-expanded'), 'false');
  await mobile.locator('.menu-button').click();
  assert.equal(await mobile.locator('.menu-button').getAttribute('aria-expanded'), 'true', 'Mobile menu opens');
  await mobile.locator('.nav-item[href="#project"]').click();
  assert.equal(await mobile.locator('.menu-button').getAttribute('aria-expanded'), 'false', 'Mobile navigation closes');
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
  console.log('Mobile name-only hero, menu, anchors and layout at 390px: PASS');

  await mobile.setViewportSize({ width: 320, height: 760 });
  await mobile.waitForTimeout(100);
  const smallOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  assert.equal(smallOverflow, false, 'Small mobile must not overflow horizontally');
  console.log('Small mobile width 320px: PASS');
  assert.deepEqual(errors, [], 'No uncaught page errors');
  console.log('Browser smoke suite: ALL PASSED');
} finally {
  await browser.close();
}