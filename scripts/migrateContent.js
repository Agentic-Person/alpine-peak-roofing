#!/usr/bin/env node

/**
 * Alpine Peak Roofing - Content Migration Script
 * Migrates LLM-SEO content from static files to Supabase
 * Processes FAQ, Glossary, and Knowledge Hub content
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Content extraction helpers
function extractFAQContent() {
  const faqPath = path.join(__dirname, '..', 'app', 'faq', 'FAQPageClient.tsx');
  
  if (!fs.existsSync(faqPath)) {
    console.warn('⚠️ FAQ file not found, skipping...');
    return [];
  }

  const content = fs.readFileSync(faqPath, 'utf8');
  
  // Extract FAQ questions and answers from the React component
  const faqItems = [];
  const questionMatches = content.matchAll(/question:\s*["'](.+?)["']/g);
  const answerMatches = content.matchAll(/answer:\s*["'](.+?)["']/gs);
  
  const questions = Array.from(questionMatches, m => m[1]);
  const answers = Array.from(answerMatches, m => m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'));
  
  for (let i = 0; i < Math.min(questions.length, answers.length); i++) {
    faqItems.push({
      title: questions[i],
      content: answers[i],
      tags: ['faq', 'questions', 'roofing'],
      search_keywords: extractKeywords(questions[i] + ' ' + answers[i])
    });
  }
  
  return faqItems;
}

function extractGlossaryContent() {
  const glossaryPath = path.join(__dirname, '..', 'app', 'glossary', 'GlossaryPageClient.tsx');
  
  if (!fs.existsSync(glossaryPath)) {
    console.warn('⚠️ Glossary file not found, skipping...');
    return [];
  }

  const content = fs.readFileSync(glossaryPath, 'utf8');
  
  // Extract glossary terms and definitions
  const glossaryItems = [];
  const termMatches = content.matchAll(/term:\s*["'](.+?)["']/g);
  const definitionMatches = content.matchAll(/definition:\s*["'](.+?)["']/gs);
  const categoryMatches = content.matchAll(/category:\s*["'](.+?)["']/g);
  
  const terms = Array.from(termMatches, m => m[1]);
  const definitions = Array.from(definitionMatches, m => m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'));
  const categories = Array.from(categoryMatches, m => m[1]);
  
  for (let i = 0; i < Math.min(terms.length, definitions.length); i++) {
    glossaryItems.push({
      title: terms[i],
      content: definitions[i],
      tags: ['glossary', 'terminology', categories[i] || 'roofing'],
      search_keywords: extractKeywords(terms[i] + ' ' + definitions[i])
    });
  }
  
  return glossaryItems;
}

function extractKnowledgeContent() {
  const knowledgePath = path.join(__dirname, '..', 'app', 'knowledge', 'KnowledgeBaseClient.tsx');
  
  if (!fs.existsSync(knowledgePath)) {
    console.warn('⚠️ Knowledge Base file not found, skipping...');
    return [];
  }

  const content = fs.readFileSync(knowledgePath, 'utf8');
  
  // Extract knowledge base articles
  const knowledgeItems = [];
  const titleMatches = content.matchAll(/title:\s*["'](.+?)["']/g);
  const contentMatches = content.matchAll(/content:\s*["'](.+?)["']/gs);
  const categoryMatches = content.matchAll(/category:\s*["'](.+?)["']/g);
  
  const titles = Array.from(titleMatches, m => m[1]);
  const contents = Array.from(contentMatches, m => m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'));
  const categories = Array.from(categoryMatches, m => m[1]);
  
  for (let i = 0; i < Math.min(titles.length, contents.length); i++) {
    knowledgeItems.push({
      title: titles[i],
      content: contents[i],
      tags: ['knowledge', 'guide', categories[i] || 'general'],
      search_keywords: extractKeywords(titles[i] + ' ' + contents[i])
    });
  }
  
  return knowledgeItems;
}

function extractKeywords(text) {
  // Simple keyword extraction - in production, use more sophisticated NLP
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !['this', 'that', 'with', 'from', 'they', 'have', 'been', 'will', 'are', 'and', 'the', 'for'].includes(word));
  
  // Get unique words and return top 10
  const uniqueWords = [...new Set(words)];
  return uniqueWords.slice(0, 10);
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

async function insertContent(items, categoryName, priority = 5) {
  const categoryId = await getCategoryId(categoryName);
  if (!categoryId) {
    console.error(`❌ Category ${categoryName} not found`);
    return;
  }

  console.log(`\n📝 Inserting ${items.length} ${categoryName} items...`);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
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
      search_keywords: item.search_keywords,
      slug: slug,
      word_count: wordCount,
      char_count: charCount,
      priority: priority,
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
    }
  }
}

async function main() {
  console.log('🚀 Starting Alpine Peak Roofing content migration...\n');

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

    // Extract content from files
    console.log('\n📖 Extracting content from files...');
    const faqItems = extractFAQContent();
    const glossaryItems = extractGlossaryContent();
    const knowledgeItems = extractKnowledgeContent();

    console.log(`📊 Content Summary:`);
    console.log(`   FAQ: ${faqItems.length} items`);
    console.log(`   Glossary: ${glossaryItems.length} items`);
    console.log(`   Knowledge: ${knowledgeItems.length} items`);
    console.log(`   Total: ${faqItems.length + glossaryItems.length + knowledgeItems.length} items`);

    // Calculate total word count
    const totalWords = [
      ...faqItems,
      ...glossaryItems,
      ...knowledgeItems
    ].reduce((sum, item) => sum + countWords(item.content), 0);

    console.log(`   Total words: ${totalWords.toLocaleString()}`);

    // Insert content into database
    if (faqItems.length > 0) {
      await insertContent(faqItems, 'faq', 8); // High priority for FAQ
    }

    if (glossaryItems.length > 0) {
      await insertContent(glossaryItems, 'glossary', 6); // Medium priority
    }

    if (knowledgeItems.length > 0) {
      await insertContent(knowledgeItems, 'knowledge', 9); // Highest priority
    }

    console.log('\n🎉 Content migration completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Run embedding generation in n8n workflow');
    console.log('2. Test semantic search functionality');
    console.log('3. Configure RAG chat workflows');
    console.log('4. Update ChatWidget integration');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  main();
}

module.exports = {
  extractFAQContent,
  extractGlossaryContent,
  extractKnowledgeContent,
  extractKeywords,
  generateSlug,
  countWords,
  generateExcerpt
};