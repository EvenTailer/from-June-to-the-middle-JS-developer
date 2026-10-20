import { copyFileSync, existsSync } from 'node:fs';

const indexPath = new URL('../dist/index.html', import.meta.url);
const notFoundPath = new URL('../dist/404.html', import.meta.url);

if (existsSync(indexPath)) {
  copyFileSync(indexPath, notFoundPath);
  console.log('dist/404.html created (GitHub Pages style SPA fallback)');
}
