#!/usr/bin/env node
/**
 * Alpine Peak Roofing — Blog Restore Script
 * Re-seeds 18 missing original blog posts to Supabase.
 * Skips any slug that already exists (upsert-safe).
 *
 * Usage: node scripts/restore-blog-posts.mjs
 */

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

dotenv.config({ path: join(ROOT, '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !OPENAI_KEY) {
  console.error('❌ Missing required env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_KEY });

// ── 18 original posts ──────────────────────────────────────────────────────────
const POSTS = [
  {
    imageFile: 'blog_1_diy_vs_professional',
    slug: 'diy-vs-professional-roofing-colorado',
    topic: 'DIY vs Professional Roofing: Why Colorado Homeowners Should Hire a Pro',
    keyword: 'professional roofing contractor Colorado',
  },
  {
    imageFile: 'blog_2_post_storm_inspection',
    slug: 'post-storm-roof-inspection-colorado',
    topic: 'Post-Storm Roof Inspection: What to Check After Colorado Hail and Wind',
    keyword: 'post-storm roof inspection Colorado',
  },
  {
    imageFile: 'blog_3_metal_roofing_investment',
    slug: 'metal-roofing-worth-investment-colorado',
    topic: 'Is Metal Roofing Worth the Investment for Colorado Homes?',
    keyword: 'metal roofing investment Colorado',
  },
  {
    imageFile: 'blog_4_ice_dams_prevention',
    slug: 'ice-dams-prevention-solutions-colorado',
    topic: 'Ice Dams: Prevention and Solutions for Colorado Roofs',
    keyword: 'ice dams prevention Colorado roofs',
  },
  {
    imageFile: 'blog_5_roof_warnings',
    slug: '7-warning-signs-roof-needs-attention-colorado',
    topic: '7 Warning Signs Your Colorado Roof Needs Immediate Attention',
    keyword: 'roof warning signs Colorado',
  },
  {
    imageFile: 'blog_6_attic_ventilation',
    slug: 'attic-ventilation-roof-colorado-climate',
    topic: 'Attic Ventilation and Your Roof: Why It Matters in Colorado\'s Climate',
    keyword: 'attic ventilation roof Colorado',
  },
  {
    imageFile: 'blog_7_durable_materials',
    slug: 'most-durable-roofing-materials-colorado',
    topic: 'Most Durable Roofing Materials for Colorado\'s Extreme Weather',
    keyword: 'durable roofing materials Colorado',
  },
  {
    imageFile: 'blog_8_cheap_roofing_fails',
    slug: 'cheap-roofing-contractors-cost-more-colorado',
    topic: 'Why Cheap Roofing Contractors Cost You More in the Long Run',
    keyword: 'cheap roofing contractors Colorado',
  },
  {
    imageFile: 'blog_9_replacement_process',
    slug: 'colorado-roof-replacement-process',
    topic: 'The Complete Colorado Roof Replacement Process: What to Expect',
    keyword: 'roof replacement process Colorado',
  },
  {
    imageFile: 'blog_10_hail_claims',
    slug: 'hail-damage-insurance-claim-colorado',
    topic: 'How to File a Successful Hail Damage Insurance Claim in Colorado',
    keyword: 'hail damage insurance claim Colorado',
  },
  {
    imageFile: 'blog_11_gutter_systems',
    slug: 'gutter-systems-roof-protection-colorado',
    topic: 'Gutter Systems and Roof Protection: A Colorado Homeowner\'s Guide',
    keyword: 'gutter systems roof protection Colorado',
  },
  {
    imageFile: 'blog_12_repair_vs_replace',
    slug: 'roof-repair-vs-replacement-colorado',
    topic: 'Roof Repair vs. Replacement: How to Decide for Your Colorado Home',
    keyword: 'roof repair vs replacement Colorado',
  },
  {
    imageFile: 'blog_13_snow_load_limits',
    slug: 'snow-load-limits-roof-safety-colorado',
    topic: 'Snow Load Limits and Roof Safety in Colorado\'s Mountain Communities',
    keyword: 'snow load limits roof safety Colorado',
  },
  {
    imageFile: 'blog_14_metal_roofing_case_studies',
    slug: 'metal-roofing-case-studies-colorado',
    topic: 'Metal Roofing Case Studies: Colorado Homes That Made the Switch',
    keyword: 'metal roofing case studies Colorado',
  },
  {
    imageFile: 'blog_15_local_family_business',
    slug: 'local-family-roofing-business-colorado',
    topic: 'Why Choosing a Local Family Roofing Business Matters in Colorado',
    keyword: 'local family roofing business Colorado',
  },
  {
    imageFile: 'blog_16_ai_technology',
    slug: 'ai-technology-roofing-industry-colorado',
    topic: 'How AI Technology Is Transforming the Roofing Industry in Colorado',
    keyword: 'AI technology roofing Colorado',
  },
  {
    imageFile: 'blog_17_emergency_repair',
    slug: 'emergency-roof-repair-colorado',
    topic: 'Emergency Roof Repair in Colorado: What to Do When Disaster Strikes',
    keyword: 'emergency roof repair Colorado',
  },
  {
    imageFile: 'blog_18_warranties',
    slug: 'roofing-warranties-colorado-homeowners',
    topic: 'Understanding Roofing Warranties: What Colorado Homeowners Need to Know',
    keyword: 'roofing warranties Colorado',
  },
];

// Spread publish dates across the last 6 months (oldest first, ~10 days apart)
// Today: 2026-03-11 → start: 2025-09-11
function getPublishDate(index) {
  const start = new Date('2025-09-11');
  start.setDate(start.getDate() + index * 10);
  return start.toISOString().split('T')[0];
}

async function getExistingSlugs() {
  const { data, error } = await supabase.from('blog_posts').select('slug');
  if (error) {
    console.warn('⚠️  Could not fetch existing slugs:', error.message);
    return new Set();
  }
  return new Set(data.map(p => p.slug));
}

async function generatePost(post) {
  const systemPrompt = `You are a senior content writer for Alpine Peak Roofing, a trusted Denver, Colorado roofing company serving homeowners since 1998.
Your audience is Colorado homeowners (primarily Denver metro and Front Range).
Write authoritative, helpful, locally-specific content. Reference Colorado's unique climate: high altitude, hail seasons, heavy snow, UV intensity, temperature swings.
Always be homeowner-friendly — explain technical concepts clearly. Never be salesy or generic.
Alpine Peak Roofing offers: residential and commercial roofing, hail damage repair, insurance claim assistance, free inspections, financing options.
Contact: (303) 555-0199 | alpinepeakroofing.com`;

  const userPrompt = `Write a comprehensive, SEO-optimized blog post for Alpine Peak Roofing on the topic: "${post.topic}"

Primary keyword: "${post.keyword}"

Requirements:
- Length: 800-1000 words
- Structure: Intro, 3-4 H2 sections with content, Conclusion with CTA
- Use H2 and H3 headings (markdown format: ## and ###)
- Include Colorado-specific stats, facts, or scenarios where relevant
- Naturally include the primary keyword 3-5 times
- End with a call-to-action mentioning free inspection or calling Alpine Peak Roofing
- Write in second person ("you", "your home") to speak directly to homeowners

Return ONLY valid JSON with this exact structure:
{
  "title": "SEO-optimized title (60 chars max)",
  "meta_description": "Compelling meta description (155 chars max) with primary keyword",
  "content": "Full blog post in markdown format",
  "focus_keyword": "primary focus keyword phrase",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content);
}

async function main() {
  console.log('🏔️  Alpine Peak Blog Restore');
  console.log('============================');

  const existingSlugs = await getExistingSlugs();
  console.log(`📊 Existing posts in Supabase: ${existingSlugs.size}`);

  let inserted = 0;
  let skipped = 0;
  const errors = [];

  for (let i = 0; i < POSTS.length; i++) {
    const post = POSTS[i];
    const publishDate = getPublishDate(i);

    if (existingSlugs.has(post.slug)) {
      console.log(`⏭️  [${i + 1}/18] Skipping (already exists): ${post.slug}`);
      skipped++;
      continue;
    }

    console.log(`\n📝 [${i + 1}/18] Generating: "${post.topic}"`);

    try {
      const generated = await generatePost(post);

      const record = {
        title: generated.title.substring(0, 200),
        slug: post.slug,
        content: generated.content,
        seo_title: generated.title.substring(0, 200),
        meta_description: generated.meta_description.substring(0, 160),
        focus_keyword: generated.focus_keyword || post.keyword,
        keywords: generated.keywords || [post.keyword],
        status: 'published',
        publish_date: publishDate,
        published_at: `${publishDate}T10:00:00.000Z`,
        featured_image_url: `/images/blog/${post.imageFile}.jpg`,
        alt_text: `${generated.title} - Alpine Peak Roofing Colorado`,
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([record])
        .select('id, slug, title')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      console.log(`   ✅ Inserted: "${data.title}"`);
      console.log(`      slug: ${data.slug} | date: ${publishDate}`);
      inserted++;
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
      errors.push({ slug: post.slug, error: err.message });
    }

    // Rate limit: 1 second between posts
    if (i < POSTS.length - 1) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  console.log('\n============================');
  console.log('📋 Restore Summary');
  console.log(`   ✅ Inserted: ${inserted}`);
  console.log(`   ⏭️  Skipped:  ${skipped}`);
  console.log(`   ❌ Errors:   ${errors.length}`);

  if (errors.length > 0) {
    console.log('\n❌ Failed posts:');
    errors.forEach(e => console.log(`   - ${e.slug}: ${e.error}`));
    process.exit(1);
  }

  console.log('\n🚀 All posts restored successfully!');
}

main().catch(err => {
  console.error('\n❌ Script failed:', err.message);
  process.exit(1);
});
