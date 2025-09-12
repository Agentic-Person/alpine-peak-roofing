#!/usr/bin/env node

/**
 * Alpine Peak Roofing - Content Processing Script
 * 
 * This script processes all documentation files and chunks them for vector database storage.
 * It creates optimally sized chunks with metadata for enhanced RAG retrieval.
 */

const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  chunkSize: 800,        // Target tokens per chunk
  chunkOverlap: 100,     // Token overlap between chunks
  minChunkSize: 200,     // Minimum viable chunk size
  docsDirectory: '../../docs',
  outputDirectory: './processed-content',
  metadataFile: './content-metadata.json'
};

// Metadata categories for classification
const CATEGORIES = {
  materials: ['shingle', 'metal', 'tile', 'slate', 'tpo', 'epdm', 'asphalt'],
  climate: ['colorado', 'denver', 'snow', 'hail', 'wind', 'altitude', 'weather'],
  installation: ['install', 'nail', 'flash', 'ventilat', 'barrier', 'technique'],
  maintenance: ['maintain', 'repair', 'inspect', 'clean', 'prevent', 'seasonal'],
  commercial: ['commercial', 'tpo', 'epdm', 'built-up', 'membrane', 'business'],
  emergency: ['emergency', 'leak', 'storm', 'damage', 'urgent', 'immediate'],
  pricing: ['cost', 'price', 'estimate', 'quote', 'budget', 'value', '$']
};

const URGENCY_LEVELS = {
  emergency: ['emergency', 'urgent', 'immediate', 'critical', 'danger', 'leak'],
  high: ['estimate', 'quote', 'schedule', 'appointment', 'inspection'],
  normal: ['material', 'shingle', 'warranty', 'install', 'repair'],
  informational: ['what', 'how', 'why', 'when', 'general', 'about']
};

class ContentProcessor {
  constructor() {
    this.processedChunks = [];
    this.metadata = {
      totalFiles: 0,
      totalChunks: 0,
      categories: {},
      processedAt: new Date().toISOString()
    };
  }

  /**
   * Main processing function
   */
  async process() {
    try {
      console.log('🚀 Starting content processing...');
      
      // Create output directory
      await this.ensureDirectoryExists(CONFIG.outputDirectory);
      
      // Get all documentation files
      const docFiles = await this.getDocumentationFiles();
      console.log(`📄 Found ${docFiles.length} documentation files`);
      
      // Process each file
      for (const filePath of docFiles) {
        await this.processFile(filePath);
      }
      
      // Save processed chunks and metadata
      await this.saveProcessedContent();
      
      console.log('✅ Content processing complete!');
      console.log(`📊 Processed ${this.metadata.totalFiles} files into ${this.metadata.totalChunks} chunks`);
      
    } catch (error) {
      console.error('❌ Error processing content:', error);
      throw error;
    }
  }

