#!/usr/bin/env node
/**
 * Alpine Peak Roofing — Blog Post Generator
 * Generates SEO-optimized blog posts targeting Colorado homeowners
 * and publishes directly to Supabase.
 *
 * Usage:
 *   node scripts/generate-blog-post.js
 *   node scripts/generate-blog-post.js --topic "hail damage inspection"
 *   node scripts/generate-blog-post.js --dry-run
 *
 * Runs standalone — no Next.js server required.
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Load env vars
dotenv.config({ path: join(ROOT, '.env.local') });
dotenv.config({ path: join(ROOT, '.env.production'), override: false });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !OPENAI_KEY) {
  console.error('❌ Missing required env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_KEY });

// ── Topic Bank ─────────────────────────────────────────────────────────────────
// Homeowner-angle topics for Alpine Peak Roofing (Denver/Colorado focus)
const TOPIC_BANK = [
  // Seasonal
  { topic: 'spring roof inspection checklist for Colorado homeowners', season: 'spring', keyword: 'spring roof inspection Colorado' },
  { topic: 'preparing your roof for Colorado winter: a homeowner guide', season: 'fall', keyword: 'prepare roof for winter Colorado' },
  { topic: 'hail season in Denver: what every homeowner needs to know', season: 'spring', keyword: 'hail damage roof Denver' },
  { topic: 'ice dams on Colorado roofs: causes, prevention, and repair', season: 'winter', keyword: 'ice dams roof Colorado' },
  { topic: 'fall gutter cleaning and roof maintenance in Denver', season: 'fall', keyword: 'gutter cleaning roof maintenance Denver' },
  { topic: 'summer heat and UV damage to Colorado roofs', season: 'summer', keyword: 'UV damage roof Colorado' },
  { topic: 'monsoon season roofing tips for Front Range homeowners', season: 'summer', keyword: 'monsoon season roof care Colorado' },
  { topic: 'snowmelt and roof leaks: what Denver homeowners must know', season: 'winter', keyword: 'snowmelt roof leaks Denver' },

  // Materials
  { topic: 'best roofing materials for Colorado mountain homes', season: null, keyword: 'best roofing materials Colorado' },
  { topic: 'asphalt shingles vs metal roofing in Colorado: pros and cons', season: null, keyword: 'asphalt vs metal roof Colorado' },
  { topic: 'impact-resistant shingles: are they worth it in hail country?', season: null, keyword: 'impact resistant shingles Colorado' },
  { topic: 'Class 4 impact-resistant roofing and Colorado insurance discounts', season: null, keyword: 'Class 4 impact resistant roof insurance discount Colorado' },
  { topic: 'stone-coated steel roofing for Colorado homes: a complete guide', season: null, keyword: 'stone coated steel roofing Colorado' },
  { topic: 'standing seam metal roofs for Denver homeowners', season: null, keyword: 'standing seam metal roof Denver' },
  { topic: 'synthetic slate roofing in Colorado: durability and value', season: null, keyword: 'synthetic slate roofing Colorado' },

  // Insurance & Claims
  { topic: 'how to file a hail damage insurance claim in Colorado', season: null, keyword: 'hail damage insurance claim Colorado' },
  { topic: 'roof insurance claims in Colorado: what homeowners get wrong', season: null, keyword: 'roof insurance claim Colorado mistakes' },
  { topic: 'actual cash value vs replacement cost: Colorado roof insurance explained', season: null, keyword: 'roof insurance replacement cost Colorado' },
  { topic: 'how a public adjuster can help your Colorado roof claim', season: null, keyword: 'public adjuster roof claim Colorado' },
  { topic: 'Colorado homeowners insurance and roof age: what to expect', season: null, keyword: 'homeowners insurance roof age Colorado' },
  { topic: 'documenting roof damage for a Colorado insurance claim', season: null, keyword: 'document roof damage insurance claim Colorado' },

  // Repair & Maintenance
  { topic: '5 signs your Denver home needs a roof replacement this year', season: null, keyword: 'signs roof replacement needed Denver' },
  { topic: 'how long does a roof last in Colorado? average lifespans explained', season: null, keyword: 'roof lifespan Colorado' },
  { topic: 'common roof problems in older Denver homes and how to fix them', season: null, keyword: 'common roof problems older Denver homes' },
  { topic: 'DIY roof inspection: what Colorado homeowners can safely check', season: null, keyword: 'DIY roof inspection Colorado homeowners' },
  { topic: 'flat roof maintenance guide for Colorado commercial buildings', season: null, keyword: 'flat roof maintenance Colorado' },
  { topic: 'attic ventilation and roof health in Colorado climate', season: null, keyword: 'attic ventilation roof health Colorado' },
  { topic: 'how to spot a roof leak before it becomes a disaster', season: null, keyword: 'spot roof leak Colorado' },
  { topic: 'flashing failures: why they happen and how to prevent them', season: null, keyword: 'roof flashing failure repair Colorado' },

  // Cost & Hiring
  { topic: 'how much does a new roof cost in Denver in 2025?', season: null, keyword: 'new roof cost Denver 2025' },
  { topic: 'questions to ask before hiring a roofing contractor in Colorado', season: null, keyword: 'hiring roofing contractor Colorado' },
  { topic: 'roofing contractor red flags: how Colorado homeowners can avoid scams', season: null, keyword: 'roofing contractor scams Colorado' },
  { topic: 'understanding your roofing estimate: a Colorado homeowner\'s guide', season: null, keyword: 'understand roofing estimate Colorado' },
  { topic: 'roof financing options for Colorado homeowners', season: null, keyword: 'roof financing Colorado homeowners' },
  { topic: 'how to get multiple roofing quotes and compare them fairly', season: null, keyword: 'compare roofing quotes Colorado' },

  // Environmental / Local
  { topic: 'high altitude roofing: how elevation affects your Colorado roof', season: null, keyword: 'high altitude roofing Colorado' },
  { topic: 'wildfire ember resistance: roofing choices for Colorado mountain homes', season: null, keyword: 'wildfire resistant roofing Colorado' },
  { topic: 'dark sky compliance and roofing materials in mountain Colorado', season: null, keyword: 'dark sky roofing Colorado' },
  { topic: 'energy-efficient roofing options for Denver homes', season: null, keyword: 'energy efficient roofing Denver' },
  { topic: 'green roofing options for environmentally conscious Colorado homeowners', season: null, keyword: 'green roofing Colorado eco friendly' },
  { topic: 'solar-ready roofing: what Colorado homeowners need to know', season: null, keyword: 'solar ready roofing Colorado' },
  { topic: 'roof snow load requirements in Colorado: what\'s required by code', season: 'winter', keyword: 'roof snow load requirements Colorado' },
  { topic: 'how Colorado wind events damage roofs and what to do', season: null, keyword: 'wind damage roof Colorado' },
];

// ── Slug utilities ──────────────────────────────────────────────────────────────
function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);
}

// ── Get used slugs from Supabase ────────────────────────────────────────────────
async function getUsedSlugs() {
  const { data, error } = await supabase.from('blog_posts').select('slug, title');
  if (error) {
    console.warn('⚠️  Could not fetch existing slugs:', error.message);
    return new Set();
  }
  return new Set(data.map(p => p.slug));
}

// ── Pick an unused topic ────────────────────────────────────────────────────────
function pickTopic(usedSlugs, forceTopic) {
  if (forceTopic) {
    return {
      topic: forceTopic,
      season: getCurrentSeason(),
      keyword: forceTopic.toLowerCase(),
      slug: toSlug(forceTopic)
    };
  }

  // Filter out topics whose derived slug is already used
  const available = TOPIC_BANK.filter(t => !usedSlugs.has(toSlug(t.topic)));
  if (available.length === 0) {
    console.error('❌ All topics have been published. Add more to TOPIC_BANK.');
    process.exit(1);
  }

  // Prefer seasonally relevant topics
  const season = getCurrentSeason();
  const seasonal = available.filter(t => t.season === season);
  const pool = seasonal.length > 0 ? seasonal : available;

  return pool[Math.floor(Math.random() * pool.length)];
}

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

// ── Generate content via OpenAI ─────────────────────────────────────────────────
async function generateBlogPost(topic, keyword, season) {
  console.log(`\n📝 Generating post: "${topic}"`);

  const systemPrompt = `You are a senior content writer for Alpine Peak Roofing, a trusted Denver, Colorado roofing company serving homeowners since 1998. 
Your audience is Colorado homeowners (primarily Denver metro and Front Range).
Write authoritative, helpful, locally-specific content. Reference Colorado's unique climate: high altitude, hail seasons, heavy snow, UV intensity, temperature swings.
Always be homeowner-friendly — explain technical concepts clearly. Never be salesy or generic.
Alpine Peak Roofing offers: residential and commercial roofing, hail damage repair, insurance claim assistance, free inspections, financing options.
Contact: (303) 555-0199 | alpinepeakroofing.com`;

  const userPrompt = `Write a comprehensive, SEO-optimized blog post for Alpine Peak Roofing on the topic: "${topic}"

Primary keyword: "${keyword}"

Requirements:
- Length: 900-1200 words
- Structure: Intro, 3-4 H2 sections with content, Conclusion with CTA
- Use H2 and H3 headings (markdown format: ## and ###)
- Include Colorado-specific stats, facts, or scenarios where relevant
- Naturally include the primary keyword 3-5 times
- End with a call-to-action mentioning free inspection or calling Alpine Peak Roofing
- Write in second person ("you", "your home") to speak directly to homeowners

Return ONLY valid JSON with this exact structure:
{
  "title": "SEO-optimized title (55-65 chars)",
  "meta_description": "Compelling meta description (150-160 chars) with primary keyword",
  "content": "Full blog post in markdown format",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' }
  });

  const raw = response.choices[0].message.content;
  const data = JSON.parse(raw);

  return {
    title: data.title,
    meta_description: data.meta_description,
    content: data.content,
    keywords: data.keywords || [keyword],
    season: season || null,
    alt_text: `${data.title} - Alpine Peak Roofing Colorado`,
  };
}

// ── Generate featured image with DALL-E 3 ──────────────────────────────────────
async function generateFeaturedImage(title, topic, slug) {
  console.log('\n🎨 Generating featured image with DALL-E 3...');

  const imagePrompt = `Professional, photorealistic roofing photograph for a blog post titled "${title}".
Colorado mountain setting, blue sky with Rocky Mountains in background.
Subject: ${topic}.
Style: Clean editorial photography, daylight, sharp detail.
No text, no people, no watermarks. Suitable for a professional roofing company website.`;

  let imageUrl;
  try {
    const imgResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: imagePrompt,
      size: '1792x1024',
      quality: 'standard',
      n: 1,
    });
    imageUrl = imgResponse.data[0].url;
  } catch (err) {
    console.warn(`⚠️  DALL-E generation failed: ${err.message} — skipping image`);
    return null;
  }

  // Fetch image bytes (native fetch — Node 18+)
  let imageBuffer;
  try {
    const resp = await fetch(imageUrl);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    imageBuffer = Buffer.from(await resp.arrayBuffer());
  } catch (err) {
    console.warn(`⚠️  Image download failed: ${err.message} — skipping image`);
    return null;
  }

  // Upload to Supabase Storage
  const storagePath = `blog/${slug}.jpg`;
  const { error: uploadError } = await supabase.storage
    .from('company-assets')
    .upload(storagePath, imageBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (uploadError) {
    console.warn(`⚠️  Storage upload failed: ${uploadError.message} — skipping image`);
    return null;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('company-assets')
    .getPublicUrl(storagePath);

  console.log(`   ✅ Image uploaded: ${urlData.publicUrl}`);
  return urlData.publicUrl;
}

// ── Publish to Supabase ─────────────────────────────────────────────────────────
async function publishToSupabase(post, slug) {
  const record = {
    title: post.title,
    slug,
    content: post.content,
    seo_title: post.title,
    meta_description: post.meta_description,
    focus_keyword: post.keywords[0] || '',
    keywords: post.keywords,
    status: 'published',
    season: post.season,
    publish_date: new Date().toISOString().split('T')[0],
    published_at: new Date().toISOString(),
    featured_image_url: post.featured_image_url || null,
    alt_text: post.alt_text || null,
    estimated_cost: post.image_cost ? 0.09 : 0.05  // +$0.04 for DALL-E standard 1792x1024
  };

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([record])
    .select()
    .single();

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  return data;
}

// ── Main ────────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const topicArg = args.find(a => a.startsWith('--topic='))?.split('=').slice(1).join('=')
    || (args.indexOf('--topic') !== -1 ? args[args.indexOf('--topic') + 1] : null);

  console.log('🏔️  Alpine Peak Blog Generator');
  console.log('================================');

  // Get existing slugs
  const usedSlugs = await getUsedSlugs();
  console.log(`📊 Existing posts: ${usedSlugs.size}`);

  // Pick topic
  const topicData = pickTopic(usedSlugs, topicArg);
  const slug = toSlug(topicData.topic);

  console.log(`🎯 Topic: ${topicData.topic}`);
  console.log(`🔑 Keyword: ${topicData.keyword}`);
  console.log(`📅 Season: ${topicData.season || 'evergreen'}`);
  console.log(`🔗 Slug: ${slug}`);

  // Generate content
  const post = await generateBlogPost(topicData.topic, topicData.keyword, topicData.season);

  console.log(`\n✅ Generated: "${post.title}"`);
  console.log(`📄 Content length: ${post.content.length} chars`);
  console.log(`🏷️  Keywords: ${post.keywords.join(', ')}`);

  if (dryRun) {
    console.log('\n🔍 DRY RUN — content preview:\n');
    console.log('---');
    console.log(post.content.substring(0, 500) + '...');
    console.log('---');
    console.log('\n✅ Dry run complete. No data written.');
    return;
  }

  // Generate featured image (non-fatal — post publishes even if image fails)
  const noImage = args.includes('--no-image');
  if (!noImage) {
    const imageUrl = await generateFeaturedImage(post.title, topicData.topic, slug);
    if (imageUrl) {
      post.featured_image_url = imageUrl;
      post.image_cost = true;
    }
  } else {
    console.log('\n⏭️  Skipping image generation (--no-image flag)');
  }

  // Publish
  console.log('\n📤 Publishing to Supabase...');
  const created = await publishToSupabase(post, slug);

  console.log(`\n🚀 Published!`);
  console.log(`   ID:       ${created.id}`);
  console.log(`   Title:    ${created.title}`);
  console.log(`   Image:    ${created.featured_image_url || '(none)'}`);
  console.log(`   URL:      https://alpinepeakroofing.com/blog/${created.slug}`);
}

main().catch(err => {
  console.error('\n❌ Generation failed:', err.message);
  process.exit(1);
});
