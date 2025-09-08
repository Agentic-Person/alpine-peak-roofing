# Alpine Peak Roofing - Image Generation & Import Workflow

*Complete workflow for generating and importing all website images*

## 📋 Overview

This system provides a streamlined workflow to:
1. Generate all 45+ images using AI prompts
2. Automatically organize and optimize them
3. Import them into the website with zero manual configuration

## 🚀 Quick Start

### Step 1: Generate Images
1. Open `ImageGenerationPrompts.md` 
2. Copy prompts for your AI image generator (Midjourney, DALL-E, etc.)
3. Generate images with **exact filenames** as specified

### Step 2: Import Images
```bash
# Set up staging directory
npm run setup-staging

# Place all generated images in staging/images/
# Then process them automatically:
npm run process-images
```

### Step 3: Use in Code
```tsx
import SiteImage, { HeroImage, PortfolioImagePair } from '@/components/SiteImage'

// Simple image
<SiteImage id="hero_home" className="w-full h-64" />

// Hero section with overlay
<HeroImage id="hero_about" className="h-96">
  <h1>About Us</h1>
</HeroImage>

// Before/after portfolio images
<PortfolioImagePair 
  beforeId="residential_victorian_before" 
  afterId="residential_victorian_after" 
/>
```

---

## 📁 File Structure

```
apr-website/
├── ImageGenerationPrompts.md         # All AI prompts with specifications
├── imageManifest.json               # Central image registry
├── ImageWorkflow.md                 # This workflow guide
├── components/
│   └── SiteImage.tsx               # Smart image components
├── lib/
│   └── imageProvider.tsx           # Image management system
├── public/images/
│   ├── heroes/                     # Hero section backgrounds
│   ├── portfolio/
│   │   ├── residential/           # Residential project photos
│   │   └── commercial/            # Commercial project photos
│   ├── team/                      # Team member headshots
│   ├── services/                  # Service illustration photos
│   ├── process/                   # Process step illustrations
│   ├── company/                   # Company facility/equipment
│   ├── blog/                      # Blog post images
│   ├── branding/                  # Logos and brand assets
│   └── placeholders/              # Professional SVG placeholders
├── scripts/
│   └── processImages.js           # Batch import automation
└── staging/
    └── images/                    # Drop generated images here
```

---

## 🎯 Image Requirements Summary

### **Critical Priority Images (15)**
- `hero_home.jpg` - Homepage hero background
- `hero_about.jpg` - About page hero
- `residential_victorian_before.jpg` - Victorian home before
- `residential_victorian_after.jpg` - Victorian home after
- `commercial_office_before.jpg` - Office building before
- `commercial_office_after.jpg` - Office building after
- `team_founder.jpg` - Company founder headshot
- `team_project_manager.jpg` - Project manager headshot
- `team_foreman.jpg` - Lead foreman headshot
- `service_residential.jpg` - Residential service photo
- `service_commercial.jpg` - Commercial service photo
- `facility_exterior.jpg` - Company facility photo
- `crew_action.jpg` - Team working photo
- `logo_primary.svg` - Company logo
- `cert_bbb.svg` - BBB certification badge

### **High Priority Images (15)**
- All remaining hero backgrounds
- Additional portfolio projects
- Key team member photos
- Service illustrations
- Process step photos

### **Medium/Low Priority Images (15)**
- Blog post images
- Additional team photos
- Equipment photos
- Award badges
- Supporting illustrations

---

## 🤖 AI Generation Guidelines

### **Consistent Style Requirements:**
```
Professional photography, high resolution, natural lighting, commercial quality, Denver Colorado setting with mountain views in background where appropriate, clean composition, modern professional aesthetic
```

### **Color Palette:**
- Primary Blue: #1e40af
- Alpine Teal: #0d9488  
- Alpine Purple: #7c3aed
- Clean whites and light grays
- Mountain/roofing themed accents

### **Key Elements to Include:**
- Alpine Peak Roofing branding where appropriate
- Safety equipment in construction photos
- Denver/Colorado mountain setting
- Professional, trustworthy appearance
- Clean, modern aesthetic

---

## 🔧 Technical Specifications

### **File Naming Convention:**
Images MUST be generated with these exact names:

**Heroes:** `hero_home.jpg`, `hero_about.jpg`, `hero_services.jpg`, etc.

**Portfolio:** `residential_victorian_before.jpg`, `residential_victorian_after.jpg`, etc.

**Team:** `team_founder.jpg`, `team_project_manager.jpg`, etc.

**Services:** `service_residential.jpg`, `service_commercial.jpg`, etc.

### **Dimensions & Quality:**
- **Hero Images:** 1920x1080px minimum
- **Portfolio Images:** 1200x800px minimum  
- **Team Photos:** 600x600px minimum
- **Service Images:** 800x600px minimum
- **Logos/Badges:** SVG preferred, PNG fallback
- **Format:** JPEG for photos, SVG for logos/graphics
- **Quality:** High resolution suitable for web optimization

