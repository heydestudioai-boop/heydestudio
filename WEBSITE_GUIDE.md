# HEYDE Studio Website — Complete User Guide

Welcome to your professional website. This guide covers everything: editing content, managing images, customizing components, and deploying updates.

---

## Quick Start

### 1. Running Website Locally

Open Terminal/PowerShell in your project folder:

```bash
cd D:\Escritorio\HEYDEStudio_Web
npm run dev
```

Visit: **http://localhost:3000**

### 2. Edit Content Without Coding

All website text lives in 2 editable files. No coding knowledge needed.

**English content:** `lib/content/en.ts`
**Spanish content:** `lib/content/es.ts`

Right-click file → Open with Notepad → Edit → Save → Refresh browser

### 3. Change Images

All images in: `public/images/`

- Replace an image with same filename
- Refresh browser
- Website updates instantly

---

## Main Sections

### Admin Panel
**Purpose**: Non-developer instructions for editing website
**Access**: `/app/admin/page.tsx` or visit `http://localhost:3000/admin` when running
**What's inside**: Step-by-step guides, image requirements, syntax examples

### Pages
```
app/
├─ page.tsx          ← Main homepage (imports all sections)
├─ layout.tsx        ← Global layout, Header, Footer, LanguageProvider
└─ admin/
   └─ page.tsx       ← Admin panel with editing instructions
```

### Sections (Components)
```
components/sections/
├─ Hero.tsx              ← Original minimalist hero
├─ HeroFashion.tsx       ← NEW: Premium fashion-style hero
├─ Services.tsx          ← 4-column service grid
├─ Process.tsx           ← 4-step methodology
├─ Portfolio.tsx         ← 2x2 project grid
├─ About.tsx             ← Studio info + stats
├─ CTA.tsx               ← Call-to-action section
└─ Contact.tsx           ← Contact methods
```

### Common Components
```
components/common/
├─ Header.tsx            ← Navigation bar + language toggle
├─ Logo.tsx              ← HEYDE monogram
├─ Footer.tsx            ← Footer with links
└─ LanguageToggle.tsx    ← EN/ES language switcher
```

### Content Files
```
lib/content/
├─ en.ts                 ← All English text
├─ es.ts                 ← All Spanish text
└─ ...
```

---

## Editing Content (Simple Way)

### Step 1: Open Content File
Open in Notepad: `lib/content/en.ts`

Partial example:
```typescript
export const content = {
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#portfolio' },
    // ... more items
  ],
  
  hero: {
    title: 'Visual identity.',
    subtitle: 'Campaign systems.',
    description: 'We don\'t generate images...',
  },
  
  services: {
    title: 'Our Capabilities',
    items: [
      {
        title: 'Digital Identity Systems',
        description: 'Building scalable visual identities...',
      },
      // ... more services
    ],
  },
  // ... more sections
};
```

### Step 2: Find & Replace Text
Use Ctrl+F to search for text you want to change:

```typescript
title: 'Old text here'  →  title: 'New text here'
```

