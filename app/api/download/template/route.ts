import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create a simple text/markdown version of the template
    const templateContent = `
HEYDE SYSTEM DOCUMENTATION TEMPLATE
====================================

A practical guide to documenting your visual system

═══════════════════════════════════════════════════════════════════════

PART 1: IDENTITY LOCK WORKSHEET

What traits are immutable? (What never changes)

☐ Face/Avatar (if human)
☐ Color palette
☐ Light direction
☐ Material textures
☐ Scale relationships
☐ Other: ______________________________

Visual Reference:
[Space for client to paste reference image]
_________________________________________________________________
_________________________________________________________________

Written Specification:
"Our identity is characterized by:
• [Trait 1]: [Description]
• [Trait 2]: [Description]
• [Trait 3]: [Description]
• [Trait 4]: [Description]
• [Trait 5]: [Description]"

Identity Lock Checklist:
☐ Visual reference provided
☐ 3-5 immutable traits defined
☐ Written description clear and specific
☐ Team consensus on identity

═══════════════════════════════════════════════════════════════════════

PART 2: RULES & CONSTRAINTS

CORE VARIABLES (What can change, how)

Variable 1: Lighting
Describe permitted variations:
☐ Profile 1: __________________________ (e.g., studio key light)
☐ Profile 2: __________________________ (e.g., golden hour)
☐ Profile 3: __________________________ (e.g., backlit)
Other permitted variations: _________________________________________

Variable 2: Scale/Angle
Describe permitted variations:
☐ Angle 1: __________________________ (e.g., hero/product alone)
☐ Angle 2: __________________________ (e.g., with hand/context)
☐ Angle 3: __________________________ (e.g., flat lay)
Other permitted variations: _________________________________________

Variable 3: Material/Texture (if applicable)
Describe permitted variations:
☐ Option 1: __________________________
☐ Option 2: __________________________
☐ Option 3: __________________________
Other permitted variations: _________________________________________

FORBIDDEN (What's off-limits)
✗ Do not: _________________________________________________________________
✗ Do not: _________________________________________________________________
✗ Do not: _________________________________________________________________
✗ Do not: _________________________________________________________________

═══════════════════════════════════════════════════════════════════════

PART 3: QUALITY CONTROL CHECKLIST

Every output must pass these checks:

IDENTITY CONSISTENCY
☐ Does this still look like the same product/avatar?
☐ Are immutable traits recognizable?
☐ Would a colleague recognize this as "ours"?

TECHNICAL CORRECTNESS
☐ Light is consistent with rules
☐ Scale matches composition constraints
☐ Materials look real (not plastic/fake)

ANATOMICAL CORRECTNESS (if human/avatar)
☐ Proportions are correct
☐ No weird hands/fingers
☐ Poses are natural
☐ Integration with environment feels real

VISUAL QUALITY
☐ Zero AI artifacts (uncanny eyes, impossible curves)
☐ Composition is clean
☐ Lighting is intentional, not accidental
☐ Colors are accurate

BRAND ALIGNMENT
☐ Feels like "our brand" not generic
☐ Tone/mood is consistent
☐ Aesthetic level is premium (not cheap)

APPROVAL GATE
☐ Passes all above → Approved
☐ Fails any → Rejected, regenerate

═══════════════════════════════════════════════════════════════════════

PART 4: GENERATION NOTES

For reproducibility, document:

SEED/REFERENCE:
[If using AI generation]
Seed: __________________________
Reference image: _____________________________________________

PROMPTS:
Base prompt (identity): _______________________________________________
Variable prompt (lighting): ____________________________________________
Art direction: _________________________________________________________________
Negative prompt (what to avoid): _________________________________________

SETTINGS:
Tool used: ☐ Midjourney ☐ Stable Diffusion ☐ DALL-E ☐ Other: __________
Model: __________________________
Guidance scale: __________________________
Other settings: _________________________________________________________________

NOTES:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

═══════════════════════════════════════════════════════════════════════

PART 5: REUSE & EVOLUTION GUIDE

SEASON 2: HOW TO ITERATE

What can change:
✓ Color palette (shift tone, add new colors)
✓ Seasonal context (different location/props)
✓ New products (same system rules, new subject)

What must stay:
✗ Identity lock
✗ Core rules
✗ Quality thresholds

Example:
"Season 1: Terracotta + navy palette. Summer location.
 Season 2: Aqua + sand palette. Beach location. Same rules, different mood."

MAINTENANCE SCHEDULE:

Every 3 months:
☐ Review quality (still consistent?)
☐ Refine rules if needed
☐ Update prompts/settings
☐ Document learnings

WHEN TO REBUILD:

If any of these change significantly, consider new system:
• Brand identity shifts
• Product category completely changes
• Target audience/mood changes
• Aesthetic direction pivots

═══════════════════════════════════════════════════════════════════════

NEXT STEPS

You now have a framework for documenting your visual system.
Building the system takes strategy.

Ready? Schedule a free 20-minute audit:
→ Visit: https://calendly.com/heyde-studio/20min
→ Email: contact@heydestudio.com

═══════════════════════════════════════════════════════════════════════

ABOUT HEYDE STUDIO

Creative direction + AI systems for modern brands.
We build visual systems that lock identity, scale assets, and enable 
production at any speed.

Built from creative direction, photography, cinematography, and system documentation practice.
Obsessed with craft, documentation, and scale.

📧 contact@heydestudio.com
🌐 heydestudio.com
📅 Schedule call: calendly.com/heyde-studio/20min

═══════════════════════════════════════════════════════════════════════

Downloaded from HEYDE Studio
Free System Documentation Template
© 2026 HEYDE Studio
    `;

    // Return as downloadable text file (can be opened in Word or converted to PDF)
    return new NextResponse(templateContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename="heyde-system-documentation-template.txt"',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to generate template' },
      { status: 500 }
    );
  }
}