  /**
   * Get all markdown documentation files
   */
  async getDocumentationFiles() {
    const docsPath = path.resolve(__dirname, CONFIG.docsDirectory);
    const files = [];

    async function scanDirectory(dir) {
      const items = await fs.readdir(dir, { withFileTypes: true });
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
          await scanDirectory(fullPath);
        } else if (item.name.endsWith('.md') && !item.name.startsWith('.')) {
          files.push(fullPath);
        }
      }
    }

    await scanDirectory(docsPath);
    return files;
  }

  /**
   * Process a single documentation file
   */
  async processFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const relativePath = path.relative(path.resolve(__dirname, CONFIG.docsDirectory), filePath);
      
      console.log(`📖 Processing: ${relativePath}`);
      
      // Clean and normalize content
      const cleanedContent = this.cleanContent(content);
      
      // Extract file-level metadata
      const fileMetadata = this.extractFileMetadata(relativePath, cleanedContent);
      
      // Split into sections
      const sections = this.splitIntoSections(cleanedContent);
      
      // Create chunks from sections
      const chunks = this.createChunks(sections, fileMetadata);
      
      // Add chunks to processed content
      this.processedChunks.push(...chunks);
      this.metadata.totalFiles++;
      
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  /**
   * Clean and normalize content
   */
  cleanContent(content) {
    return content
      // Remove excessive whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Clean up markdown artifacts
      .replace(/```[\s\S]*?```/g, (match) => {
        // Preserve code blocks but clean them up
        return match.replace(/\n+/g, '\n');
      })
      // Remove image references that don't add value
      .replace(/!\[.*?\]\(.*?\)/g, '[Image]')
      // Clean up tables
      .replace(/\|[\s-|]+\|/g, '')
      // Normalize spacing
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  /**
   * Extract metadata from file path and content
   */
  extractFileMetadata(filePath, content) {
    const fileName = path.basename(filePath, '.md').toLowerCase();
    const pathParts = filePath.split('/');
    
    // Determine category
    let category = 'general';
    let subcategory = '';
    
    for (const [cat, keywords] of Object.entries(CATEGORIES)) {
      if (keywords.some(keyword => fileName.includes(keyword) || content.toLowerCase().includes(keyword))) {
        category = cat;
        break;
      }
    }
    
    // Determine urgency level
    let urgency = 'normal';
    for (const [level, keywords] of Object.entries(URGENCY_LEVELS)) {
      if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
        urgency = level;
        break;
      }
    }
    
    // Determine service type
    let serviceType = 'both';
    if (content.toLowerCase().includes('commercial') && !content.toLowerCase().includes('residential')) {
      serviceType = 'commercial';
    } else if (content.toLowerCase().includes('residential') && !content.toLowerCase().includes('commercial')) {
      serviceType = 'residential';
    }
    
    // Determine season relevance
    const seasons = [];
    const seasonKeywords = {
      spring: ['spring', 'storm season', 'inspection'],
      summer: ['summer', 'installation', 'peak season'],
      fall: ['fall', 'autumn', 'preparation', 'gutter'],
      winter: ['winter', 'snow', 'ice', 'emergency']
    };
    
    for (const [season, keywords] of Object.entries(seasonKeywords)) {
      if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
        seasons.push(season);
      }
    }
    
    return {
      source: filePath,
      category,
      subcategory,
      urgency,
      serviceType,
      seasons: seasons.length > 0 ? seasons : ['year-round'],
      location: 'denver', // All content is Denver-focused
      complexity: content.length > 2000 ? 'advanced' : content.length > 1000 ? 'intermediate' : 'basic'
    };
  }

  /**
   * Split content into logical sections
   */
  splitIntoSections(content) {
    // Split by headers and major sections
    const sections = [];
    const lines = content.split('\n');
    let currentSection = '';
    let currentTitle = '';
    
    for (const line of lines) {
      if (line.match(/^#{1,3}\s/)) { // H1, H2, H3 headers
        if (currentSection.trim()) {
          sections.push({
            title: currentTitle,
            content: currentSection.trim()
          });
        }
        currentTitle = line.replace(/^#+\s*/, '');
        currentSection = line + '\n';
      } else {
        currentSection += line + '\n';
      }
    }
    
    // Add the last section
    if (currentSection.trim()) {
      sections.push({
        title: currentTitle,
        content: currentSection.trim()
      });
    }
    
    return sections;
  }

  /**
   * Create optimally sized chunks from sections
   */
  createChunks(sections, fileMetadata) {
    const chunks = [];
    
    for (const section of sections) {
      const estimatedTokens = this.estimateTokens(section.content);
      
      if (estimatedTokens <= CONFIG.chunkSize) {
        // Section fits in one chunk
        chunks.push(this.createChunk(section.content, section.title, fileMetadata));
      } else {
        // Split section into multiple chunks
        const sectionChunks = this.splitLongSection(section, fileMetadata);
        chunks.push(...sectionChunks);
      }
    }
    
    return chunks;
  }

  /**
   * Split long sections into multiple chunks
   */
  splitLongSection(section, fileMetadata) {
    const chunks = [];
    const sentences = section.content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    let currentChunk = section.title ? `# ${section.title}\n\n` : '';
    let overlapBuffer = '';
    
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim() + '.';
      const testChunk = currentChunk + sentence + ' ';
      
      if (this.estimateTokens(testChunk) > CONFIG.chunkSize) {
        // Current chunk is full, save it
        if (currentChunk.trim()) {
          chunks.push(this.createChunk(currentChunk.trim(), section.title, fileMetadata));
        }
        
        // Start new chunk with overlap
        currentChunk = overlapBuffer + sentence + ' ';
        overlapBuffer = this.createOverlapBuffer(currentChunk);
      } else {
        currentChunk += sentence + ' ';
      }
    }
    
    // Add the final chunk
    if (currentChunk.trim()) {
      chunks.push(this.createChunk(currentChunk.trim(), section.title, fileMetadata));
    }
    
    return chunks;
  }

  /**
   * Create overlap buffer for chunk continuity
   */
  createOverlapBuffer(content) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const overlapSentences = sentences.slice(-2); // Last 2 sentences for overlap
    
    let buffer = '';
    for (const sentence of overlapSentences) {
      const testBuffer = buffer + sentence.trim() + '. ';
      if (this.estimateTokens(testBuffer) < CONFIG.chunkOverlap) {
        buffer = testBuffer;
      } else {
        break;
      }
    }
    
    return buffer;
  }

  /**
   * Create a chunk object
   */
  createChunk(content, title, fileMetadata) {
    const chunkId = crypto.createHash('md5').update(content).digest('hex').substring(0, 12);
    const tokens = this.estimateTokens(content);
    
    const chunk = {
      id: `chunk_${chunkId}`,
      content: content,
      title: title || 'Untitled Section',
      tokens: tokens,
      metadata: {
        ...fileMetadata,
        chunkIndex: this.metadata.totalChunks,
        createdAt: new Date().toISOString()
      }
    };
    
    this.metadata.totalChunks++;
    
    // Update category counts
    const category = chunk.metadata.category;
    this.metadata.categories[category] = (this.metadata.categories[category] || 0) + 1;
    
    return chunk;
  }

  /**
   * Rough token estimation (1 token ≈ 4 characters)
   */
  estimateTokens(text) {
    return Math.ceil(text.length / 4);
  }

  /**
   * Save processed content and metadata
   */
  async saveProcessedContent() {
    // Save chunks
    const chunksFile = path.join(CONFIG.outputDirectory, 'processed-chunks.json');
    await fs.writeFile(chunksFile, JSON.stringify(this.processedChunks, null, 2));
    
    // Save metadata
    const metadataFile = path.join(CONFIG.outputDirectory, 'content-metadata.json');
    await fs.writeFile(metadataFile, JSON.stringify(this.metadata, null, 2));
    
    // Create summary report
    const reportFile = path.join(CONFIG.outputDirectory, 'processing-report.md');
    const report = this.generateReport();
    await fs.writeFile(reportFile, report);
    
    console.log(`💾 Saved ${this.processedChunks.length} chunks to ${chunksFile}`);
    console.log(`📊 Saved metadata to ${metadataFile}`);
    console.log(`📋 Generated report at ${reportFile}`);
  }

  /**
   * Generate processing report
   */
  generateReport() {
    const totalTokens = this.processedChunks.reduce((sum, chunk) => sum + chunk.tokens, 0);
    const avgTokensPerChunk = Math.round(totalTokens / this.processedChunks.length);
    
    let report = `# Content Processing Report\n\n`;
    report += `**Processed:** ${this.metadata.processedAt}\n\n`;
    report += `## Summary\n`;
    report += `- **Files Processed:** ${this.metadata.totalFiles}\n`;
    report += `- **Chunks Created:** ${this.metadata.totalChunks}\n`;
    report += `- **Total Tokens:** ${totalTokens.toLocaleString()}\n`;
    report += `- **Average Tokens/Chunk:** ${avgTokensPerChunk}\n\n`;
    
    report += `## Category Distribution\n`;
    for (const [category, count] of Object.entries(this.metadata.categories)) {
      const percentage = Math.round((count / this.metadata.totalChunks) * 100);
      report += `- **${category}:** ${count} chunks (${percentage}%)\n`;
    }
    
    report += `\n## Configuration Used\n`;
    report += `- **Chunk Size:** ${CONFIG.chunkSize} tokens\n`;
    report += `- **Chunk Overlap:** ${CONFIG.chunkOverlap} tokens\n`;
    report += `- **Min Chunk Size:** ${CONFIG.minChunkSize} tokens\n\n`;
    
    report += `## Next Steps\n`;
    report += `1. Generate embeddings for all chunks\n`;
    report += `2. Store in Supabase vector database\n`;
    report += `3. Test search functionality\n`;
    report += `4. Integrate with n8n workflow\n`;
    
    return report;
  }

  /**
   * Ensure directory exists
   */
  async ensureDirectoryExists(dirPath) {
    try {
      await fs.access(dirPath);
    } catch {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }
}

// Run the processor if called directly
if (require.main === module) {
  const processor = new ContentProcessor();
  processor.process().catch(console.error);
}

module.exports = ContentProcessor;