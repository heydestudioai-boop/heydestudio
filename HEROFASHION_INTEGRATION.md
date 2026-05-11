# HeroFashion Component Integration Guide

## What is HeroFashion?

New premium hero section with:
- **Left side**: Text hierarchy, capabilities list, CTA buttons, stats
- **Right side**: Large featured image with sticky parallax effect
- **Modern aesthetic**: Fashion-forward design inspired by luxury brands
- **Responsive**: Works perfectly on mobile & desktop

---

## How to Use HeroFashion

### Option 1: Replace Existing Hero (Recommended for New Look)

**File to edit:** `app/page.tsx`

**Find this line:**
```tsx
import Hero from '@/components/sections/Hero';
```

**Add new import:**
```tsx
import HeroFashion from '@/components/sections/HeroFashion';
```

**Find this in the component:**
```tsx
<Hero />
```

**Replace with:**
```tsx
<HeroFashion />
```

**Save & refresh** → New hero appears instantly

---

### Option 2: Keep Both Sections

Want to show both old and new hero? Stack them:

```tsx
<HeroFashion />
<Hero />
<Services />
```

Result: HeroFashion displays first, original Hero below, then Services.

---

### Option 3: Conditional Display (Based on Page or Device)

Advanced: Show different hero for mobile vs desktop:

```tsx
{/* Desktop: HeroFashion */}
<div className="hidden md:block">
  <HeroFashion />
</div>

{/* Mobile: Original Hero (cleaner on small screens) */}
<div className="md:hidden">
  <Hero />
</div>
```

---

## Customization Options

### 1. Change Hero Image
In `/components/sections/HeroFashion.tsx`, find:

```tsx
src="/images/s3-solea.jpg"
```

Replace with any image in `/public/images/`:
- `s1-gancho.jpg`
- `s2-problema.jpg`
- `s4-sistema.jpg`
- `s5-eden.jpg`
- `s6-cta.jpg`

### 2. Change Text Content
Find the hardcoded text sections and replace:

```tsx
<h1>
  <span>Visual</span>
  <span>Systems</span>
  <span>for Brands</span>
</h1>
```

Change to your own 3-line headline.

### 3. Change Capabilities List
Find:
```tsx
{[
  'Digital Identity Systems',
  'AI Campaign Architecture',
  'Visual Direction & Art',
  'Motion & Multiformat',
].map(...)}
```

Edit the array items to show different capabilities.

### 4. Change Floating Info Card (Bottom Right)
Find:
```tsx
<p>Current Project</p>
<h3>Soleá</h3>
<p>AI Campaign System — Mediterranean Light</p>
```

Customize with your current project info.

---

## Component Features

✓ **Animations**: Smooth fade-in on load
✓ **Responsive**: Perfect on mobile, tablet, desktop
✓ **Image Loading**: Shows placeholder while loading
✓ **Performance**: Next.js Image optimization included
✓ **Accessibility**: Proper alt text on images
✓ **Interactive**: Hover effects on buttons
✓ **Sticky Image**: Image stays visible when scrolling (desktop)

---

## File Locations

```
HEYDEStudio_Web/
├─ app/
│  └─ page.tsx (import & use HeroFashion here)
├─ components/
│  └─ sections/
│     ├─ HeroFashion.tsx ← NEW COMPONENT
│     ├─ Hero.tsx (original)
│     ├─ Services.tsx
│     └─ ...
└─ public/
   └─ images/
      ├─ s3-solea.jpg ← Used by default
      ├─ s1-gancho.jpg
      └─ ...
```

---

## Testing Checklist

After integrating HeroFashion:

- [ ] Hero section displays
- [ ] Text is readable
- [ ] Image loads without delay
- [ ] Buttons are clickable
- [ ] Stats show correctly (50+, 30+, 12+)
- [ ] Responsive on mobile (375px)
- [ ] Responsive on tablet (768px)
- [ ] Responsive on desktop (1920px+)
- [ ] No console errors (F12 → Console)

---

## Troubleshooting

**Image not showing?**
- Check image filename in HeroFashion.tsx matches `/public/images/`
- Ensure JPEG is optimized (1500px width max, 75% quality)

**Text overlapping on mobile?**
- Already handled with responsive Tailwind classes
- Test in mobile view (F12 → toggle device toolbar)

**Slow loading?**
- Optimize image (target 80-120KB)
- Use [photopea.com](https://www.photopea.com) to resize to 1500px

**Buttons not working?**
- Click handlers are placeholders
- Add real onClick functions in HeroFashion.tsx if needed

---

## Questions?

See also:
- Admin Panel guide: `/app/admin`
- Image optimization: `/IMAGE_OPTIMIZATION_GUIDE.md`
- Main website: `/README.md`

Contact: hello@heydestudio.ai