Keep structure intact (don't delete brackets, commas, quotes).

### Step 3: Save & Refresh
- Save file (Ctrl+S)
- Refresh browser (F5)
- Changes appear instantly

### Step 4: Update Spanish Version
Same process in `lib/content/es.ts`

---

## Managing Images

### Current Images
| Filename | Location | Purpose |
|----------|----------|---------|
| s1-gancho.jpg | Portfolio grid | Project card 1 |
| s3-solea.jpg | Portfolio + HeroFashion | Featured project / hero |
| s4-sistema.jpg | Portfolio grid | Project card 2 |
| s5-eden.jpg | Portfolio grid | Project card 3 |
| s6-cta.jpg | CTA section | Background |

All in: `public/images/`

### How to Replace an Image

1. **Optimize new image**:
   - Width: 1500px max
   - Format: JPEG (.jpg)
   - Quality: 75%
   - Use [photopea.com](https://www.photopea.com) (free)

2. **Replace file**:
   - Delete old image
   - Drop new image in `public/images/`
   - Keep same filename

3. **Refresh website**:
   - Browser refresh (F5)
   - Image updates immediately

### Image Requirements
```
Format:    JPEG (.jpg)
Width:     1200–1800px
Quality:   70–80%
File Size: 60–150KB
Naming:    s3-solea.jpg (no spaces, no special chars)
```

See: `IMAGE_OPTIMIZATION_GUIDE.md` for detailed instructions.

---

## Switching Between Hero Styles

### Option 1: Original Minimalist Hero
Current setup. Uses `/components/sections/Hero.tsx`

**Minimalist text + button layout**

### Option 2: Premium Fashion Hero
NEW. Uses `/components/sections/HeroFashion.tsx`

**Two-column layout: text + large image with sticky parallax**

### How to Switch

**Edit:** `app/page.tsx`

**Find:**
```tsx
import Hero from '@/components/sections/Hero';
```

**For Original (Default):**
Just keep Hero imported and used.

**For Fashion:**
```tsx
import HeroFashion from '@/components/sections/HeroFashion';
```

Then use `<HeroFashion />` instead of `<Hero />`

See: `HEROFASHION_INTEGRATION.md` for detailed customization.

---

## Bilingual System

Website automatically switches language when user clicks language toggle.

### How It Works
1. User clicks EN/ES toggle in header
2. Language context updates
3. All text switches instantly (no page reload)
4. Default: English (EN)

### Add Content in Both Languages
In `lib/content/en.ts`:
```typescript
hero: {
  title: 'Visual Identity',
  description: 'We build systems...',
}
```

In `lib/content/es.ts` (matching structure):
```typescript
hero: {
  title: 'Identidad Visual',
  description: 'Construimos sistemas...',
}
```

Keep exact same keys/structure in both files. Only translate the values.

---

## File Structure

```
HEYDEStudio_Web/
├─ app/
│  ├─ page.tsx                 ← Main homepage
│  ├─ layout.tsx               ← Global layout
│  ├─ globals.css              ← Global styles
│  ├─ admin/
│  │  └─ page.tsx              ← Admin panel
│  ├─ api/                      ← (Backend endpoints if needed)
│  └─ favicon.ico
│
├─ components/
│  ├─ common/
│  │  ├─ Header.tsx
│  │  ├─ Logo.tsx
│  │  ├─ Footer.tsx
│  │  └─ LanguageToggle.tsx
│  │
│  └─ sections/
│     ├─ Hero.tsx
│     ├─ HeroFashion.tsx
│     ├─ Services.tsx
│     ├─ Process.tsx
│     ├─ Portfolio.tsx
│     ├─ About.tsx
│     ├─ CTA.tsx
│     └─ Contact.tsx
│
├─ lib/
│  ├─ content/
│  │  ├─ en.ts                 ← English content
│  │  └─ es.ts                 ← Spanish content
│  └─ useLanguage.ts           ← Language context hook
│
├─ public/
│  ├─ images/
│  │  ├─ s1-gancho.jpg
│  │  ├─ s3-solea.jpg
│  │  ├─ s4-sistema.jpg
│  │  ├─ s5-eden.jpg
│  │  └─ s6-cta.jpg
│  └─ favicon.ico
│
├─ node_modules/               ← Dependencies (auto-generated)
│
├─ package.json                ← Project config
├─ tsconfig.json               ← TypeScript config
├─ tailwind.config.ts          ← Tailwind CSS config
├─ next.config.ts              ← Next.js config
│
├─ README.md
├─ WEBSITE_GUIDE.md            ← This file
├─ HEROFASHION_INTEGRATION.md  ← HeroFashion details
└─ IMAGE_OPTIMIZATION_GUIDE.md ← Image requirements
```

---

## Common Edits

### Change Hero Title
**File:** `lib/content/en.ts`
**Find:** `hero: { title: '...' }`
**Edit:** Change title text

### Add New Service
**File:** `lib/content/en.ts`
**Find:** `services: { items: [...] }`
**Add:** New object to items array:
```typescript
{
  title: 'New Service Name',
  description: 'Service description...',
  icon: 'IconName',
}
```

### Update Contact Email
**File:** `lib/content/en.ts`
**Find:** `contact: { email: '...' }`
**Change:** Email address

### Change Portfolio Project
**File:** `lib/content/en.ts`
**Find:** `portfolio: { projects: [...] }`
**Edit:** Project title, description, image filename

**File:** `/components/sections/Portfolio.tsx`
**Update:** Image src path if using different filename

---

## Styling & Customization

### Font
Uses system font stack (San Francisco on Mac, Segoe on Windows, Arial fallback).

To change, edit `app/globals.css`:
```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/your-font.woff2') format('woff2');
}

body {
  font-family: 'CustomFont', system-ui, sans-serif;
}
```

### Colors
Edit Tailwind colors in `tailwind.config.ts`:
```typescript
colors: {
  gray: { ... },
  // Add custom colors
}
```

Then use in components:
```tsx
<button className="bg-customColor-500">...</button>
```

### Layout Spacing
Tailwind utilities control spacing:
```tsx
<div className="px-6 py-12">  {/* padding */}
<section className="mb-16">   {/* margin bottom */}
<div className="gap-8">        {/* grid gap */}
```

See: [Tailwind Docs](https://tailwindcss.com)

---

## Deployment

### To Production (Vercel)
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically on each push

### Custom Server
Build static site:
```bash
npm run build
npm run start
```

Upload `out/` folder to hosting.

---

## Troubleshooting

### Images not showing
- Check filename in component matches `public/images/`
- Ensure image is optimized (JPEG, 1500px width, quality 75%)
- Refresh browser cache (Ctrl+Shift+R)

### Text not changing
- Save file after editing
- Check for syntax errors (missing quotes, commas)
- Refresh browser

### Website not running
```bash
npm install  # Reinstall dependencies
npm run dev  # Try again
```

### Language toggle not working
- Check LanguageToggle.tsx imports useLanguage hook
- Verify language state in Context API

---

## Support & Questions

**Admin Panel Guide:** Visit `/admin` on your running website
**Image Help:** See `IMAGE_OPTIMIZATION_GUIDE.md`
**HeroFashion Details:** See `HEROFASHION_INTEGRATION.md`
**Contact:** hello@heydestudio.ai

---

## Next Steps

1. **Run the website**: `npm run dev`
2. **Visit Admin Panel**: `http://localhost:3000/admin`
3. **Edit content**: Open `lib/content/en.ts` in Notepad
4. **Optimize images**: Use [photopea.com](https://www.photopea.com)
5. **Test changes**: Refresh browser to see updates

---

*HEYDE Studio © 2026 — AI Visual Systems for Modern Brands*
