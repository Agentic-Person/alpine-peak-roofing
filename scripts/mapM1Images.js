const fs = require('fs').promises
const path = require('path')

// Import the image manifest
const imageManifest = require('../docs/images/imageManifest.json')

// Configuration
const M1_DIR = path.join(__dirname, '..', 'public', 'images', 'M1')
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images')

// Manual mapping between M1 files and manifest IDs
const FILE_MAPPING = {
  // Hero images
  'hero_homepage.png': 'hero_home',
  'hero_about.png': 'hero_about', 
  'hero_services.png': 'hero_services',
  'hero_portfolio.png': 'hero_portfolio',
  'hero_contact.png': 'hero_contact',
  
  // Team members
  'team_founder.png': 'team_founder',
  'team_founder-2.png': null, // duplicate
  'team_foreman.png': 'team_foreman',
  'team_customer_service.png': 'team_customer_service',
  'team_roofer_2.png': 'team_roofer_2',
  'team_safety.png': 'team_safety',
  
  // Services
  'service_residential.png': 'service_residential',
  'service_commercial.png': 'service_commercial',
  'service_emergency.png': 'service_emergency',
  
  // Portfolio - we'll use some of the existing images for portfolio projects
  'commercial_before.png': 'commercial_office_before',
  'commercial_after.png': 'commercial_office_after',
  'roofing_split_screen-2.png': 'residential_victorian_before',
  'roofing_split_screen_rain.png': 'residential_victorian_after',
  
  // Company/crew images - map to company category
  'facebook_crew.png': 'crew_action',
  'quality_inspection.png': 'process_inspection',
  'safety_equipment.png': 'equipment_display',
  
  // Skip these for now - no direct manifest mapping
  'Gemini_Generated_Image_f08hwwf08hwwf08h.png': null,
  'Gemini_Generated_Image_knzc8iknzc8iknzc.png': null, 
  'Gemini_Generated_Image_qix1paqix1paqix1.png': null,
  'Gemini_Generated_Image_yrf120yrf120yrf1.png': null,
  'fall_maintenance.png': null,
  'gaf_badge.png': null,
  'google_reviews.png': null,
  'hand_tools.png': null,
  'ice_dam_diagram.png': null,
  'instagram_transformation.png': null,
  'material_lifespan.png': null,
  'power_tools.png': null,
  'roof_components.png': null,
  'service_area_map.png': null,
  'spring_storm.png': null,
  'summer_installation.png': null,
  'team_customer_service (2).png': null // duplicate
}

class M1ImageMapper {
  constructor() {
    this.mapped = 0
    this.skipped = 0
    this.errors = []
    this.manifest = imageManifest
  }

  async mapImages() {
    console.log('🗺️  Alpine Peak Roofing - M1 Image Mapping Script')
    console.log('=' .repeat(50))
    
    try {
      // Check if M1 directory exists
      await this.checkM1Directory()
      
      // Get all images from M1
      const m1Images = await this.getM1Images()
      
      if (m1Images.length === 0) {
        console.log('📂 No images found in M1 directory')
        return
      }
      
      console.log(`📸 Found ${m1Images.length} images in M1 directory`)
      console.log('')
      
      // Process each image
      for (const imagePath of m1Images) {
        await this.processM1Image(imagePath)
      }
      
      // Report results
      this.printResults()
      
    } catch (error) {
      console.error('❌ Fatal error:', error.message)
      process.exit(1)
    }
  }

  async checkM1Directory() {
    try {
      await fs.access(M1_DIR)
    } catch (error) {
      console.log(`❌ M1 directory not found: ${M1_DIR}`)
      console.log('   Make sure the M1 folder exists with images')
      process.exit(1)
    }
  }

  async getM1Images() {
    const files = await fs.readdir(M1_DIR)
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase()
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
      })
      .map(file => path.join(M1_DIR, file))
  }

  async processM1Image(imagePath) {
    const filename = path.basename(imagePath)
    const manifestId = FILE_MAPPING[filename]
    
    if (!manifestId) {
      console.log(`⏭️  Skipping: ${filename} (no mapping)`)
      this.skipped++
      return
    }
    
    const manifestEntry = this.manifest.images[manifestId]
    if (!manifestEntry) {
      this.errors.push(`Manifest entry not found for ID: ${manifestId}`)
      return
    }
    
    try {
      console.log(`🔄 Mapping: ${filename} → ${manifestId}`)
      
      // Determine output path from manifest
      const outputPath = path.join(__dirname, '..', 'public', manifestEntry.path)
      const outputDir = path.dirname(outputPath)
      
      // Ensure output directory exists
      await fs.mkdir(outputDir, { recursive: true })
      
      // Copy the file
      await fs.copyFile(imagePath, outputPath)
      console.log(`   ✅ Copied to: ${manifestEntry.path}`)
      
      this.mapped++
      
    } catch (error) {
      this.errors.push(`Failed to process ${filename}: ${error.message}`)
    }
  }

  printResults() {
    console.log('')
    console.log('📊 Mapping Results')
    console.log('=' .repeat(30))
    console.log(`✅ Successfully mapped: ${this.mapped} images`)
    console.log(`⏭️  Skipped (no mapping): ${this.skipped} images`)
    
    if (this.errors.length > 0) {
      console.log(`❌ Errors encountered: ${this.errors.length}`)
      console.log('')
      console.log('Error Details:')
      this.errors.forEach(error => console.log(`   - ${error}`))
    }
    
    console.log('')
    console.log('🎯 Next Steps:')
    console.log('   1. Verify images are now in their correct locations')
    console.log('   2. Test the website to ensure images are loading')
    console.log('   3. Update imageManifest.json if needed')
    
    if (this.mapped > 0) {
      console.log('')
      console.log('🚀 Images have been mapped to their correct locations!')
    }
  }
}

// CLI handling
if (require.main === module) {
  const mapper = new M1ImageMapper()
  mapper.mapImages().catch(error => {
    console.error('❌ Script failed:', error.message)
    process.exit(1)
  })
}

module.exports = M1ImageMapper