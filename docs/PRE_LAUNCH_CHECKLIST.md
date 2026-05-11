# HEYDE Studio Pre-Launch Checklist

Use this checklist once the production domain and hosting environment are ready. The codebase is prepared so launch should be plug and play: add secrets, connect providers, test flows, publish.

## 1. Environment Variables

- [ ] Copy `.env.example` into the hosting provider environment and replace every placeholder.
- [ ] `NEXT_PUBLIC_SITE_URL` points to the final public domain.
- [ ] `NEXT_PUBLIC_APP_URL` points to the final public domain.
- [ ] `INTERNAL_API_TOKEN` is a long random secret and is set in production.
- [ ] `CALENDLY_WEBHOOK_TOKEN` is a long random secret and is set in production.
- [ ] `BREVO_API_KEY` is set.
- [ ] `BREVO_SENDER_EMAIL` is verified in Brevo.
- [ ] `HUBSPOT_API_KEY` is set using a private app token with the minimum required scopes.
- [ ] `NEXT_PUBLIC_GA_ID` matches the final Google Analytics property if analytics is kept active.
- [ ] Run `npm run prelaunch` locally or in CI before publishing.

## 2. Calendly

- [ ] Create or update the Calendly webhook for audit bookings.
- [ ] Point it to `https://YOUR-DOMAIN.com/api/audit/webhooks/calendly?token=CALENDLY_WEBHOOK_TOKEN`.
- [ ] Confirm the webhook sends `invitee.created` events.
- [ ] Book a test audit and verify the confirmation email is sent.
- [ ] Verify the questionnaire link opens and submits correctly.

## 3. Brevo

- [ ] Verify sender domain and sender email.
- [ ] Send a test email through `/api/test/email` using `x-internal-token`.
- [ ] Confirm confirmation and follow-up emails render correctly in Gmail and Outlook.
- [ ] Check SPF, DKIM, and DMARC records.

## 4. HubSpot

- [ ] Confirm private app scopes for contacts and deals.
- [ ] Submit contact and template forms in production.
- [ ] Verify contacts are created with expected properties.
- [ ] Book an audit and verify the contact/deal workflow.
- [ ] Test `/api/hubspot/deals/update-stage` using `x-internal-token`.

## 5. Website QA

- [ ] Test core pages on desktop: home, services, work, pricing, process, resources, blog, contact.
- [ ] Test core pages on mobile.
- [ ] Toggle EN/ES and confirm the full page changes language.
- [ ] Submit all public forms with valid input.
- [ ] Submit invalid form data and verify friendly errors.
- [ ] Confirm `/privacy` and `/terms` are reachable from the footer.
- [ ] Confirm `/sitemap.xml` and `/robots.txt` are reachable.

## 6. SEO And Analytics

- [ ] Check page titles and descriptions in production HTML.
- [ ] Confirm canonical URLs use the final domain.
- [ ] Confirm dynamic blog and case-study pages appear in `/sitemap.xml`.
- [ ] Confirm `/audit-questionnaire` is noindex and blocked in robots.
- [ ] Verify Google Analytics receives page views and Calendly click events.
- [ ] Submit sitemap in Google Search Console.

## 7. Security

- [ ] Confirm security headers are present: CSP, `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Permissions-Policy`.
- [ ] Confirm internal endpoints reject requests without `x-internal-token`.
- [ ] Confirm public forms have rate limiting and validation.
- [ ] Run `npm audit` and document any remaining framework-level advisories.
- [ ] Do not run `npm audit fix --force` if it proposes a major framework downgrade; document the advisory and update Next.js when a compatible patch is available.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.

## 8. Launch

- [ ] Connect final domain.
- [ ] Enable HTTPS.
- [ ] Verify redirects from `www` and non-`www`.
- [ ] Run the full flow once end-to-end.
- [ ] Publish.
- [ ] Monitor logs for the first 24 hours.
