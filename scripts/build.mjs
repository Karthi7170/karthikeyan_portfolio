import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
const pages = ['index.html', 'about.html', 'services.html', 'projects.html', 'process.html', 'contact.html', 'website-development-chennai.html'];
const files = [...pages, 'styles.css', 'script.js', 'robots.txt', 'sitemap.xml'];

function validateReference(reference, source) {
  reference = reference.trim();
  if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) return;
  const path = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  if (!path) return;
  const target = path.startsWith('/')
    ? resolve(root, '.' + path)
    : resolve(root, dirname(source), path);
  const local = relative(root, target);
  const published = files.includes(local) || local.startsWith('assets' + sep);
  if (!published || !existsSync(target) || !statSync(target).isFile()) {
    throw new Error(`${source}: local reference "${reference}" is missing from the production site`);
  }
}

for (const source of [...pages, 'styles.css']) {
  const content = readFileSync(resolve(root, source), 'utf8');
  if (source.endsWith('.html')) {
    for (const match of content.matchAll(/\b(?:src|href|poster)\s*=\s*["']([^"']*)["']/gi)) {
      validateReference(match[1], source);
    }
    for (const match of content.matchAll(/\bsrcset\s*=\s*["']([^"']*)["']/gi)) {
      if (match[1].trim().startsWith('data:')) continue;
      for (const candidate of match[1].split(',')) {
        validateReference(candidate.trim().split(/\s+/)[0], source);
      }
    }
  }
  for (const match of content.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)) {
    validateReference(match[1], source);
  }
}

// Validate first, then replace the generated output with public files only.
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const source of [...files, 'assets']) {
  cpSync(resolve(root, source), resolve(output, source), { recursive: true });
}
console.log(`Production build complete: ${pages.length} pages, CSS, JavaScript and assets in dist/`);
