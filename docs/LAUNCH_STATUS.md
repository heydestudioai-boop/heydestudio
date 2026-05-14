# HEYDE Studio Launch Status

Last checked: 2026-05-11

## Ready In Code

- Production build passes with `npm run build`.
- Lint passes with `npm run lint`.
- Core public assets are present: hero video, hero fallback, Oliver portrait, work covers and logos.
- SEO metadata, sitemap, robots and schema are configured.
- Contact, audit, template download, Calendly embed, Brevo and HubSpot integration routes are present.
- Public claim is aligned to `AI Visual Systems for Modern Brands`.

## Required Before Publishing

Add or verify these environment variables in the production host:

- `NEXT_PUBLIC_SITE_URL=https://heydestudio.com`
- `NEXT_PUBLIC_APP_URL=https://heydestudio.com`
- `INTERNAL_API_TOKEN`
- `CALENDLY_WEBHOOK_TOKEN`
- `BREVO_API_KEY`
- `BREVO_SENDER_EMAIL=contact@heydestudio.com`
- `HUBSPOT_ACCESS_TOKEN` or the backwards-compatible `HUBSPOT_API_KEY`
- `NEXT_PUBLIC_GA_ID`

Then configure Calendly webhook:

```txt
https://heydestudio.com/api/audit/webhooks/calendly?token=CALENDLY_WEBHOOK_TOKEN
```

## Known Advisory

`npm audit` reports a moderate PostCSS advisory inside Next.js. The automatic fix currently proposes a major downgrade of Next.js, so do not run `npm audit fix --force`. Keep the advisory documented and update Next.js when a compatible patched release is available.

## Final Local Command

Run this before deployment:

```bash
npm run prelaunch
```

After deployment, complete `docs/PRE_LAUNCH_CHECKLIST.md` against the live domain.
