# HubSpot Workflows Setup - Step by Step

Create 5 automated workflows in HubSpot UI. Copy/paste email templates from `/lib/emailTemplates/workflows/`

---

## Workflow 1: Welcome Email (New Lead)

**File:** `01-welcome.html`

### Steps

1. Go to **HubSpot → Automation → Workflows**
2. Click **"Create workflow"**
3. Choose **"Start from scratch"**
4. Set enrollment trigger:
   - Select **"Contact-based"**
   - Trigger: **"Contact created"**
   - Click **"Create"**

5. Name workflow: **"01 - Welcome Email (New Lead)"**
6. Add action:
   - Click **"+ Add action"**
   - Select **"Send email"**
   - Click **"Create email"**
   - Name: `Welcome to HEYDE`
   - Copy HTML from `01-welcome.html`
   - In HTML editor, find/replace:
     - `{{firstName}}` → Drag "First name" property
     - `{{auditBookingLink}}` → `https://heyde.studio/audit`
     - `{{portfolioLink}}` → `https://heyde.studio/#portfolio`
   - Click **"Save"**

7. Save workflow
8. Set to **"Active"** when ready to test

### Variables Needed
- First name (auto)
- Audit booking URL
- Portfolio URL

---

## Workflow 2: Audit Reminder (24h Before)

**File:** `02-audit-reminder.html`

### Steps

1. Go to **Automation → Workflows**
2. Click **"Create workflow"**
3. Choose **"Start from scratch"**
4. Set enrollment trigger:
   - Select **"Deal-based"**
   - Trigger: **"Deal is created"**
   - Add condition: **Deal stage is "appointmentscheduled"**
   - Click **"Create"**

5. Name: **"02 - Audit Reminder (24h Before)"**
6. Add delay action:
   - Click **"+ Add action"**
   - Select **"Wait"**
   - Choose **"Wait a specific amount of time"**
   - Set to **"24 hours before the deal's close date"**
   - Click **"Save"**

7. Add email action:
   - Click **"+ Add action"**
   - Select **"Send email"**
   - Click **"Create email"**
   - Name: `Audit Reminder`
   - Copy HTML from `02-audit-reminder.html`
   - Find/replace:
     - `{{firstName}}` → Contact's first name (auto)
     - `{{auditDate}}` → Deal's close date (format)
     - `{{auditTime}}` → Deal's close time (hardcode or property)
     - `{{zoomLink}}` → Your Zoom: `https://zoom.us/YOUR_MEETING_ID`
     - `{{rescheduleLink}}` → `https://calendly.com/heyde-studio/audit`
   - Click **"Save"**

8. Save workflow
9. Set to **"Active"**

### Note
- HubSpot doesn't natively support "24 hours before" for custom dates
- Use deal's `closedate` property (set by Calendly webhook)
- Test with upcoming audit booking

---

## Workflow 3: Post-Audit Follow-up

**File:** `03-post-audit-followup.html`

### Steps

1. Go to **Automation → Workflows**
2. Click **"Create workflow"**
3. Choose **"Start from scratch"**
4. Set enrollment trigger:
   - Select **"Deal-based"**
   - Trigger: **"Deal stage changed to"** → select **"qualifiedtobuy"**
   - Click **"Create"**

5. Name: **"03 - Post-Audit Follow-up"**
6. Add action:
   - Click **"+ Add action"**
   - Select **"Send email"**
   - Click **"Create email"**
   - Name: `Your Audit Results`
   - Copy HTML from `03-post-audit-followup.html`
   - Find/replace all variables:
     - `{{firstName}}` → First name (auto)
     - `{{brandName}}` → Company (auto)
     - `{{currentState}}` → Create custom property OR hardcode typical responses
     - `{{currentStateDescription}}` → Same as above
     - `{{bottleneckTitle}}` → Questionnaire-derived property
     - `{{bottleneckDescription}}` → Same
     - `{{systemOpportunity}}` → Analysis property
     - `{{systemOpportunityDescription}}` → Same
     - `{{investmentLevel}}` → "Low" / "Medium" / "High"
     - `{{timeline}}` → From questionnaire
     - `{{deliverables}}` → Standard list
     - `{{monthlyAssets}}` → From questionnaire
     - `{{timeSavings}}` → Calculated (e.g., "10-15 hours/month")
     - `{{proposalCallLink}}` → `https://calendly.com/heyde-studio/20min`
   - Click **"Save"**

