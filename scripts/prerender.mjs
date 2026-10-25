// Runs after `vite build`. Writes one HTML file per route into dist/ so that
// Google receives the right <title>, description, canonical, robots tag, schema
// and readable page text in the very first HTML response, instead of the same
// generic homepage head for every URL. The React app still mounts on top of it.
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distIndex = join(root, 'dist', 'index.html');
if (!existsSync(distIndex)) {
  console.error('prerender: dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

const result = await build({
  entryPoints: [join(root, 'src/prerender/entry.ts')],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
  logLevel: 'silent',
});
const code = result.outputFiles[0].text;
const mod = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const routes = mod.getRoutes();

const template = readFileSync(distIndex, 'utf8');
const ORIGIN = 'https://junktrucks.ca';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

for (const r of routes) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(r.title)}</title>`);
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, (_m, a, b) => `${a}${esc(r.description)}${b}`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, (_m, a, b) => `${a}${esc(r.title)}${b}`);
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, (_m, a, b) => `${a}${esc(r.description)}${b}`);

  const url = `${ORIGIN}/${r.path}`;
  const extra = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:url" content="${url}" />`,
    r.robots ? `<meta name="robots" content="${r.robots}" />` : '',
    ...r.jsonLd.map((o) => `<script type="application/ld+json" data-page-jsonld="1">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`),
  ].filter(Boolean).join('\n    ');
  html = html.replace('</head>', () => `    ${extra}\n  </head>`);

  if (!html.includes('<div id="root"></div>')) {
    console.error('prerender: root div not found in dist/index.html');
    process.exit(1);
  }
  html = html.replace('<div id="root"></div>', () => `<div id="root">${r.bodyHtml}</div>`);

  const outDir = join(root, 'dist', r.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
}
console.log(`prerender: wrote ${routes.length} pages`);
