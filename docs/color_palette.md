# Alpine Peak Roofing Color Palette

## Design Hierarchy

Our color system follows a clear visual hierarchy:
- **Brand Navy** - Primary background color
- **Brand Blue** - Cards and elements on navy background  
- **Brand Sky** - Accents within cards and elements
- **Brand Gold** - Highlights and jump-out effects
- **Text Off-White** - Premium text on navy backgrounds

## Brand Colors

### Core Brand Colors
- **Brand Navy**: `#003399` - Very dark blue for deep backgrounds and strong contrast
- **Brand Primary**: `#0033CC` - Primary brand blue for main elements and active states  
- **Brand Blue**: `#0066CC` - Medium brand blue for secondary elements and variations
- **Brand Sky**: `#33CCFF` - Sky blue for highlights and secondary CTAs
- **Brand Gold**: `#FFCC00` - Golden yellow accent for special highlights and emphasis

## Text Colors

### Typography Hierarchy
- **Text Primary**: `#FFFFFF` - Headers, titles, and primary text on dark backgrounds
- **Text Off-White**: `#C7E1FC` - Premium off-white text for enhanced readability on navy backgrounds
- **Text Body**: `#DDDDDD` - Main body text on dark backgrounds
- **Text Secondary**: `#9AB6E0` - Secondary text, labels, and captions
- **Text Muted**: `#596D8C` - Muted text, descriptions, and less important content

## Interactive Colors

### Button and Link States
- **Interactive Default**: `#36B0D9` - Default state for buttons, links, and interactive elements
- **Interactive Hover**: `#33CCFF` - Hover state for interactive elements
- **Interactive Active**: `#2A8CB0` - Active/pressed state for interactive elements

## Status Colors

### Success States
- **Success Light**: `#34D399` - Light success state and hover effects
- **Success Default**: `#00CC00` - Default success color for confirmations and positive feedback
- **Success Dark**: `#059669` - Active success state and pressed buttons

## Accent Colors

### Gold Accents (Highlights & Special Effects)
- **Accent Gold Light**: `#FCD34D` - Light gold for hover states on highlight elements
- **Accent Gold Default**: `#FFCC00` - Default gold for highlights and jump-out effects
- **Accent Gold Dark**: `#D97706` - Dark gold for active states and pressed elements

### Orange Accents (Energy & Urgency)
- **Accent Orange Light**: `#FB923C` - Light orange for hover states on energy elements
- **Accent Orange Default**: `#FF9900` - Default orange for urgency and energy displays
- **Accent Orange Dark**: `#EA580C` - Dark orange for active states and emphasis

## Gradients

### Brand Gradients
- **Brand Header Gradient**: `linear-gradient(to right, #2563EB, #1E40AF)` - Current header gradient used throughout the site
- **Brand Navy to Sky Gradient**: `linear-gradient(to right, #003399, #33CCFF)` - Brand gradient from Brand Navy to Brand Sky
- **Brand Vertical Gradient**: `linear-gradient(to bottom, #0066CC, #003399)` - Vertical gradient from Brand Blue to Brand Navy

## Usage Guidelines

### Design Hierarchy Implementation
1. **Brand Navy (#003399)** - Use as primary background color for main sections
2. **Brand Blue (#0066CC)** - Use for cards and content containers on navy backgrounds
3. **Brand Sky (#33CCFF)** - Use for accents and highlights within blue elements
4. **Brand Gold (#FFCC00)** - Use sparingly for important highlights and call-to-action effects
5. **Text Off-White (#C7E1FC)** - Use for premium text readability on navy backgrounds

### Interactive States
- Always maintain consistent state progression: Default → Hover → Active
- Use proper contrast ratios for accessibility compliance
- Apply state variations consistently across all interactive elements

### Accessibility
- Ensure sufficient contrast between text and background colors
- Test color combinations for color-blind accessibility
- Maintain WCAG 2.1 AA compliance standards

## Implementation Notes

- Colors should be implemented using CSS custom properties for consistency
- Use the exact hex values provided for brand consistency
- Test all color combinations in both light and dark contexts
- Consider implementing color validation in design systems