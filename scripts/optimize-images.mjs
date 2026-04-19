#!/usr/bin/env node
/**
 * Batch-optimize public/images/** — resize + convert to WebP, delete originals.
 * Prints a mapping of old → new paths and byte savings.
 *
 * Usage: node scripts/optimize-images.mjs
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd(), 'public/images');

// Max width by folder (preserves aspect ratio, never upscales)
const MAX_WIDTH_BY_FOLDER = {
  heroes: 1920,
  services: 1600,
  portfolio: 1600,
  estimator: 1600,
  blog: 1200,
  M1: 1200,
  'ai-tools': 1200,
  logo: 800,
};
const DEFAULT_MAX_WIDTH = 1600;
const QUALITY = 80;

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function getMaxWidth(filePath) {
  const rel = path.relative(ROOT, filePath).split(path.sep)[0];
  return MAX_WIDTH_BY_FOLDER[rel] ?? DEFAULT_MAX_WIDTH;
}

const mapping = [];
let totalBefore = 0;
let totalAfter = 0;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

  const { size: sizeBefore } = await fs.stat(file);
  const maxWidth = getMaxWidth(file);
  const outPath = file.slice(0, -ext.length) + '.webp';

  try {
    await sharp(file)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    const { size: sizeAfter } = await fs.stat(outPath);
    await fs.unlink(file);

    totalBefore += sizeBefore;
    totalAfter += sizeAfter;
    const oldRel = path.relative(ROOT, file).replace(/\\/g, '/');
    const newRel = path.relative(ROOT, outPath).replace(/\\/g, '/');
    mapping.push({ old: oldRel, new: newRel, before: sizeBefore, after: sizeAfter });
    const kb = (n) => (n / 1024).toFixed(0).padStart(6);
    console.log(`  ${kb(sizeBefore)}KB → ${kb(sizeAfter)}KB   ${oldRel}`);
  } catch (err) {
    console.error(`  FAILED  ${file}: ${err.message}`);
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log('');
console.log(`Total: ${mb(totalBefore)}MB → ${mb(totalAfter)}MB (saved ${mb(totalBefore - totalAfter)}MB, ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
console.log(`Files converted: ${mapping.length}`);

await fs.writeFile(
  path.resolve(process.cwd(), 'scripts/.image-optimization-mapping.json'),
  JSON.stringify(mapping, null, 2)
);
console.log(`Mapping written to scripts/.image-optimization-mapping.json`);
