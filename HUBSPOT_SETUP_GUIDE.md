# HubSpot CRM Integration Setup Guide

## Overview
Full HubSpot integration for lead capture, deal tracking, and automated workflows for HEYDE Studio audit booking system.

---

## Part 1: Already Configured ✓

### Custom Contact Fields
- `industry` (enumeration)
- `budget` (enumeration)
- `timeline` (enumeration)
- `project_type` (enumeration)
- `lead_source` (enumeration)

### Contact Sources (Automated)
1. **Website Contact Form** (`/contact`) → Sends confirmation email + syncs contact to HubSpot
2. **Template Download** (`/system-documentation-template`) → Sends template email + syncs contact to HubSpot
3. **Audit Booking** (Calendly webhook) → Creates contact + deal

### API Routes
- `POST /api/lead-capture` - Live website forms: sends Brevo email and syncs HubSpot contact
- `POST /api/contact/submit` - Legacy/direct contact submission to HubSpot
- `POST /api/template-download/submit` - Legacy/direct template form to HubSpot
- `POST /api/audit/webhooks/calendly` - Calendly booking → HubSpot contact + deal
- `PATCH /api/hubspot/deals/update-stage/{dealId}` - Update deal pipeline stage
- `GET /api/hubspot/health` - Internal connection/scope health check

---

## Part 2: Deal Pipeline Setup (Manual in HubSpot UI)

### Recommended Stages for Audit Workflow

| Stage | Name | Trigger | Description |
|-------|------|---------|-------------|
| 1 | **Appointment Scheduled** | Calendly booking confirmed | Initial audit booked |
| 2 | **Qualified to Buy** | Questionnaire submitted | Opportunity analysis complete |
| 3 | **Presentation Scheduled** | Follow-up scheduled | Proposal or system presentation booked |
| 4 | **Decision Maker Bought-In** | Manual update | Decision maker aligned |
| 5 | **Contract Sent** | Proposal/contract sent | System proposal delivered |
| 6 | **Closed Won** | Manual update | Contract signed, project active |
| 7 | **Closed Lost** | Manual update | Declined or not a fit |

### How to Set Up in HubSpot

1. Go to **Settings → Objects → Deals**
2. Click **Pipelines**
3. Create new pipeline: "Visual Systems Pipeline" (or edit default)
4. Add stages in order (HubSpot may use different internal names):
   - `appointmentscheduled`
   - `qualifiedtobuy`
   - `presentationscheduled`
   - `decisionmakerboughtin`
   - `contractsent`
   - `closedwon`
   - `closedlost`

---

## Part 3: Automated Email Workflows (HubSpot Workflows)

### Workflow 1: Welcome Email (New Lead)
**Trigger:** Contact created from website, template, or audit
**Delay:** Send immediately
**Action:** Send email

**Email Content:**
```
Subject: Welcome to HEYDE Studio
Body:
- Introduce HEYDE Studio
- Link to case studies
- Offer free audit link
- Social proof (testimonials)
```

---

### Workflow 2: Audit Confirmation Reminder
**Trigger:** Deal created + dealstage = "appointmentscheduled"
**Delay:** 24 hours before audit
**Action:** Send email

**Email Content:**
```
Subject: Your Visual System Audit is Tomorrow at [TIME]
Body:
- Confirm date/time
- What to prepare (screenshots, brand assets)
- Zoom link
- FAQ about audit process
```

---

### Workflow 3: Post-Audit Follow-up
**Trigger:** Deal moves to "qualifiedtobuy" stage
**Delay:** Send immediately
**Action:** Send email

**Email Content:**
```
Subject: Your Audit Results - [CLIENT_NAME]
Body:
- Personalized analysis (from questionnaire)
- Current state assessment
- System opportunity (what system they need)
- Investment range (timeline, cost)
- Next steps (book 20-min call, get proposal)
```

---

### Workflow 4: No Response Follow-up
**Trigger:** 30 days since last email engagement
**Delay:** Send after 30 days
**Action:** Send email + move deal to "closedlost" if not engaged after this

**Email Content:**
```
Subject: Following Up - Visual System Opportunity for [BRAND]
Body:
- Reference previous audit findings
- Case study of similar company
- New opportunity angle
- Final CTA: schedule 20-min call or pass
```

---

### Workflow 5: Proposal Sent Confirmation
**Trigger:** Manual trigger when proposal sent (or automated via CRM action)
**Delay:** Send immediately
**Action:** Send email + update deal to "contractsent"

