# Testimonials Outreach Template

## Email Script

Subject: Can we feature you as a client success story?

---

Hi [Client Name],

We're updating the HEYDE Studio website with client testimonials—real stories from brands we've worked with.

Would you be willing to share a short quote about your experience? It helps potential clients understand the impact of building a documented visual system.

**What we're looking for:**
- A brief quote (1-2 sentences max) about working with HEYDE
- Your name and title
- Your company name
- Optional: Your preference on anonymity

**Example format** (not real):
> "Before HEYDE, visual inconsistency was killing our productivity. In 2 weeks, they built us a system we could scale independently. Game changer."
> — [Name], [Title], [Company]

**How to respond:**
Just reply with your quote + attribution info. Takes 5 minutes.

We'll add it to the homepage and relevant service pages. You're always free to review before we publish.

Thanks for considering!

Oliver
HEYDE Studio

---

## Tracking Sheet

| Client Name | Company | Contact Date | Response | Quote Received | Published |
|-------------|---------|--------------|----------|----------------|-----------|
| [Name]      | [Co]    | [Date]       | ☐ Yes ☐ No | ☐ Yes ☐ No | ☐ Yes ☐ No |

## Testimonials Currently Live

**Homepage Testimonials** (`/lib/testimonials.ts`):
- 3 placeholder testimonials (replace with real client quotes)
- Located in grid section "What Clients Say"

**Component**: `components/sections/Testimonials.tsx`
- 3-column grid (responsive)
- 5-star rating display
- Logo/avatar support
- Mobile-friendly

## Real Client Candidates

1. **Soleá Fragrance**
   - Documented case study on site
   - Real results: 120 assets, €15k, 10 days
   - Strong fit for testimonial

2. **Luz del Tajo** (if they were a project)
   - Known client reference
   - Contact for quote

3. **Other completed projects**
   - Search portfolio for happy clients

## Implementation Notes

- Testimonials stored in `/lib/testimonials.ts`
- Component is responsive (md: breakpoints)
- Styled to match brand (black bg, magenta accents, white text)
- CTA button links to Calendly
- Currently uses emoji logos; replace with actual logos/photos
- Photos should be 80x80px circular or square

## Future Enhancements

- [ ] Video testimonials (30-60 sec)
- [ ] Client photos/avatars
- [ ] Testimonial carousel (scroll on mobile)
- [ ] Per-service testimonials
- [ ] LinkedIn integration (link to client profiles)
- [ ] Trust badges (number of clients, years in business)

## Metrics to Track

- Homepage section CTR
- Conversion rate impact
- Testimonial section scroll depth
- Which testimonials drive most engagement
