#!/usr/bin/env node
/**
 * Generate + upload a DALL-E 3 image for any blog post missing a featured_image_url.
 * Usage: node scripts/fix-missing-image.mjs
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
dotenv.config({ path: join(ROOT, '.env.local') });

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!OPENAI_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function generateImage(title) {
  const prompt = `Professional high-quality photograph for a roofing company blog post titled "${title}". 
Show realistic roofing work in Denver Colorado — skilled roofers working on a residential roof, 
close-up of quality shingles, roof inspection, spring maintenance scene with mountain backdrop.
Style: photorealistic, natural lighting, professional photography, no text overlays, no watermarks.`;

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
    body: JSON.stringify({ model: 'dall-e-3', prompt, n: 1, size: '1792x1024', quality: 'standard', response_format: 'url' }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.data[0].url;
}

async function downloadAndUpload(imageUrl, slug) {
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Download failed: ${imgRes.status}`);
  const buffer = Buffer.from(await imgRes.arrayBuffer());
  
  const path = `blog/${slug}.jpg`;
  const { error } = await supabase.storage.from('company-assets').upload(path, buffer, {
    contentType: 'image/jpeg',
    upsert: true,
  });
  if (error) throw new Error(`Upload error: ${error.message}`);
  
  const { data } = supabase.storage.from('company-assets').getPublicUrl(path);
  return data.publicUrl;
}

async function main() {
  // Find posts without images
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, featured_image_url')
    .is('featured_image_url', null);

  if (error) { console.error('❌ DB error:', error.message); process.exit(1); }
  if (!posts || posts.length === 0) { console.log('✅ All blog posts have images!'); return; }

  console.log(`Found ${posts.length} post(s) missing images:\n`);

  for (const post of posts) {
    console.log(`Processing: "${post.title}"`);
    console.log(`  slug: ${post.slug}`);
    
    try {
      process.stdout.write('  → Generating DALL-E 3 image... ');
      const imgUrl = await generateImage(post.title);
      console.log('done');
      
      process.stdout.write('  → Downloading + uploading to Supabase... ');
      const publicUrl = await downloadAndUpload(imgUrl, post.slug);
      console.log('done');
      
      const { error: updateErr } = await supabase
        .from('blog_posts')
        .update({ featured_image_url: publicUrl })
        .eq('id', post.id);
      
      if (updateErr) throw new Error(`DB update error: ${updateErr.message}`);
      console.log(`  ✅ Image set: ${publicUrl}\n`);
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}\n`);
    }
  }
}

main().catch(console.error);