**Email Content:**
```
Subject: Your Custom Visual System Proposal
Body:
- Proposal overview
- System description (tailored to their needs)
- Timeline for implementation
- Investment (broken down by phase)
- Next steps: review, ask questions, schedule implementation kick-off
- Link to proposal document
```

---

## Part 4: Deal Stage Automation

### Automatic Stage Transitions

```javascript
// When questionnaire submitted → Move deal to "qualifiedtobuy"
POST /api/hubspot/deals/update-stage
{
  "dealId": "12345",
  "stage": "qualifiedtobuy"
}

// When proposal sent → Move deal to "contractsent"
PATCH /api/hubspot/deals/update-stage
{
  "dealId": "12345",
  "stage": "contractsent"
}

// When contract signed → Move deal to "closedwon"
PATCH /api/hubspot/deals/update-stage
{
  "dealId": "12345",
  "stage": "closedwon"
}
```

---

## Part 5: Dashboard Metrics

### Key Metrics to Track
1. **Audit Booking Rate**: Contacts who schedule audit
2. **Completion Rate**: Audits → Questionnaires completed
3. **Qualification Rate**: Audits → Qualified leads (qualifiedtobuy)
4. **Close Rate**: Qualified → Closed Won
5. **Average Deal Value**: Track if customer segment by budget
6. **Sales Cycle Length**: Days from booking to close

### Creating Dashboard in HubSpot

1. Go to **Reporting → Dashboards**
2. Create new dashboard: "Sales Pipeline"
3. Add cards:
   - **Deal Stage Breakdown**: Pie chart of deals by stage
   - **Deal Value by Stage**: Bar chart of closed deal values
   - **Contact Source**: Where leads come from
   - **Lead Conversion Funnel**: Booking → Qualified → Won

---

## Part 6: Testing Workflow

### End-to-End Test Checklist

- [ ] Visit `/contact` and submit contact form
  - [ ] Contact appears in HubSpot within 10 seconds
  - [ ] `lead_source` = "website"
  - [ ] Confirmation email sent to inbox

- [ ] Visit `/system-documentation-template` and submit
  - [ ] New contact created with industry field
  - [ ] `lead_source` = "template_download"

- [ ] Schedule audit via Calendly
  - [ ] New contact created
  - [ ] New deal created
  - [ ] Deal stage = "appointmentscheduled"
  - [ ] Confirmation email with questionnaire link
  - [ ] Questionnaire link opens and works

- [ ] Complete audit questionnaire
  - [ ] Form submits successfully
  - [ ] Follow-up email received with analysis
  - [ ] (Manual) Update deal to "qualifiedtobuy" in HubSpot
  - [ ] Qualified workflow email triggered

---

## Part 7: Ongoing Maintenance

### Monthly Tasks
- [ ] Review deals in "negotiation" stage
- [ ] Check "closedlost" deals for re-engagement opportunity
- [ ] Review contact database for duplicates
- [ ] Audit email engagement metrics

### Quarterly Tasks
- [ ] Review lead source performance
- [ ] Update proposal template based on feedback
- [ ] Analyze average deal value by industry
- [ ] Test all workflows still triggering correctly

---

## API Reference

### Create Contact
```bash
POST /api/contact/submit
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "Acme Inc",
  "message": "Interested in visual systems"
}
```

### Update Deal Stage
```bash
PATCH /api/hubspot/deals/update-stage
Content-Type: application/json

{
  "dealId": "12345",
  "stage": "qualifiedtobuy"
}
```

Valid stages: `appointmentscheduled`, `qualifiedtobuy`, `presentationscheduled`, `decisionmakerboughtin`, `contractsent`, `closedwon`, `closedlost`

---

## Troubleshooting

### Contact Not Created
- Check `.env.local` has valid `HUBSPOT_ACCESS_TOKEN` or `HUBSPOT_API_KEY`
- Verify email format is valid
- Check HubSpot API response in server logs

### Deal Not Created
- Confirm contact was created first
- Check Calendly webhook is registered
- Verify deal stages exist in HubSpot pipeline

### Workflows Not Triggering
- Check enrollment criteria matches deal/contact properties
- Verify email templates are published
- Check contact/deal meets all trigger conditions

---

## Security Notes
- Never expose `HUBSPOT_API_KEY` in frontend code (kept in `.env.local`)
- All API routes validate input before sending to HubSpot
- Contact forms require valid email format
- Deal updates require valid dealId from HubSpot

---

## Next Steps
1. Set up deal pipeline stages in HubSpot UI
2. Create 5 automated workflows in HubSpot
3. Run end-to-end test (see Part 6)
4. Configure dashboard metrics (Part 5)
5. Train team on CRM usage and manual stage updates
