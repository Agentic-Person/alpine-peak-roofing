/**
 * Alpine Peak Roofing - Content Chunking Script
 * Processes roofing knowledge base into optimized chunks for vector embedding
 */

const fs = require('fs');
const path = require('path');

class ContentChunker {
  constructor(options = {}) {
    this.chunkSize = options.chunkSize || 600; // tokens
    this.overlap = options.overlap || 100; // tokens
    this.outputDir = options.outputDir || './chunked-content';
  }

  // Estimate token count (rough approximation: 1 token ≈ 4 characters)
  estimateTokens(text) {
    return Math.ceil(text.length / 4);
  }

  // Split text into overlapping chunks
  chunkText(text, metadata = {}) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const chunks = [];
    let currentChunk = '';
    let currentTokens = 0;

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim() + '.';
      const sentenceTokens = this.estimateTokens(sentence);

      // If adding this sentence would exceed chunk size, save current chunk
      if (currentTokens + sentenceTokens > this.chunkSize && currentChunk.length > 0) {
        chunks.push({
          content: currentChunk.trim(),
          tokens: currentTokens,
          metadata: { ...metadata, chunk_index: chunks.length }
        });

        // Start new chunk with overlap
        const overlapSentences = sentences.slice(Math.max(0, i - 2), i);
        currentChunk = overlapSentences.join(' ') + ' ' + sentence;
        currentTokens = this.estimateTokens(currentChunk);
      } else {
        currentChunk += ' ' + sentence;
        currentTokens += sentenceTokens;
      }
    }

    // Add final chunk if it has content
    if (currentChunk.trim().length > 0) {
      chunks.push({
        content: currentChunk.trim(),
        tokens: currentTokens,
        metadata: { ...metadata, chunk_index: chunks.length }
      });
    }

    return chunks;
  }

  // Process roofing materials content
  processRoofingMaterials() {
    const materials = {
      'asphalt-shingles': {
        content: `
# Asphalt Shingles - Complete Guide

## 3-Tab Shingles
3-tab asphalt shingles are the most basic and economical roofing option. They provide reliable weather protection for 15-20 years in Colorado's climate. The uniform appearance features three tabs per shingle, creating clean horizontal lines across the roof. Best suited for budget-conscious homeowners who need dependable protection without premium features.

Key characteristics: Single layer construction, 15-20 year lifespan, wind resistance up to 60 mph, basic color options, lowest cost per square foot. Installation requires proper nailing patterns with 4 nails per shingle, adequate ventilation, and ice/water shield in Colorado's freeze-thaw climate.

## Architectural Shingles
Architectural shingles (dimensional shingles) offer enhanced durability and aesthetic appeal. The multi-layered construction creates dimensional appearance that mimics wood shake or slate. Lifespan extends to 25-30 years with superior wind resistance up to 110 mph, crucial for Colorado's mountain winds.

Features include: Dual-layer construction, varied tab sizes, enhanced granule technology, multiple color blends, improved UV resistance. Installation requires specialized techniques for proper alignment and weather sealing. Popular in Denver metro area for balance of performance and cost.

## Luxury Shingles
Luxury asphalt shingles represent the premium tier, offering 30+ year lifespans with superior weather resistance. Enhanced granule technology provides exceptional color retention and algae resistance. Thicker construction improves impact resistance for Colorado hail protection.

Premium features: Triple-layer construction, architectural styling, enhanced wind resistance (130+ mph), impact ratings up to Class 4, premium color options, extended warranties. Investment-grade option for high-end homes requiring maximum performance and curb appeal.

## Impact-Resistant Shingles
Class 4 impact-resistant shingles are essential for Colorado's hail-prone climate. UL 2218 Class 4 rating means they withstand 2-inch steel ball impacts without cracking. Many insurance companies offer 10-30% discounts for Class 4 installations.

Benefits include: Hail damage protection, insurance premium reductions, enhanced granule adhesion, improved tear resistance, extended warranties. Recommended for all Front Range installations due to frequent hail activity. Cost premium pays for itself through insurance savings and reduced repair needs.
        `,
        metadata: {
          category: 'materials',
          subcategory: 'asphalt-shingles',
          urgency: 'normal',
          season: 'year-round',
          location: 'general',
          service_type: 'residential',
          complexity: 'basic'
        }
      },

      'metal-roofing': {
        content: `
# Metal Roofing Systems - Professional Guide

## Standing Seam Metal
Standing seam metal roofing provides 40-70 year lifespan with exceptional performance in Colorado's climate. Concealed fastener system eliminates penetration points, reducing leak potential. Thermal movement accommodation prevents stress cracking in temperature cycling.

Technical specifications: 24-gauge steel or aluminum construction, 12-16 inch panel widths, mechanical or snap-lock seaming, concealed clip attachment. Expansion joints required for runs over 100 feet. Ideal for mountain homes with steep pitches and heavy snow loads.

Benefits include: Superior longevity, energy efficiency (reflective coatings), low maintenance, recyclable materials, excellent wind/hail resistance. Higher upfront cost offset by lifecycle value and energy savings.

## Corrugated Metal Panels
Corrugated metal offers cost-effective protection for agricultural and industrial applications. Exposed fastener system requires proper sealing and maintenance. 20-40 year lifespan depending on coating quality and maintenance.

Applications: Barns, shops, commercial buildings, budget residential projects. Available in galvanized, painted, or weathering steel. Proper installation requires adequate slope (3:12 minimum), quality fasteners, and weather sealing.

## Stone-Coated Steel
Stone-coated steel combines metal durability with traditional appearance. Acrylic-bonded stone granules provide texture and color while protecting the steel substrate. 30-50 year lifespan with tile or shake appearance.

Features: Lightweight (2-3 lbs/sq ft), impact resistant, fire rated, multiple profiles available. Popular for mountain homes requiring authentic appearance with metal performance. Professional installation essential for warranty compliance.
        `,
        metadata: {
          category: 'materials',
          subcategory: 'metal-roofing',
          urgency: 'normal',
          season: 'year-round',
          location: 'mountains',
          service_type: 'both',
          complexity: 'intermediate'
        }
      },

      'colorado-climate': {
        content: `
# Colorado Climate Roofing Challenges

## High Altitude Effects
Colorado's elevation creates unique roofing challenges. UV radiation increases 4% per 1000 feet of elevation, accelerating material degradation. Denver at 5,280 feet experiences 25% more UV than sea level locations. Material selection must account for enhanced UV exposure.

Temperature cycling in mountains can exceed 60°F daily swings. Thermal expansion/contraction stresses roofing materials and fasteners. Proper installation techniques include expansion joints, flexible sealants, and appropriate fastener selection.

## Snow Load Management
Colorado building codes specify snow loads from 25 psf (Denver) to 150+ psf (mountain areas). Roof structure must support both uniform snow loads and drift accumulations. Ice dam prevention requires proper insulation, ventilation, and heating cable systems.

Critical factors: Roof pitch affects snow retention, valley areas concentrate loads, equipment platforms require reinforcement. Professional structural analysis recommended for additions or modifications.

## Hail Damage and Repair
Colorado experiences 3-4 major hail events annually along the Front Range. Hail sizes from marble (0.75") to softball (4.5") cause varying damage levels. Impact-resistant materials provide crucial protection.

Damage assessment: Granule loss, mat exposure, cracking, punctures, gutter damage. Insurance claims require thorough documentation and professional evaluation. Temporary repairs prevent water intrusion while permanent solutions are implemented.

## Wind Resistance Requirements
Mountain downdrafts and chinook winds create extreme uplift forces. Building codes require enhanced fastening in high-wind zones. Proper edge detail installation prevents blow-off failures.

Design considerations: Roof geometry affects wind loading, parapet walls create turbulence, equipment screening requires special attachment. Professional wind analysis recommended for complex structures.
        `,
        metadata: {
          category: 'climate',
          subcategory: 'colorado-specific',
          urgency: 'high',
          season: 'year-round',
          location: 'colorado',
          service_type: 'both',
          complexity: 'advanced'
        }
      }
    };

    const allChunks = [];
    
    Object.entries(materials).forEach(([key, data]) => {
      const chunks = this.chunkText(data.content, data.metadata);
      chunks.forEach((chunk, index) => {
        chunk.id = `${key}_chunk_${index}`;
        allChunks.push(chunk);
      });
    });

    return allChunks;
  }

  // Export chunks for vector database
  exportChunks(chunks) {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Export as JSON for embedding pipeline
    const exportData = {
      total_chunks: chunks.length,
      total_tokens: chunks.reduce((sum, chunk) => sum + chunk.tokens, 0),
      chunks: chunks
    };

    fs.writeFileSync(
      path.join(this.outputDir, 'roofing-knowledge-chunks.json'),
      JSON.stringify(exportData, null, 2)
    );

    // Export individual markdown files for review
    chunks.forEach((chunk, index) => {
      const filename = `chunk_${String(index).padStart(4, '0')}.md`;
      const content = `# Chunk ${index}\n\n**Metadata:** ${JSON.stringify(chunk.metadata, null, 2)}\n\n**Tokens:** ${chunk.tokens}\n\n---\n\n${chunk.content}`;
      
      fs.writeFileSync(path.join(this.outputDir, filename), content);
    });

    console.log(`✅ Exported ${chunks.length} chunks to ${this.outputDir}`);
    console.log(`📊 Total tokens: ${exportData.total_tokens}`);
    
    return exportData;
  }

  // Main processing function
  processAll() {
    console.log('🚀 Starting content chunking process...');
    
    const chunks = this.processRoofingMaterials();
    const exportData = this.exportChunks(chunks);
    
    console.log('✨ Content chunking complete!');
    console.log(`📁 Output directory: ${this.outputDir}`);
    console.log(`📋 Ready for vector embedding pipeline`);
    
    return exportData;
  }
}

// Export for use in other scripts
module.exports = ContentChunker;

// Run if called directly
if (require.main === module) {
  const chunker = new ContentChunker({
    chunkSize: 600,
    overlap: 100,
    outputDir: './chunked-content'
  });
  
  chunker.processAll();
}
