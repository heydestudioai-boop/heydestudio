# HubSpot Email Workflow Templates

5 ready-to-use HTML email templates for automated workflows.

## How to Use

1. Open HubSpot → **Automation → Workflows**
2. Create new workflow with appropriate trigger
3. Add **"Send Email"** action
4. Click **"Create Email"**
5. Copy/paste HTML from template file into email editor
6. Replace variables (see below) with actual HubSpot contact properties or hardcoded values

---

## Template 1: Welcome Email (01-welcome.html)

**Trigger:** Contact created
**When:** Send immediately

### Variables to Replace
- `{{firstName}}` → Use HubSpot property: `firstname`
- `{{auditBookingLink}}` → Your audit booking URL: `https://heyde.studio/audit`
- `{{portfolioLink}}` → `https://heyde.studio/#portfolio`
- `{{unsubscribeLink}}` → HubSpot will auto-insert this

---

## Template 2: Audit Reminder (02-audit-reminder.html)

**Trigger:** Deal created + stage = "appointmentscheduled"
**When:** 24 hours before meeting start time

### Variables to Replace
- `{{firstName}}` → `firstname`
- `{{auditDate}}` → Create formula from deal's close date property
- `{{auditTime}}` → Manually set or use deal property if available
- `{{zoomLink}}` → Your Zoom link or template
- `{{rescheduleLink}}` → `https://calendly.com/heyde-studio/audit`

### Setup Notes
- HubSpot doesn't have native "24 hours before meeting" trigger
- **Workaround:** Use delay action: "Send immediately" → Add delay "24 hours before the meeting time"
- Or create deal with `closedate` property set to audit time, then use delay

---

## Template 3: Post-Audit Follow-up (03-post-audit-followup.html)

**Trigger:** Deal moves to "qualifiedtobuy" stage
**When:** Send immediately

### Variables to Replace
- `{{firstName}}` → `firstname`
- `{{brandName}}` → `company`
- `{{currentState}}` → Custom property or hardcoded
- `{{currentStateDescription}}` → Custom property or hardcoded
- `{{bottleneckTitle}}` → From questionnaire analysis
- `{{bottleneckDescription}}` → From questionnaire analysis
- `{{systemOpportunity}}` → From questionnaire analysis
- `{{systemOpportunityDescription}}` → From questionnaire analysis
- `{{investmentLevel}}` → "Low" / "Medium" / "High" from analysis
- `{{timeline}}` → "3-6 weeks" / "1-3 months" / etc.
- `{{deliverables}}` → List what's included
- `{{monthlyAssets}}` → From questionnaire
- `{{timeSavings}}` → "10-15 hours" / calculated from questionnaire
- `{{proposalCallLink}}` → `https://calendly.com/heyde-studio/20min`

### Setup Notes
- This is the most personalized email
- Questionnaire data should map to contact/deal properties
- Consider creating custom properties for analysis results

---

## Template 4: No Response Follow-up (04-no-response-followup.html)

**Trigger:** Deal in "qualifiedtobuy" stage AND no email opens in 30 days
**When:** After 30 days of inactivity

### Variables to Replace
- `{{firstName}}` → `firstname`
- `{{brandName}}` → `company`
- `{{similarCompanyAssets}}` → Example: "40-50 monthly"
- `{{caseStudyCompany}}` → Real case study name: e.g., "Premium Fashion Brand"
- `{{beforeState}}` → "Manual asset creation, 2-3 weeks per campaign"
- `{{afterState}}` → "System-powered assets, 3-4 days per campaign"
- `{{caseStudyResult}}` → "Reduced production time by 80%, improved consistency"
- `{{scheduleCallLink}}` → `https://calendly.com/heyde-studio/20min`
- `{{passLink}}` → Link to automated "unsubscribe" workflow or manual update form

---

## Template 5: Proposal Sent (05-proposal-sent.html)

**Trigger:** Manual trigger OR deal moves to "proposalsenttocontact" stage
**When:** Send immediately

### Variables to Replace
- `{{firstName}}` → `firstname`
- `{{brandName}}` → `company`
- `{{systemDescription}}` → From proposal: "Custom visual system including..."
- `{{investmentAmount}}` → From proposal: e.g., "€25,000"
- `{{timelineMonths}}` → From proposal: e.g., "2"
- `{{kickoffCallLink}}` → `https://calendly.com/heyde-studio/20min`
- `{{callLink}}` → Same or specific call type
- `{{proposalDocumentLink}}` → URL to actual proposal document or attachment

### Setup Notes
- This email is typically sent manually when proposal is ready
- Could be automated if proposal is stored/attached in deal
- Include actual PDF link or ask team to manually attach

---

## HubSpot Properties Reference

Map these contact/deal properties when setting up workflows:

### Contact Properties
- `firstname` - First name
- `email` - Email address
- `company` - Company name
- `industry` - Custom field we created
- `budget` - Custom field we created
- `timeline` - Custom field we created
- `project_type` - Custom field we created
- `lead_source` - Custom field we created
- `lifecyclestage` - Lead/MQL/SQL/Customer

### Deal Properties
- `dealname` - Deal name
- `dealstage` - Current stage
- `closedate` - Expected close date (timestamp)
- `amount` - Deal value
- `description` - Custom notes

---

## Best Practices

1. **Personalization:** Use contact properties `{{firstName}}` not hardcoded names
2. **Links:** Keep links functional and trackable
3. **Mobile:** All templates are responsive HTML, test on mobile
4. **CTA:** Each email has 1 primary CTA, 0-1 secondary
5. **Branding:** All use HEYDE magenta (#d033f0) and black (#000)
6. **Testing:** Send test email to yourself before activating workflow
7. **Tracking:** HubSpot auto-tracks opens/clicks; set up goals if needed

---

## Troubleshooting

**Variables not replacing?**
- Check property names match exactly (case sensitive)
- Property must exist in contact/deal record
- Use `{{firstname}}` not `{{firstName}}` if property is lowercase

**Email looks broken?**
- HubSpot sometimes strips certain CSS; test before deploying
- Use inline styles instead of `<style>` tags if needed
- Email clients vary; test in multiple clients

**Workflow not triggering?**
- Verify trigger condition is correct
- Check contact/deal meets all criteria
- Look at workflow logs for specific errors
- May need to manually trigger first deal to test

---

## Next Steps

1. Set up 5 workflows in HubSpot (see HUBSPOT_SETUP_GUIDE.md)
2. Test each workflow with a test contact/deal
3. Monitor performance: open rates, click rates, conversions
4. Adjust messaging based on what works
5. Train team on when/how to manually advance deals through stages
