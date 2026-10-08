import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import test from 'node:test';

const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');
const homepage = read('index.html');
const localPage = read('website-development-chennai.html');
const contact = read('contact.html');
const script = read('script.js');
const sitemap = read('sitemap.xml');
const robots = read('robots.txt');
const pages = ['index.html', 'about.html', 'services.html', 'projects.html', 'process.html', 'contact.html', 'website-development-chennai.html'];

test('All seven production pages have titles, descriptions, canonical URLs and main content', () => {
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

test('Homepage targets Chennai while clearly offering services worldwide', () => {
  assert.match(homepage, /<title>Website Developers in Chennai \| AI x MAD Studio<\/title>/);
  assert.match(homepage, /<h1>Website &amp; App Development in Chennai/);
  assert.match(homepage, /Serving Clients Worldwide/);
  assert.match(homepage, /href="website-development-chennai\.html"/);
  assert.match(homepage, /Business Websites/);
  assert.match(homepage, /E-commerce Websites/);
  assert.match(homepage, /Mobile Applications/);
  assert.match(homepage, /SEO &amp; Performance Optimization/);
  const jsonld = homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(jsonld, 'homepage structured data exists');
  const organization = JSON.parse(jsonld)['@graph'].find(x => x['@type'] === 'Organization');
  assert.equal(organization.name, 'AI x MAD Studio');
  assert.ok(organization.areaServed.some(x => x.name === 'Chennai'));
});

test('Chennai landing page contains original service content and enquiry actions', () => {
  assert.match(localPage, /<h1>Website Development in Chennai<\/h1>/);
  assert.match(localPage, /clients worldwide/i);
  assert.match(localPage, /<h3>Business Websites<\/h3>/);
  assert.match(localPage, /<h3>Online Stores<\/h3>/);
  assert.match(localPage, /<h3>Custom Web Applications<\/h3>/);
  assert.match(localPage, /href="contact\.html"/);
  assert.match(localPage, /<script type="application\/ld\+json">/);
});

test('Sitemap, robots rules and metadata cover the Chennai service page', () => {
  assert.match(robots, /User-agent:\s*\*/);
  assert.match(robots, /Sitemap:\s*https:\/\/aimadstudio\.in\/sitemap\.xml/);
  for (const path of pages) {
    const url = path === 'index.html' ? 'https://aimadstudio.in/' : 'https://aimadstudio.in/' + path;
    assert.ok(sitemap.includes('<loc>' + url + '</loc>'), 'Missing ' + url);
  }
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