7. Save workflow
8. Set to **"Active"**

### Important
- This email pulls data from questionnaire
- **Before activating:** Set up questionnaire form to store responses in contact/deal properties
- May need custom properties for analysis fields
- Consider using deal description field for variable data

---

## Workflow 4: No Response Follow-up (30 days)

**File:** `04-no-response-followup.html`

### Steps

1. Go to **Automation → Workflows**
2. Click **"Create workflow"**
3. Choose **"Start from scratch"**
4. Set enrollment trigger:
   - Select **"Deal-based"**
   - Trigger: **"Deal is created"**
   - Add condition: **Deal stage is "qualifiedtobuy"**
   - Click **"Create"**

5. Name: **"04 - No Response Follow-up (30d)"**
6. Add delay:
   - Click **"+ Add action"**
   - Select **"Wait"**
   - Choose **"Wait a specific amount of time"**
   - Set to **"30 days"**
   - Click **"Save"**

7. Add condition branch:
   - Click **"+ Add action"**
   - Select **"Branch"**
   - Condition: **"Last email was not opened in the last 30 days"**
   - If TRUE: continue to email
   - If FALSE: do nothing

8. Add email (if condition true):
   - Click **"+ Add action"** (on TRUE branch)
   - Select **"Send email"**
   - Click **"Create email"**
   - Name: `One More Thing`
   - Copy HTML from `04-no-response-followup.html`
   - Find/replace:
     - `{{firstName}}` → First name (auto)
     - `{{brandName}}` → Company (auto)
     - `{{similarCompanyAssets}}` → Hardcode example (e.g., "40-50 monthly")
     - `{{caseStudyCompany}}` → Real case study name
     - `{{beforeState}}` → Example before state
     - `{{afterState}}` → Example after state
     - `{{caseStudyResult}}` → Specific result
     - `{{scheduleCallLink}}` → `https://calendly.com/heyde-studio/20min`
     - `{{passLink}}` → Trigger another workflow to mark "closedlost" (or manual)
   - Click **"Save"**

9. Save workflow
10. Set to **"Active"**

### Follow-up Action
- If contact clicks "Pass for Now", manually update deal to "closedlost" OR
- Create separate small workflow triggered by link click to auto-close deal

---

## Workflow 5: Proposal Sent Confirmation

**File:** `05-proposal-sent.html`

### Steps

1. Go to **Automation → Workflows**
2. Click **"Create workflow"**
3. Choose **"Start from scratch"**
4. Set enrollment trigger:
   - Select **"Deal-based"**
   - Trigger: **"Deal stage changed to"** → select **"proposalsenttocontact"**
   - Click **"Create"**

5. Name: **"05 - Proposal Sent"**
6. Add action:
   - Click **"+ Add action"**
   - Select **"Send email"**
   - Click **"Create email"**
   - Name: `Your Custom Proposal`
   - Copy HTML from `05-proposal-sent.html`
   - Find/replace:
     - `{{firstName}}` → First name (auto)
     - `{{brandName}}` → Company (auto)
     - `{{systemDescription}}` → From proposal (hardcode or property)
     - `{{investmentAmount}}` → From proposal (e.g., "€25,000")
     - `{{timelineMonths}}` → From proposal (e.g., "2")
     - `{{kickoffCallLink}}` → `https://calendly.com/heyde-studio/20min`
     - `{{callLink}}` → Same or specific call
     - `{{proposalDocumentLink}}` → Link to proposal PDF OR instructions to attach

   - **Optional:** Attach actual proposal PDF
     - Click **"Add attachment"**
     - Upload proposal file (if stored in HubSpot)
   - Click **"Save"**

7. Save workflow
8. Set to **"Active"** (manual trigger only, or activate when proposal process is live)

