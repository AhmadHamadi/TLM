/**
 * Compresses PNGs in /public to a target size and writes WebP twins.
 * Run: node scripts/optimize-images.js
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const PUBLIC = new URL('../public/', import.meta.url).pathname.replace(/^\//, '');
const TARGETS = {
  // Hero image (highest priority for LCP)
  'heroimage.png':    { maxWidth: 1200, png: 78, webp: 72 },
  // Slider — high res to scale up on retina, but compressed
  'slider1.png':      { maxWidth: 1600, png: 76, webp: 70 },
  'slider2.png':      { maxWidth: 1600, png: 76, webp: 70 },
  // Google Business + Ads screenshots
  'gbpbefore.png':    { maxWidth: 1200, png: 78, webp: 72 },
  'gbpafter.png':     { maxWidth: 1200, png: 78, webp: 72 },
  'googlebefore.png': { maxWidth: 1200, png: 78, webp: 72 },
  'googleafter.png':  { maxWidth: 1200, png: 78, webp: 72 },
  // Logo + icons (need transparency, keep small dimensions)
  'tlmlogo.png':         { maxWidth: 512, png: 90 },
  'apple-touch-icon.png':{ maxWidth: 180, png: 90 },
  'og.png':              { maxWidth: 1200, png: 82, webp: 78 }
};

const formatBytes = (b) => `${(b / 1024).toFixed(1)} KB`;

async function compressOne(file, opts) {
  const path = join(PUBLIC, file);
  const before = (await stat(path)).size;
  const buf = await sharp(path).resize({ width: opts.maxWidth, withoutEnlargement: true }).toBuffer();

  // Re-encode PNG with palette where it shrinks the file
  const pngBuf = await sharp(buf).png({ quality: opts.png, compressionLevel: 9, palette: true, effort: 10 }).toBuffer();

  // Only write if PNG is smaller than original
  if (pngBuf.length < before) {
    await sharp(pngBuf).toFile(path);
  }

  // Optionally write WebP twin
  if (opts.webp) {
    const webpPath = path.replace(/\.png$/i, '.webp');
    await sharp(buf).webp({ quality: opts.webp, effort: 6 }).toFile(webpPath);
    const webpSize = (await stat(webpPath)).size;
    console.log(`  ${file.padEnd(28)} ${formatBytes(before).padStart(9)} -> PNG ${formatBytes((await stat(path)).size).padStart(9)}  WebP ${formatBytes(webpSize).padStart(9)}`);
  } else {
    console.log(`  ${file.padEnd(28)} ${formatBytes(before).padStart(9)} -> PNG ${formatBytes((await stat(path)).size).padStart(9)}`);
  }
}

async function main() {
  console.log('Optimizing images in /public...\n');
  const files = await readdir(PUBLIC);
  for (const f of files) {
    if (TARGETS[f]) await compressOne(f, TARGETS[f]);
  }
  // favicon.ico — just copy from tlmlogo since browsers handle PNG-as-ico
  console.log('\nDone.');
}

main().catch((e) => { console.error(e); process.exit(1); });
