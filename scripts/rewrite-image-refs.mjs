#!/usr/bin/env node
/**
 * Rewrite code references to optimized image paths, using the mapping file
 * produced by scripts/optimize-images.mjs. Searches .ts/.tsx/.js/.mjs/.json/.md
 * files (excluding node_modules, .next, and the mapping file itself).
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';

const mappingPath = path.resolve(process.cwd(), 'scripts/.image-optimization-mapping.json');
const mapping = JSON.parse(await fs.readFile(mappingPath, 'utf8'));

const ROOT = process.cwd();
const INCLUDE_EXTS = new Set(['.ts', '.tsx', '.js', '.mjs', '.jsx', '.json', '.md']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'public', 'out', '.vercel']);

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.claude') continue;
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (INCLUDE_EXTS.has(path.extname(entry.name))) yield full;
  }
}

// Build replacement pairs: "/images/<old>" → "/images/<new>"
const pairs = mapping
  .map(({ old: o, new: n }) => [`/images/${o}`, `/images/${n}`])
  .filter(([a, b]) => a !== b);

let filesTouched = 0;
let replacements = 0;

for await (const file of walk(ROOT)) {
  // Skip the mapping file and this script's own siblings
  if (file.endsWith('image-optimization-mapping.json')) continue;

  const original = await fs.readFile(file, 'utf8');
  let updated = original;
  for (const [oldPath, newPath] of pairs) {
    if (updated.includes(oldPath)) {
      const count = updated.split(oldPath).length - 1;
      updated = updated.split(oldPath).join(newPath);
      replacements += count;
    }
  }
  if (updated !== original) {
    await fs.writeFile(file, updated);
    filesTouched += 1;
    console.log(`  updated  ${path.relative(ROOT, file)}`);
  }
}

console.log('');
console.log(`Files updated: ${filesTouched}`);
console.log(`Total replacements: ${replacements}`);
