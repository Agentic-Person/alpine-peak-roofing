import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ─── Load env ──────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env.local');
const envVars = {};

readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) return;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
  envVars[key] = val;
});

const OPENAI_API_KEY       = envVars.OPENAI_API_KEY;
const SUPABASE_URL         = envVars.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing required env vars. Check .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ─── Helpers ───────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateDallE3Image(title, slug) {
  const prompt = `Professional high-quality photograph for a roofing company blog post titled "${title}".
Show realistic roofing work in Denver Colorado — could include: skilled roofers working on a residential or commercial roof,
close-up of quality shingles or roofing materials, before/after roofing projects, storm damage assessment,
roof inspection, mountain backdrop with a beautiful home roof.
Style: photorealistic, natural lighting, professional photography, no text overlays, no watermarks.`;

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
      response_format: 'url',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.data[0].url;
}

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download image: ${response.status}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function uploadToSupabase(buffer, slug) {
  const path = `blog/${slug}.jpg`;

  // Remove existing file if present (ignore error)
  await supabase.storage.from('company-assets').remove([path]).catch(() => {});

  const { error } = await supabase.storage
    .from('company-assets')
    .upload(path, buffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) throw new Error(`Supabase upload error: ${error.message}`);

  const { data } = supabase.storage.from('company-assets').getPublicUrl(path);
  return data.publicUrl;
}

async function updateBlogPost(id, publicUrl) {
  const { error } = await supabase
    .from('blog_posts')
    .update({ featured_image_url: publicUrl })
    .eq('id', id);

  if (error) throw new Error(`Supabase update error: ${error.message}`);
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('Fetching blog posts with local image paths...\n');

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, featured_image_url')
    .like('featured_image_url', '%/images/blog/%')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to fetch posts:', error.message);
    process.exit(1);
  }

  if (!posts || posts.length === 0) {
    console.log('No posts found with local image paths.');
    return;
  }

  console.log(`Found ${posts.length} posts to update.\n`);

  let succeeded = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const num = `[${i + 1}/${posts.length}]`;
    console.log(`${num} "${post.title}"`);
    console.log(`      slug: ${post.slug}`);
    console.log(`      current: ${post.featured_image_url}`);

    try {
      // 1. Generate image
      process.stdout.write('      → Generating DALL-E 3 image... ');
      const imageUrl = await generateDallE3Image(post.title, post.slug);
      console.log('done');

      // 2. Download
      process.stdout.write('      → Downloading image... ');
      const buffer = await downloadImage(imageUrl);
      console.log(`done (${Math.round(buffer.length / 1024)}kb)`);

      // 3. Upload to Supabase
      process.stdout.write('      → Uploading to Supabase storage... ');
      const publicUrl = await uploadToSupabase(buffer, post.slug);
      console.log('done');

      // 4. Update DB
      process.stdout.write('      → Updating database... ');
      await updateBlogPost(post.id, publicUrl);
      console.log('done');

      console.log(`      ✓ ${publicUrl}\n`);
      succeeded++;
    } catch (err) {
      console.log(`\n      ✗ FAILED: ${err.message}\n`);
      failed++;
      failures.push({ title: post.title, slug: post.slug, error: err.message });
    }

    // Rate limit delay between posts (skip after last)
    if (i < posts.length - 1) {
      await sleep(2000);
    }
  }

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log('═══════════════════════════════════════════════════════════');
  console.log(`DONE — ${succeeded} succeeded, ${failed} failed`);
  if (failures.length > 0) {
    console.log('\nFailed posts:');
    failures.forEach(f => console.log(`  • "${f.title}" (${f.slug}): ${f.error}`));
  }
  console.log('═══════════════════════════════════════════════════════════');

  // ─── Verify final state ───────────────────────────────────────────────────
  if (succeeded > 0) {
    console.log('\nVerifying updated URLs in database...');
    const { data: remaining } = await supabase
      .from('blog_posts')
      .select('id')
      .like('featured_image_url', '%/images/blog/%');

    const stillLocal = remaining?.length ?? 0;
    if (stillLocal === 0) {
      console.log('✓ All blog posts now have Supabase-hosted images.');
    } else {
      console.log(`⚠ ${stillLocal} posts still have local image paths.`);
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