### Note
- This workflow is typically **manual trigger** until proposal process is automated
- Can be activated by:
  - Manually moving deal to "proposalsenttocontact" stage
  - OR creating automation that does this when proposal is uploaded

---

## Testing Checklist

### Test Each Workflow

- [ ] **Workflow 1 (Welcome)**
  - [ ] Create test contact via form or manually
  - [ ] Confirm welcome email arrives immediately
  - [ ] Check all links work

- [ ] **Workflow 2 (Audit Reminder)**
  - [ ] Create test deal with stage "appointmentscheduled"
  - [ ] Set close date to tomorrow at 2pm
  - [ ] Wait 24h OR test in draft mode
  - [ ] Confirm reminder arrives 24h before

- [ ] **Workflow 3 (Post-Audit)**
  - [ ] Create/update test deal to "qualifiedtobuy" stage
  - [ ] Confirm follow-up email arrives immediately
  - [ ] Verify all personalization fields populate correctly

- [ ] **Workflow 4 (No Response)**
  - [ ] Create test deal in "qualifiedtobuy"
  - [ ] Don't open workflow email
  - [ ] Wait 30 days OR adjust delay to 5 minutes for testing
  - [ ] Confirm follow-up arrives after waiting period

- [ ] **Workflow 5 (Proposal)**
  - [ ] Create test deal, move to "proposalsenttocontact"
  - [ ] Confirm proposal email arrives immediately
  - [ ] Test proposal document link

---

## Common Issues & Fixes

### Email Not Sending
- Check enrollment trigger is correct
- Verify contact/deal meets all conditions
- Check workflow is "Active" (not Draft)
- Look at workflow logs: **Analytics → View log**

### Variables Not Replacing
- Property name must match exactly (case-sensitive)
- Property must exist in contact/deal record
- Use auto-populated properties (drag from menu) vs hardcoding

### Delay Not Working
- HubSpot delays must be on specific date properties
- For "24h before close date," use deal's `closedate` property
- Test with date set to near future

### Wrong Deal Stage
- Confirm deal stage name matches exactly:
  - `appointmentscheduled` (not "Appointment Scheduled")
  - `qualifiedtobuy` (not "Qualified to Buy")
- Check deal is being created by Calendly webhook with correct stage

### Email Template Issues
- Copy raw HTML (not formatted)
- Remove any extra `<style>` tags if HubSpot complains
- Test email on mobile before deploying

---

## After Workflow Setup

1. **Monitor Performance**
   - Go to each workflow → **Analytics**
   - Track: enrollment rate, email open rate, click rate
   - Adjust messaging based on engagement

2. **Train Team**
   - Show team how to manually move deals between stages
   - Explain when each workflow triggers
   - Document process for proposal stage transition

3. **Automate Stage Transitions (Optional)**
   - Create additional workflows to auto-advance deals when:
     - Questionnaire submitted → Move to "qualifiedtobuy"
     - Proposal viewed → Move to "negotiation"
   - This reduces manual deal management

4. **Set Up Dashboard**
   - Create HubSpot dashboard showing:
     - Deals by stage (pie chart)
     - Email engagement by workflow
     - Conversion funnel (booking → qualified → won)

---

## Quick Reference: HubSpot Property Names

When dragging properties into emails, use these exact names:

**Contact Properties**
- `firstname` - First Name
- `lastname` - Last Name
- `email` - Email Address
- `company` - Company Name
- `phone` - Phone Number
- `industry` - Industry (custom)
- `budget` - Budget (custom)
- `timeline` - Timeline (custom)

**Deal Properties**
- `dealname` - Deal Name
- `dealstage` - Deal Stage
- `closedate` - Close Date
- `amount` - Deal Amount
- `description` - Deal Description

---

## Done!

Once all 5 workflows are active and tested:
✓ Leads auto-receive welcome email
✓ Audit reminders 24h before meeting
✓ Post-audit analysis sent automatically
✓ 30-day follow-up for unengaged leads
✓ Proposal confirmation on stage change

Integration is complete. Next: configure dashboard metrics or train team on CRM usage.
