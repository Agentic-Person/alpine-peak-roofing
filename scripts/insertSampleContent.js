#!/usr/bin/env node

/**
 * Insert sample content directly into the knowledge base
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://adueyerxzutuuwtxyage.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdWV5ZXJ4enV0dXV3dHh5YWdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzAxNzk5MSwiZXhwIjoyMDcyNTkzOTkxfQ.Fwyqe-JS-qcno7bjhftM-Y8izVGsxv5sa3A9UZWBruo';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Sample content to demonstrate the RAG system
const sampleContent = [
  {
    category: 'faq',
    title: 'What roofing materials do you recommend for mountain homes in Colorado?',
    content: 'For mountain homes in Colorado, we highly recommend impact-resistant materials that can withstand severe weather conditions. Our top choices include: 1) Architectural asphalt shingles with Class 4 impact rating, 2) Metal roofing systems (standing seam or metal shingles) which excel in snow load resistance, 3) Synthetic slate for premium aesthetics with superior durability. These materials are specifically chosen for Colorado\'s unique climate challenges including hail, high winds, heavy snow loads, and UV exposure at altitude. We prioritize sustainable options that offer both protection and energy efficiency.',
    tags: ['materials', 'mountain', 'colorado', 'recommendations'],
    priority: 9
  },
  {
    category: 'faq', 
    title: 'How do you handle emergency roof repairs in mountain communities?',
    content: 'Alpine Peak Roofing provides 24/7 emergency response services throughout Colorado\'s mountain communities including Aspen, Vail, Telluride, and surrounding areas. Our emergency response includes: Immediate leak mitigation and temporary weatherproofing, Same-day response for urgent situations, Specialized mountain access equipment for remote locations, Coordination with insurance adjusters for storm damage claims, and Permanent repair scheduling with premium materials. We maintain emergency supply caches in key mountain locations to ensure rapid response times even during severe weather conditions.',
    tags: ['emergency', 'mountain', 'repair', '24/7'],
    priority: 10
  },
  {
    category: 'knowledge',
    title: 'Alpine Peak Roofing: Colorado Mountain Roofing Specialists',
    content: 'Alpine Peak Roofing has been the premier roofing contractor serving Colorado\'s mountain communities for over 15 years. We specialize in high-altitude roofing solutions that address the unique challenges of mountain environments: extreme weather resistance, heavy snow load capacity, and premium aesthetic integration with mountain architecture. Our services include complete roof replacements, emergency repairs, sustainable roofing solutions, and specialized mountain access techniques. We serve Aspen, Vail, Telluride, Crested Butte, Steamboat Springs, and surrounding mountain communities with unmatched expertise and premium materials.',
    tags: ['alpine peak', 'mountain', 'colorado', 'specialist'],
    priority: 10
  },
  {
    category: 'glossary',
    title: 'Impact-Resistant Roofing',
    content: 'Impact-resistant roofing refers to materials that meet UL 2218 Class 4 standards for resistance to impact damage from hail and debris. These materials are essential in Colorado where hail damage is a significant concern. Class 4 materials can withstand impacts from 2-inch diameter steel balls dropped from 20 feet without cracking or splitting. Common impact-resistant options include specially designed asphalt shingles, metal roofing systems, and synthetic materials. Many insurance companies offer discounts for Class 4 rated materials due to their superior protection.',
    tags: ['impact', 'class 4', 'hail', 'ul 2218'],
    priority: 7
  },
  {
    category: 'services',
    title: 'Premium Mountain Roof Installation',
    content: 'Our premium mountain roof installation service includes comprehensive planning, specialized materials selection, and expert installation techniques designed for high-altitude environments. We begin with detailed structural assessment, snow load calculations, and aesthetic consultation to ensure perfect integration with mountain architecture. Our installation process includes: advanced weatherproofing techniques, specialized flashing systems for snow and ice management, premium materials with extended warranties, and thorough quality inspections. Each installation is customized for the specific challenges of mountain weather including high winds, heavy snow loads, and extreme temperature variations.',
    tags: ['installation', 'premium', 'mountain', 'service'],
    priority: 8
  }
];

async function getCategoryId(categoryName) {
  const { data, error } = await supabase
    .from('content_categories')
    .select('id')
    .eq('name', categoryName)
    .single();
  
  if (error) {
    console.error(`❌ Error finding category ${categoryName}:`, error.message);
    return null;
  }
  
  return data.id;
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function countWords(text) {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

function generateExcerpt(content, maxLength = 200) {
  if (content.length <= maxLength) return content;
  const truncated = content.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

async function insertSampleContent() {
  console.log('🚀 Inserting sample content to demonstrate RAG system...\n');

  try {
    // Test database connection
    const { data, error } = await supabase
      .from('content_categories')
      .select('count')
      .limit(1);
    
    if (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }

    console.log('✅ Database connection successful');

    let totalInserted = 0;

    for (const item of sampleContent) {
      const categoryId = await getCategoryId(item.category);
      if (!categoryId) {
        console.error(`❌ Category ${item.category} not found, skipping item`);
        continue;
      }

      const slug = generateSlug(item.title);
      const wordCount = countWords(item.content);
      const charCount = item.content.length;
      const excerpt = generateExcerpt(item.content);

      const contentItem = {
        category_id: categoryId,
        title: item.title,
        content: item.content,
        excerpt: excerpt,
        tags: item.tags,
        search_keywords: item.tags, // Using tags as initial keywords
        slug: slug,
        word_count: wordCount,
        char_count: charCount,
        priority: item.priority,
        is_active: true,
        last_reviewed_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('knowledge_content')
        .insert([contentItem]);

      if (error) {
        console.error(`❌ Error inserting ${item.title}:`, error.message);
      } else {
        console.log(`✅ Inserted: ${item.title} (${wordCount} words)`);
        totalInserted++;
      }
    }

    console.log(`\n🎉 Content insertion completed!`);
    console.log(`📊 Summary: ${totalInserted}/${sampleContent.length} items inserted successfully`);
    console.log(`📝 Total words: ${sampleContent.reduce((sum, item) => sum + countWords(item.content), 0).toLocaleString()}`);
    
    console.log('\n📋 Next Steps:');
    console.log('1. Deploy n8n workflows for embedding generation');
    console.log('2. Generate embeddings for the inserted content');
    console.log('3. Test semantic search functionality');
    console.log('4. Verify ChatWidget RAG integration');

  } catch (error) {
    console.error('\n❌ Content insertion failed:', error.message);
    process.exit(1);
  }
}

// Run the insertion
if (require.main === module) {
  insertSampleContent();
}

module.exports = insertSampleContent;