### **Processing Features:**
- Automatic resizing to exact specifications
- WebP generation for modern browsers
- Quality optimization (JPEG 85%, WebP 85%)
- Progressive JPEG encoding
- Lossless PNG compression

---

## 📝 Step-by-Step Workflow

### **Phase 1: Preparation**
1. Review `ImageGenerationPrompts.md` for all image requirements
2. Choose your AI image generation tool (Midjourney, DALL-E, Stable Diffusion)
3. Set up consistent style settings based on guidelines above

### **Phase 2: Image Generation**
1. **Start with Critical Priority images** (15 images)
2. Use the exact prompts provided in `ImageGenerationPrompts.md`
3. **Save with exact filenames** specified in manifest
4. Ensure dimensions meet minimum requirements
5. Review each image for quality and brand consistency

### **Phase 3: Batch Processing**
```bash
# Create staging directory
npm run setup-staging

# Place all generated images in staging/images/
# File structure should look like:
staging/images/
├── hero_home.jpg
├── hero_about.jpg
├── residential_victorian_before.jpg
├── residential_victorian_after.jpg
└── ... (all other images)

# Process all images at once
npm run process-images
```

### **Phase 4: Verification**
1. Check that images appear correctly on website
2. Test both light and dark modes
3. Verify mobile responsiveness
4. Confirm loading performance
5. Remove staging files when satisfied

### **Phase 5: Implementation**
```tsx
// Replace existing placeholder usage with SiteImage components
import SiteImage from '@/components/SiteImage'

// Old way:
<div className="bg-gradient-to-r from-blue-600 to-blue-800">

// New way:
<SiteImage id="hero_home" className="w-full h-64" />
```

---

## 🎨 Image Component Usage

### **Basic Image:**
```tsx
<SiteImage 
  id="team_founder" 
  className="w-32 h-32 rounded-full"
  priority={true}  // For above-the-fold images
/>
```

### **Hero Section:**
```tsx
<HeroImage 
  id="hero_home" 
  className="h-96"
  overlay={true}
  overlayOpacity={0.3}
>
  <div className="text-center text-white">
    <h1>Alpine Peak Roofing</h1>
    <p>Pinnacle of Protection, Peak of Performance</p>
  </div>
</HeroImage>
```

### **Portfolio Before/After:**
```tsx
<PortfolioImagePair 
  beforeId="residential_victorian_before"
  afterId="residential_victorian_after"
  className="mb-8"
  showLabels={true}
/>
```

### **Team Member:**
```tsx
<TeamMemberImage 
  id="team_founder"
  size="large"
  className="mx-auto mb-4"
/>
```

---

## 🔍 Troubleshooting

### **Images Not Loading:**
1. Check filename matches manifest exactly
2. Verify image is in correct directory
3. Ensure image format is supported
4. Check browser console for errors

### **Processing Script Issues:**
```bash
# Install sharp if missing
npm install sharp

# Check staging directory exists
ls -la staging/images/

# Run with verbose output
node scripts/processImages.js
```

### **Quality Issues:**
1. Check source image resolution meets minimums
2. Verify AI generation used correct aspect ratios  
3. Re-generate with adjusted prompts if needed
4. Adjust quality settings in processImages.js

### **Performance Issues:**
1. Use `priority={true}` for above-the-fold images
2. Implement lazy loading for below-the-fold images
3. Use `loading="eager"` sparingly
4. Consider WebP format support

---

## 🚀 Production Deployment

### **Before Going Live:**
- [ ] All critical priority images generated and processed
- [ ] Website tested with real images in light/dark modes
- [ ] Mobile responsiveness verified
- [ ] Loading performance acceptable (< 3s page load)
- [ ] Images committed to git repository
- [ ] Staging directory cleaned up

### **Performance Optimization:**
```tsx
// Preload critical images
<link rel="preload" as="image" href="/images/heroes/hero-home.jpg" />

// Use Next.js Image component features
<SiteImage 
  id="hero_home"
  priority={true}           // For LCP images
  sizes="100vw"            // Responsive sizing
  placeholder="blur"       // Smooth loading
/>
```

---

## 📈 Future Enhancements

### **Planned Features:**
- [ ] Automatic CDN upload integration
- [ ] Image variant generation (thumbnails, social sharing)
- [ ] Automated alt text generation using AI
- [ ] Performance monitoring and optimization alerts
- [ ] Bulk image updating workflow
- [ ] Integration with CMS for dynamic image management

### **Monitoring:**
- Track image loading performance
- Monitor Core Web Vitals impact
- Analyze user engagement with visual content
- A/B test different hero images

---

*For questions or issues with this workflow, refer to the WebsiteToDo.md file or create an issue in the project repository.*