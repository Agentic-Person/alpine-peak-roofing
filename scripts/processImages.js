const fs = require('fs').promises
const path = require('path')
const sharp = require('sharp')

// Import the image manifest
const imageManifest = require('../docs/images/imageManifest.json')

// Configuration
const STAGING_DIR = path.join(__dirname, '..', 'staging', 'images')
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images')
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.svg']

// Quality settings for optimization
const QUALITY_SETTINGS = {
  jpeg: 85,
  webp: 85,
  png: 90
}

class ImageProcessor {
  constructor() {
    this.processed = 0
    this.errors = []
    this.manifest = imageManifest
  }

  async processImages() {
    console.log('🖼️  Alpine Peak Roofing - Image Processing Script')
    console.log('=' .repeat(50))
    
    try {
      // Check if staging directory exists
      await this.checkStagingDirectory()
      
      // Get all images from staging
      const stagingImages = await this.getStagingImages()
      
      if (stagingImages.length === 0) {
        console.log('📂 No images found in staging directory')
        console.log(`   Place generated images in: ${STAGING_DIR}`)
        return
      }
      
      console.log(`📸 Found ${stagingImages.length} images in staging`)
      console.log('')
      
      // Process each image
      for (const imagePath of stagingImages) {
        await this.processImage(imagePath)
      }
      
      // Report results
      this.printResults()
      
    } catch (error) {
      console.error('❌ Fatal error:', error.message)
      process.exit(1)
    }
  }

  async checkStagingDirectory() {
    try {
      await fs.access(STAGING_DIR)
    } catch (error) {
      console.log('📁 Creating staging directory...')
      await fs.mkdir(STAGING_DIR, { recursive: true })
      console.log(`   Created: ${STAGING_DIR}`)
      console.log('')
      console.log('📥 Instructions:')
      console.log('   1. Generate images using prompts from ImageGenerationPrompts.md')
      console.log('   2. Place all generated images in the staging folder')
      console.log('   3. Run this script again to process them')
      console.log('')
      console.log('💡 Expected file names:')
      Object.keys(this.manifest.images).forEach(id => {
        const ext = this.manifest.images[id].format === 'svg' ? '.svg' : '.jpg'
        console.log(`   - ${id}${ext}`)
      })
      process.exit(0)
    }
  }

  async getStagingImages() {
    const files = await fs.readdir(STAGING_DIR)
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase()
        return SUPPORTED_FORMATS.includes(ext)
      })
      .map(file => path.join(STAGING_DIR, file))
  }

  async processImage(imagePath) {
    const filename = path.basename(imagePath, path.extname(imagePath))
    const ext = path.extname(imagePath).toLowerCase()
    
    // Find matching manifest entry
    const manifestEntry = this.manifest.images[filename]
    if (!manifestEntry) {
      this.errors.push(`Unrecognized image: ${filename}${ext}`)
      return
    }
    
    try {
      console.log(`🔄 Processing: ${filename}${ext}`)
      
      // Determine output path
      const outputPath = path.join(__dirname, '..', 'public', manifestEntry.path)
      const outputDir = path.dirname(outputPath)
      
      // Ensure output directory exists
      await fs.mkdir(outputDir, { recursive: true })
      
      if (ext === '.svg') {
        // Copy SVG files directly
        await fs.copyFile(imagePath, outputPath)
        console.log(`   ✅ Copied SVG to: ${manifestEntry.path}`)
      } else {
        // Process and optimize raster images
        await this.optimizeImage(imagePath, outputPath, manifestEntry)
        console.log(`   ✅ Optimized to: ${manifestEntry.path}`)
      }
      
      this.processed++
      
    } catch (error) {
      this.errors.push(`Failed to process ${filename}: ${error.message}`)
    }
  }

  async optimizeImage(inputPath, outputPath, manifestEntry) {
    const { width, height } = manifestEntry.dimensions
    const outputExt = path.extname(outputPath).toLowerCase()
    
    let pipeline = sharp(inputPath)
      .resize(width, height, { 
        fit: 'cover',
        position: 'center'
      })
    
    // Apply format-specific optimizations
    switch (outputExt) {
      case '.jpg':
      case '.jpeg':
        pipeline = pipeline.jpeg({ 
          quality: QUALITY_SETTINGS.jpeg,
          progressive: true
        })
        break
        
      case '.webp':
        pipeline = pipeline.webp({ 
          quality: QUALITY_SETTINGS.webp
        })
        break
        
      case '.png':
        pipeline = pipeline.png({ 
          quality: QUALITY_SETTINGS.png,
          compressionLevel: 9
        })
        break
    }
    
    await pipeline.toFile(outputPath)
    
    // Also generate WebP version for modern browsers if original isn't WebP
    if (outputExt !== '.webp') {
      const webpPath = outputPath.replace(/\.[^.]+$/, '.webp')
      await sharp(inputPath)
        .resize(width, height, { fit: 'cover', position: 'center' })
        .webp({ quality: QUALITY_SETTINGS.webp })
        .toFile(webpPath)
    }
  }

  printResults() {
    console.log('')
    console.log('📊 Processing Results')
    console.log('=' .repeat(30))
    console.log(`✅ Successfully processed: ${this.processed} images`)
    
    if (this.errors.length > 0) {
      console.log(`❌ Errors encountered: ${this.errors.length}`)
      console.log('')
      console.log('Error Details:')
      this.errors.forEach(error => console.log(`   - ${error}`))
    }
    
    console.log('')
    console.log('🎯 Next Steps:')
    console.log('   1. Commit the processed images to your repository')
    console.log('   2. Test the website to ensure images are loading correctly')
    console.log('   3. Remove images from staging folder when satisfied')
    
    if (this.processed > 0) {
      console.log('')
      console.log('🚀 Images are now ready for use in your website!')
    }
  }
}

// Check for missing dependencies
function checkDependencies() {
  try {
    require('sharp')
  } catch (error) {
    console.error('❌ Missing dependency: sharp')
    console.error('   Install with: npm install sharp')
    process.exit(1)
  }
}

// CLI handling
if (require.main === module) {
  checkDependencies()
  
  const processor = new ImageProcessor()
  processor.processImages().catch(error => {
    console.error('❌ Script failed:', error.message)
    process.exit(1)
  })
}

module.exports = ImageProcessor