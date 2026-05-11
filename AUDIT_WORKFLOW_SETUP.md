# Audit Booking Workflow Setup Guide

Email automation infrastructure fully built. All API routes ready. Follow these steps to go live.

---

## 1. Test Email Sending (Verify Brevo API Key)

**Endpoint:** `POST /api/test/email`

Test to confirm Brevo integration working:

```bash
curl -X POST http://localhost:3000/api/test/email \
  -H "Content-Type: application/json" \
  -d '{"to":"your@email.com"}'
```

**Success response:**
```json
{
  "success": true,
  "message": "Test email sent successfully",
  "messageId": "...",
  "recipientEmail": "your@email.com"
}
```

Check inbox for test email. If it arrives, Brevo API key is configured correctly.

---

## 2. Register Calendly Webhook

Your audit booking generates emails automatically via webhook.

**Webhook URL:**
```
https://heyde.studio/api/audit/webhooks/calendly
(or http://localhost:3000/api/audit/webhooks/calendly for local testing)
```

**Steps in Calendly:**
1. Go to Calendly Settings → Integrations → Webhooks
2. Create new webhook
3. Paste URL above
4. Select event: `invitee.created` (booking created)
5. Save

**What happens:**
- User books audit on Calendly
- Calendly POSTs to webhook with booking details
- Webhook extracts invitee name, email, date/time
- Sends confirmation email with questionnaire link

---

## 3. Test Full Booking → Email Flow

### Local Testing:
1. Start dev server: `npm run dev`
2. Open Calendly booking link on your site
3. Book test audit (use test email)
4. Check inbox for confirmation email with questionnaire link
5. Click questionnaire link
6. Fill form, submit
7. Check inbox for follow-up email with personalized findings

### What emails should arrive:

**1. Confirmation Email** (immediately after booking)
- Subject: "Your Free Visual System Audit is Confirmed ✓"
- Contains: booking date/time, questionnaire link with 24h deadline
- Includes: what to expect in 20-min audit, prep notes

**2. Follow-Up Email** (after questionnaire submitted)
- Subject: "[Brand Name]: Your Preliminary Visual System Audit Findings"
- Contains: personalized analysis based on form answers
  - Current visual system state
  - Main production gap
  - System opportunity
  - Investment level & timeline
  - Recommended next steps

---

## 4. Questionnaire Form Page

**URL:** `/audit-questionnaire`

Form captures:
- Brand/company name
- Monthly asset volume (1-10, 11-50, 51-100, 100+)
- Current system status (none, loose guidelines, partial, solid)
- Biggest pain point (text)
- Production timeline (hours to 2+ months)
- Email address

**On submit:**
1. Form validates all fields
2. POSTs to `/api/audit/questionnaire`
3. Server analyzes responses, generates findings
4. Server sends personalized follow-up email
5. User sees success confirmation

**Personalization logic:**
- Asset volume + current system status → investment level recommendation
- Pain point text → identifies gap (speed, consistency, team friction)
- All factors → custom system opportunity description

---

## 5. API Routes Summary

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/audit/webhooks/calendly` | POST | Receives Calendly booking events, sends confirmation |
| `/api/audit/questionnaire` | POST | Receives form, analyzes, sends follow-up |
| `/api/emails/send` | POST | Generic email sender (used by other routes) |
| `/api/test/email` | POST | Test Brevo API key |

---

## 6. Email Templates

Three templates in `lib/emailTemplates/index.ts`:

**Confirmation Email**
- Triggered: Calendly webhook on booking
- Contains: booking details + questionnaire link
- HTML + plain text versions

**Reminder Email** (not yet wired)
- Triggered: 24 hours before audit (needs scheduler)
- Contains: time confirmation + prep tips
- HTML + plain text versions

**Follow-Up Email**
- Triggered: Questionnaire submission
- Contains: personalized findings + next steps
- HTML + plain text versions

---

## 7. Production Deployment Checklist

- [ ] Brevo API key in `.env.local` (done)
- [ ] Calendly signing key in `.env.local` (optional, for verification)
- [ ] `NEXT_PUBLIC_APP_URL` set to production domain
- [ ] Calendly webhook registered with production URL
- [ ] Test end-to-end: book audit → email arrives → submit form → follow-up arrives
- [ ] Sender email `contact@heydestudio.com` verified in Brevo
- [ ] Email templates reviewed for accuracy
- [ ] Link in confirmation email points to correct questionnaire URL

---

## 8. Next: Future Enhancements

**Reminder Emails:**
- Create scheduler (cron job) to send 24h before audit
- Use questionnaire data to personalize

**Database Storage:**
- Store bookings with `clientName`, `email`, `date`, `status`
- Store questionnaire responses with findings
- Track email sends + opens

**Admin Dashboard:**
- View upcoming audits
- See questionnaire responses
- Track email engagement

**Calendly Reminders:**
- Auto-send reminder via webhook 24h before
- Use saved questionnaire data in reminder
