import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { Script } from 'node:vm';
import test from 'node:test';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../script.js', import.meta.url), 'utf8');

test('HTML structure, unique IDs and working internal anchors', () => {
  const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), match => match[1]);
  const targets = Array.from(html.matchAll(/\bhref="#([^"]+)"/g), match => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'IDs should be unique');
  assert.ok(targets.every(id => ids.includes(id)), 'Every internal link resolves to a section or element');
  for (const id of ['home', 'about', 'service', 'project', 'contact']) {
    assert.ok(ids.includes(id), 'Missing section: ' + id);
  }
  assert.match(html, /<main\s+id="main"/);
  assert.match(html, /<title>[^<]+<\/title>/);
});

test('Portrait, brand icon and CSS/JS assets exist', () => {
  for (const asset of ['../assets/portrait.webp', '../assets/mark.svg', '../index.html', '../styles.css', '../script.js']) {
    assert.ok(statSync(new URL(asset, import.meta.url)).size > 50, 'Missing/empty asset: ' + asset);
  }
  assert.match(html, /src="assets\/portrait\.webp"/);
});

test('Project cards use the real destinations and secure new tabs', () => {
  for (const host of ['royaltiles.vercel.app', 'sugumar-portfolio-beta.vercel.app', 'vip-hunter.vercel.app', 'www.deccanmatric.in']) {
    assert.ok(html.includes('https://' + host), 'Missing project destination: ' + host);
  }
  const newTabs = html.match(/target="_blank"/g) ?? [];
  const safeTabs = html.match(/target="_blank" rel="noopener noreferrer"/g) ?? [];
  assert.equal(newTabs.length, safeTabs.length);
  assert.equal((html.match(/class="project project-/g) ?? []).length, 4);
});

test('Interactive controls have labels and the JS parses', () => {
  new Script(js, { filename: 'script.js' });
  assert.match(html, /aria-label="Open menu"/);
  assert.match(html, /aria-label="Switch to dark theme"/);
  assert.match(html, /aria-label="Filter projects"/);
  assert.match(html, /role="status" aria-live="polite"/);
  assert.match(js, /\.showModal\(/);
  assert.match(js, /aria-pressed/);
  assert.match(js, /localStorage/);
  assert.match(js, /navigator\.clipboard/);
  assert.match(js, /matchMedia/);
});

test('Responsive styling, reduced-motion and no-JS fallback', () => {
  for (const breakpoint of ['1000px', '760px', '540px', '360px']) {
    assert.ok(css.includes('@media(max-width:' + breakpoint + ')'), 'Missing breakpoint: ' + breakpoint);
  }
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /\.js \.reveal\{opacity:0/);
  assert.match(css, /\.js \.reveal\.is-visible\{opacity:1/);
  assert.match(css, /html\[data-theme="dark"\]/);
  assert.match(css, /\.project\[hidden\]\{display:none!important\}/);
});

test('Contact actions remain real links, no invented placeholders', () => {
  assert.ok(html.includes('mailto:karthikumaran7170@gmail.com'));
  assert.ok(html.includes('https://github.com/Karthi7170'));
  assert.ok(!html.includes('href="#"'));
  assert.ok(!html.includes('example.com'));
});