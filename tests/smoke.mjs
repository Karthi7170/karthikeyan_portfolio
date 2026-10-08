import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import test from 'node:test';

const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const homepage = read('index.html');
const contact = read('contact.html');
const about = read('about.html');
const css = read('styles.css');
const script = read('script.js');
const sitemap = read('sitemap.xml');
const robots = read('robots.txt');
const pages = ['index.html', 'about.html', 'services.html', 'projects.html', 'process.html', 'contact.html'];

test('All six production pages have titles, descriptions, canonical URLs and main content', () => {
  for (const path of pages) {
    const html = read(path);
    const url = path === 'index.html' ? 'https://aimadstudio.in/' : 'https://aimadstudio.in/' + path;
    assert.match(html, /<title>[^<]+<\/title>/i, path + ' title');
    assert.match(html, /<meta name="description" content="[^"]+"/i, path + ' description');
    assert.ok(html.includes('<link rel="canonical" href="' + url + '">'), path + ' canonical');
    assert.match(html, /<main\b/i, path + ' main landmark');
    assert.match(html, /<h1\b/i, path + ' h1');
  }
});

test('Original AI x MAD Studio homepage and brand identity are restored', () => {
  assert.match(homepage, /<title>AI x MAD Studio \| Web, App, AI & SEO Solutions<\/title>/);
  assert.match(homepage, /Transforming Ideas<br>Into <span>Digital Reality<\/span>/);
  assert.doesNotMatch(homepage, /Chennai/i);
  for (const offering of ['Business Websites', 'E-commerce Websites', 'Mobile Applications', 'SEO &amp; Performance Optimization']) {
    assert.ok(homepage.includes(offering), offering);
  }
  const jsonld = homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(jsonld, 'homepage structured data exists');
  const nodes = JSON.parse(jsonld)['@graph'];
  const organization = nodes.find(x => x['@type'] === 'Organization');
  const website = nodes.find(x => x['@type'] === 'WebSite');
  assert.equal(organization.name, 'AI x MAD Studio');
  assert.equal(website.name, 'AI x MAD Studio');
  assert.ok(website.alternateName.includes('aimadstudio'));
  assert.ok(website.alternateName.includes('aimadstudio.in'));
  assert.ok(organization.sameAs.includes('https://www.instagram.com/aimadstudio.in/'));
});

test('Sitemap and robots list the six original site pages', () => {
  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Sitemap:\s*https:\/\/aimadstudio\.in\/sitemap\.xml/);
  for (const path of pages) {
    const url = path === 'index.html' ? 'https://aimadstudio.in/' : 'https://aimadstudio.in/' + path;
    assert.ok(sitemap.includes('<loc>' + url + '</loc>'), 'Missing ' + url);
  }
  assert.doesNotMatch(sitemap, /website-development-chennai/);
});

test('Navigation, real projects, and contact functionality are preserved', () => {
  assert.match(homepage, /class="desktop-nav"/);
  assert.match(homepage, /class="mobile-nav"/);
  assert.match(homepage, /class="menu-btn"/);
  for (const name of ['Royal Tiles', 'Sugumar', 'Deccan']) assert.ok(homepage.includes(name), name);
  assert.match(contact, /id="contact-form"/);
  for (const id of ['name', 'email', 'phone', 'service', 'message']) assert.ok(contact.includes('id="' + id + '"'), id);
  assert.match(script, /919944754339/);
  assert.match(script, /encodeURIComponent\(text\)/);
});

test('Production JavaScript parses and supports mobile navigation', () => {
  new Script(script, { filename: 'script.js' });
  assert.match(script, /menu\?\.addEventListener\("click"/);
  assert.match(script, /IntersectionObserver/);
  assert.match(script, /setInterval\(nextSlide,3000\)/);
});

test('Official Instagram account is clearly attributed on About and Contact pages', () => {
  const instagram = 'https://www.instagram.com/aimadstudio.in/';
  for (const [name, html] of [['About', about], ['Contact', contact]]) {
    assert.ok(html.includes(instagram), name + ' official Instagram link');
    assert.ok(html.includes('@aimadstudio.in'), name + ' official Instagram handle');
    assert.match(html, /Official Instagram|OFFICIAL SOCIAL PROFILE/, name + ' official identity label');
  }
  assert.match(about, /class="official-social-card reveal"/, 'prominent About profile section');
  assert.match(contact, /aria-label="Official AI x MAD Studio Instagram profile @aimadstudio.in"/);
  assert.match(css, /\.official-social-card\{/);
  const json = homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  const org = JSON.parse(json)['@graph'].find(x => x['@type'] === 'Organization');
  assert.ok(org.sameAs.includes(instagram), 'structured data agrees with visible Instagram links');
});
