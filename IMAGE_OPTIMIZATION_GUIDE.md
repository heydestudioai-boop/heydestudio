# Image Optimization Guide for HEYDE Studio Website

## Overview
Images need to be optimized for web to ensure fast loading, proper display, and excellent visual quality.

## Required Specifications

| Property | Value |
|----------|-------|
| **Format** | JPEG (.jpg) |
| **Width** | 1200–1800px (maximum width) |
| **Quality** | 70–80% (JPEG compression) |
| **File Size** | 60–150KB per image |
| **Naming** | lowercase, no spaces, no special characters |

### Examples
✓ **Good:** `s3-solea.jpg`, `hero-image.jpg`, `campaign-2026.jpg`
✗ **Bad:** `S3 — Solea.jpg`, `Hero Image.jpg`, `Campaign_2026_Final_v3.jpg`

---

## How to Optimize Images (Free Online Tool)

### Method 1: Photopea (Recommended)
1. Go to [photopea.com](https://www.photopea.com)
2. Click **File → Open** → select your image
3. Click **Image → Scale Image**
   - Set **Width** to 1500px (height auto-adjusts)
   - Keep aspect ratio checked
4. Click **File → Export As**
   - Choose **JPEG**
   - Set **Quality** to 75%
   - Click **Export**
5. Save with clean filename (e.g., `s3-solea.jpg`)

### Method 2: TinyJPG / Squoosh
**TinyJPG**: [tinyjpg.com](https://tinyjpg.com)
- Upload image
- Download optimized version
- Then resize in Photopea if needed

**Squoosh**: [squoosh.app](https://squoosh.app) (Google's tool)
- Upload image
- Adjust width slider to 1500px
- Set quality to 75%
- Download

### Method 3: Local (If you have Photoshop/GIMP)
Photoshop:
1. Image → Image Size → set width to 1500px
2. File → Export As → JPEG (quality 8/12)

GIMP (free):
1. Image → Scale Image → width 1500px
2. File → Export As → quality 75%

---

## Current Images in Website

All images located in: `public/images/`

| Filename | Used In | Notes |
|----------|---------|-------|
| s1-gancho.jpg | Portfolio | Project 1 |
| s2-problema.jpg | About section | Optional |
| s3-solea.jpg | Portfolio + HeroFashion | Hero image (Soleá project) |
| s4-sistema.jpg | Portfolio | Project 2 |
| s5-eden.jpg | Portfolio | Project 3 |
| s6-cta.jpg | CTA section | Call-to-action background |
| HEYDE_Story_Portfolio.jpg | About section | Optional |

---

## How to Replace an Image

### Step 1: Optimize new image
- Resize to 1500px width
- Compress to quality 75%
- Save as JPEG

### Step 2: Replace file
1. Navigate to `HEYDEStudio_Web/public/images/`
2. Delete old file (or backup first)
3. Place new image with **exact same filename**

### Step 3: Refresh website
- Browser refresh (F5 or Cmd+R)
- Website auto-loads new image

---

## Example: Replacing Soleá Hero Image

**Before:**
```
public/images/s3-solea.jpg (old image)
```

**Process:**
1. Download new hero image
2. Open Photopea → optimize to 1500px, quality 75%
3. Save as `s3-solea.jpg`
4. Replace in `/public/images/`
5. Refresh website

**Result:**
```
public/images/s3-solea.jpg (new image)
```
Website updates instantly.

---

## File Size Target

After optimization, check file size:

```
✓ Good:      s3-solea.jpg = 98 KB
⚠ Borderline: s3-solea.jpg = 160 KB
✗ Too large:  s3-solea.jpg = 250 KB
```

If too large, reduce quality slightly (70%) and re-export.

---

## Why These Specifications?

- **1200–1800px width**: Displays crisp on all devices (mobile to 4K)
- **70–80% quality**: Imperceptible loss to human eye, dramatic file size reduction
- **60–150KB size**: Loads in <1 second on good connection
- **JPEG format**: Best for photographs; PNG for graphics/logos
- **Clean naming**: No special characters (– — ® € etc.) that break URLs

---

## Testing Your Optimized Image

After uploading, check:

1. **Visual Quality**: Does it look sharp and professional?
2. **Load Speed**: Does it load quickly?
3. **Mobile View**: Does it look good on phone (375px width)?
4. **Desktop View**: Does it look good on 4K (2560px width)?

---

## Questions?

Contact: hello@heydestudio.ai

For detailed info, see Admin Panel guide: `/app/admin`
