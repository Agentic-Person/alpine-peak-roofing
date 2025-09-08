# Bluey Color Palette

A professional dark blue theme with clean visual hierarchy and excellent readability.

## Dark Blue Family (Backgrounds & Containers)

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Dark Blue | `#001d39` | Primary backgrounds and deepest containers |
| Dark Blue 2 | `#002246` | Secondary containers and sections |
| Dark Blue 3 | `#1a3a5c` | Cards and elevated elements |
| Dark Blue 4 | `#2d4f73` | Interactive containers and nested content |
| Dark Blue 5 | `#44658a` | Subtle backgrounds and borders |

## Text Hierarchy

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary Text | `#FFFFFF` | Headers, titles, and primary text |
| Secondary Text | `#DDDDDD` | Main content and important text |
| Body Text | `#9ab6e0` | Descriptions, paragraphs, and readable content |
| Muted Text | `#86a4d2` | Labels, metadata, and secondary information |

## Accent Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary Teal | `#36b0d9` | CTAs, links, and primary brand color |
| Success Green | `#10B981` | Success states, trust indicators |
| Purple Deep | `#2D1B69` | Gradient accents and variety |

## CSS Variables

```css
:root {
  /* Background Colors */
  --blox-darkblue: #001d39;
  --blox-darkblue2: #002246;
  --blox-darkblue3: #1a3a5c;
  --blox-darkblue4: #2d4f73;
  --blox-darkblue5: #44658a;
  
  /* Text Colors */
  --blox-text-primary: #FFFFFF;
  --blox-text-secondary: #DDDDDD;
  --blox-text-body: #9ab6e0;
  --blox-text-muted: #86a4d2;
  
  /* Accent Colors */
  --blox-teal: #36b0d9;
  --blox-purple-deep: #2D1B69;
  --success-green: #10B981;
  
  /* Gradients */
  --blox-gradient: linear-gradient(135deg, #2D1B69, #001d39);
  --hero-gradient: linear-gradient(135deg, #1782ac, #053a56);
  --teal-gradient: linear-gradient(135deg, #36b0d9, #1782ac);
  --purple-gradient: linear-gradient(135deg, #2D1B69, #4c1d95);
}
```

## Usage Guidelines

### Background Hierarchy
- Use **Dark Blue** for main page backgrounds
- Use **Dark Blue 2** for primary sections and navigation
- Use **Dark Blue 3** for cards and content containers
- Use **Dark Blue 4** for nested elements and interactive areas
- Use **Dark Blue 5** for subtle borders and dividers

### Text Hierarchy
- Use **Primary Text** for main headlines and important titles
- Use **Secondary Text** for subheadings and primary content
- Use **Body Text** for paragraphs, descriptions, and readable content
- Use **Muted Text** for labels, captions, and less important information

### Interactive Elements
- Use **Primary Teal** for buttons, links, and call-to-action elements
- Use **Success Green** for positive feedback and status indicators
- Apply hover effects by transitioning between background levels

### Gradients
- Use **blox-gradient** for main page backgrounds
- Use **hero-gradient** for hero sections and featured areas
- Use **teal-gradient** for primary buttons and CTAs
- Use **purple-gradient** for accent elements and variety

## Accessibility Notes

- All text colors provide excellent contrast against dark backgrounds
- The progression from darkest to lightest ensures clear visual hierarchy
- Body text (#9ab6e0) is bright enough for comfortable reading
- Muted text (#86a4d2) maintains readability while being appropriately subtle

---

*Created: ${new Date().toLocaleDateString()}*
*Theme: Professional Dark Blue with Clean Hierarchy*