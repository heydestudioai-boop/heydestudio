export type Language = 'EN' | 'ES';

export const languages: Language[] = ['EN', 'ES'];

export const siteContent = {
  EN: {
    nav: {
      work: 'Work',
      services: 'Services',
      pricing: 'Pricing',
      process: 'Process',
      resources: 'Resources',
      about: 'About',
      faq: 'FAQ',
      audit: 'Free Audit',
      contact: 'Contact',
    },
    footer: {
      aboutTitle: 'About HEYDE Studio',
      aboutText:
        'A studio that builds AI visual systems for brands that\nneed campaign imagery, identity consistency and\nproduction workflows that can scale beyond one delivery.',
      servicesTitle: 'Services',
      companyTitle: 'Company',
      resourcesTitle: 'Resources',
      contactTitle: 'Contact',
      contactEmail: 'contact@heydestudio.com',
      contactPhone: '+34671141135',
      contactPhoneLabel: '+34 671 141 135',
      contactSocial: '@heyde.studio',
      newsletterTitle: 'Get visual system insights',
      newsletterDescription: 'New patterns, case studies, and system breakdowns.',
      newsletterPlaceholder: 'your@email.com',
      newsletterSubmit: 'Subscribe',
      copyright: '© 2026 HEYDE Studio. All rights reserved.',
      services: [
        { label: 'Services', href: '/services' },
        { label: 'Offers', href: '/services#offers' },
        { label: 'Process', href: '/services#process' },
        { label: 'Free Audit', href: '/audit' },
      ],
      company: [
        { label: 'Work', href: '/work' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
      resources: [
        { label: 'Resources', href: '/resources' },
        { label: 'Template', href: '/system-documentation-template' },
        { label: 'Blog', href: '/blog' },
        { label: 'FAQ', href: '/faq' },
      ],
      social: [
        { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com/heyde.studio' },
        { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/heyde-studio' },
        { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/heydestudio' },
        { label: 'Threads', icon: 'threads', href: 'https://www.threads.net/@heyde.studio' },
      ],
      legal: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
    home: {
      heroTitle: 'Visual identity. Campaign systems. Scalable production.',
      heroBody:
        'We turn AI production into a controlled brand asset:\ndirection, identity lock, campaign derivation and\ndocumentation your team can reuse.',
      heroPrimary: 'Explore the System',
      heroSecondary: 'See Our Work',
      whyTitle: 'Direction. System. Sensibility.',
      whyCards: [
        {
          title: 'Direction before output',
          description:
            'We lead the visual process, not just execute it. Every project starts with a clear brief, a defined direction and a system that can extend beyond the first delivery.',
        },
        {
          title: 'The system is the product',
          description:
            'A single image proves nothing. A system that produces consistent images from the same identity lock is the deliverable.',
        },
        {
          title: 'Coherence is enforced',
          description:
            'Visual consistency does not happen by feel. It happens because the rules are defined before execution starts.',
        },
        {
          title: 'Speed needs structure',
          description:
            'AI makes production fast. Structure makes it repeatable. The value is in how little needs to be rebuilt next time.',
        },
      ],
      problemTitle: 'Where production usually breaks,\nwe build the operating layer.',
      problems: [
        {
          title: '1. Rules over guidelines',
          description:
            'We translate brand direction into practical visual rules your team can actually use.',
        },
        {
          title: '2. Workflow over bottlenecks',
          description:
            'We define briefs, references and checkpoints so production moves with less friction.',
        },
        {
          title: '3. Systems over assets',
          description:
            'We create visual logic that extends across formats without drifting.',
        },
        {
          title: '4. Documentation over taste',
          description:
            'We document the decisions behind the image so the system can be reused after handoff.',
        },
        {
          title: '5. Control over speed',
          description:
            'We help teams move faster without weakening the identity.',
        },
      ],
      servicesTitle: 'Five ways to build\nyour visual system.',
      services: [
        {
          title: 'Avatar',
          description: 'A reusable digital asset with identity logic, expressions and usage rules.',
        },
        {
          title: 'Image',
          description: 'A campaign-quality static image, from single asset to editorial pack.',
        },
        {
          title: 'Video / Reel',
          description: 'Motion pieces for social, teasers and campaign moments.',
        },
        {
          title: 'Campaign',
          description: 'A complete campaign logic: concept, image world, formats and derivation rules.',
        },
        {
          title: 'Visual Infrastructure',
          description: 'Your own visual engine: documentation, workflows, training and support.',
        },
      ],
      servicesCta: 'View All Services',
      processTitle: 'How We Work',
      processSteps: ['Discover', 'Design', 'Build', 'Document', 'Deploy'],
      processCta: 'See Our Process',
      workTitle: 'Selected Work',
      projectPlaceholder1: 'Mediterranean light, material permanence and motion-ready fragrance direction.',
      projectPlaceholder2: 'Brutalist architecture, sculptural silhouette and one editorial world ready to scale.',
      workCta: 'View All Projects',
      finalTitle: "Let's build something.",
      finalBody:
        'Send the context.\nWe will help you identify the right starting point, whether it is one asset, a campaign system or full visual infrastructure.',
      finalCta: 'Start a Project',
    },
    servicesPage: {
      heroTitle: 'Products that climb. Systems that compound.',
      heroBody: 'Choose the product and control level you need now. Avatar, image, reel, campaign or infrastructure: every offer scales through documentation, rights, reuse and production depth.',
      whatYouGet: 'What You Get',
      investment: 'Investment',
      timelineInvestment: 'Timeline & Investment',
      services: [
        {
          title: '01. Avatar System',
          body:
            'The reusable digital asset. A canonical avatar with expressions, angles, body logic, usage rights and SOP documentation.',
          features: [
            'Catalog, new or exclusive avatar creation',
            'Canonical expressions and angles',
            'Identity lock and evolution rules',
            'SOP documentation',
            'Commercial usage rights by level',
            'Optional monthly evolution or production',
          ],
          price: 'From €300',
          priceNote: 'Entry catalog avatar to Premium exclusive avatar from €2,500',
          cta: 'Build an Avatar',
        },
        {
          title: '02. Image',
          body:
            'Static photographic render. Product, avatar or context image with campaign-grade finish, from a single asset to editorial image packs.',
          features: [
            'Single image or editorial packs',
            '4K+ resolution',
            'Controlled context, light and mood',
            'Editing, color grading and retouching',
            'Commercial usage included',
            'Documentation by level',
          ],
          price: 'From €300',
          priceNote: 'Single images from €300 to €950. Image packs from €1,800 to €15,200',
          cta: 'Create Image',
        },
        {
          title: '03. Video / Reel',
          body:
            'Motion for social, campaign teasers and product moments. Short reels from simple transitions to cinematic campaign pieces.',
          features: [
            'Reels from 10 to 45 seconds',
            '9:16, 1:1 and 16:9 formats',
            'Editing, pacing and transitions',
            'Sound design and music sync',
            'Color grading unified with campaign',
            'Motion documentation by level',
          ],
          price: 'From €350',
          priceNote: 'Single reels from €350 to €1,500. Video packs from €1,800 to €6,500',
          cta: 'Create Reel',
        },
        {
          title: '04. Campaign',
          body:
            'A choreographed collection of images, reels, concept and direction. Not a sum of assets: one visual narrative with system logic.',
          features: [
            '6 to 40+ images depending on level',
            '1 to 5+ reels depending on level',
            'Campaign concept and visual narrative',
            'Multiformat delivery for social, digital and print',
            'Campaign editing and postproduction',
            'SOP and derivation rules by level',
          ],
          price: 'From €2,200',
          priceNote: 'Campaigns from €2,200 to €9,800 depending on scale',
          cta: 'Build Campaign',
        },
        {
          title: '05. System / Infrastructure',
          body:
            'Your own visual engine. HEYDE builds the methodology inside your team: processes, libraries, prompts, checkpoints, training and support.',
          features: [
            'Workflow and scale audit',
            'Reusable libraries and templates',
            'Operational documentation',
            'Team training sessions',
            'Quality and validation system',
            'Post-launch support and evolution roadmap',
          ],
          price: 'From €8,500',
          priceNote: 'Entry system to Premium infrastructure from €28,000',
          cta: 'Build Infrastructure',
        },
      ],
      comparisonTitle: 'HEYDE Studio vs traditional production',
      comparisonHeaders: ['Factor', 'HEYDE Studio', 'Traditional Agency'],
      comparisonRows: [
        ['Starting point', 'System first', 'Shoot or asset first'],
        ['Consistency', 'Enforced by rules', 'Maintained by memory'],
        ['Documentation', 'SOP and transfer included', 'Often implicit'],
        ['Derivation', 'Built for multiformat', 'Rebuilt per channel'],
        ['Team autonomy', 'Designed to hand off', 'Agency dependency'],
        ['Future campaigns', 'Extend the same logic', 'Start again'],
      ],
      methodTitle: 'The HEYDE Frame',
      methodBody:
        'Our method turns creative direction into an operating system. It protects the identity first, then builds production logic around what the brand needs to repeat.',
      methodSteps: [
        {
          title: 'Direction',
          body: 'We define the commercial objective, visual territory, references and boundaries before production starts.',
        },
        {
          title: 'Identity Lock',
          body: 'We fix the elements that cannot drift: avatar, product, material cues, light, mood and quality criteria.',
        },
        {
          title: 'Production Logic',
          body: 'We build the rules that make outputs coherent across stills, reels, contexts and campaign moments.',
        },
        {
          title: 'Derivation',
          body: 'We adapt the system into formats without restarting: hero, social, editorial, reel, launch and extensions.',
        },
        {
          title: 'Handoff',
          body: 'We document the decisions, SOP, rules and usage notes so the system can keep working after delivery.',
        },
      ],
      limitsTitle: 'What we do not do.',
      limitsBody:
        'Premium systems need boundaries. The work stays valuable because we protect the method, the visual standard and the scope of every project.',
      limits: [
        {
          title: 'No low-cost prompt work',
          body: 'We do not sell random AI images or tool operation as the product. The value is direction, consistency and reusable logic.',
        },
        {
          title: 'No one-off assets without context',
          body: 'Single assets are possible, but they still need a visual rule, a clear use case and a quality threshold.',
        },
        {
          title: 'No unlimited demo expansion',
          body: 'A demo proves viability. If the idea needs to scale, it becomes a scoped project with production rules.',
        },
        {
          title: 'No hype-led campaigns',
          body: 'The work should feel like a brand system, not an AI experiment. The tool stays behind the direction.',
        },
      ],
      faqTitle: 'Service FAQs',
      faqs: [
        {
          question: 'How long does a system take to build?',
          answer:
            'Avatar, image and reel work can start within days. Campaigns usually run 5-21 days. System and infrastructure work starts from 3 weeks depending on scope.',
        },
        {
          question: 'Do we need existing brand guidelines?',
          answer:
            'No. We build from scratch if needed. If you have guidelines, we audit and enhance them.',
        },
        {
          question: 'Can we start small and expand?',
          answer:
            'Absolutely. You can start with an avatar, image, reel or campaign, then extend the same logic into larger infrastructure.',
        },
        {
          question: 'What if our team has no design experience?',
          answer:
            'That is what documentation is for. We include training so your team can become self-sufficient.',
        },
      ],
      finalTitle: 'Choose the right level of system.',
      finalBody: 'We can start with one asset, one campaign or the infrastructure behind your production workflow.',
      finalCta: 'Schedule a Call',
    },
    processPage: {
      heroTitle: 'How We Work',
      heroBody: 'A clear sequence from audit to handoff. We define the rules, build the production logic and document the system so your team can keep using it.',
      steps: [
        {
          step: '01',
          title: 'Discover',
          body: 'We audit your current state. What works? What is broken? Where is the opportunity?',
          details: [
            'Brand audit',
            'Stakeholder interviews',
            'Competitive analysis',
            'Production workflow review',
            'Bottleneck identification',
          ],
        },
        {
          step: '02',
          title: 'Design',
          body: 'We design the system architecture. What rules? What flexibility? What enforces consistency?',
          details: [
            'Visual language definition',
            'Component library design',
            'Tokenization',
            'Usage patterns',
            'Edge case planning',
          ],
        },
        {
          step: '03',
          title: 'Build',
          body: 'We build it in your tools. Figma. Adobe. Code. Whatever you use, it works there.',
          details: [
            'Design system implementation',
            'Component library building',
            'Template creation',
            'Automation setup',
            'Quality assurance',
          ],
        },
        {
          step: '04',
          title: 'Document',
          body: 'We write the playbook. Usage guide. Rules. Examples. Everything your team needs.',
          details: [
            'Brand guidelines',
            'Implementation docs',
            'Team training materials',
            'Troubleshooting guide',
            'Maintenance procedures',
          ],
        },
        {
          step: '05',
          title: 'Deploy',
          body: 'Your team takes it. We support. You own it. Forever.',
          details: [
            'Team training',
            'Knowledge transfer',
            'Handoff meeting',
            '30-day support window',
            'Ongoing maintenance (optional)',
          ],
        },
      ],
      whyTitle: 'Why This Approach?',
      principles: [
        {
          title: 'Systems Thinking',
          body: 'Every decision affects scale, flexibility, and maintainability.',
        },
        {
          title: 'Collaboration',
          body: 'Your team is in every step. Partnership, not mystery handoff.',
        },
        {
          title: 'Real Tools',
          body: 'Built in Figma, Adobe, code, or whatever your team already uses.',
        },
        {
          title: 'Future-Proof',
          body: 'Systems designed to evolve as your brand grows.',
        },
        {
          title: 'Documentation First',
          body: 'The system is incomplete without the guide.',
        },
        {
          title: 'Support Included',
          body: 'We stay available for questions after launch.',
        },
      ],
      timelineTitle: 'Timeline by Service',
      timelines: [
        {
          service: 'Avatar / Image / Reel',
          timeline: '24h-10 days',
          breakdown: [
            ['Brief', '0-1'],
            ['Direction', '1-2'],
            ['Production', '1-5'],
            ['Review', '1-2'],
            ['Delivery', '1'],
          ],
        },
        {
          service: 'Campaign',
          timeline: '5-21 days',
          breakdown: [
            ['Brief + Concept', '1-3'],
            ['Visual System', '2-4'],
            ['Production', '3-10'],
            ['Derivation', '2-5'],
            ['Handoff', '1-2'],
          ],
        },
        {
          service: 'System / Infrastructure',
          timeline: '3-10 weeks',
          breakdown: [
            ['Audit', '1'],
            ['Architecture', '1-2'],
            ['Libraries', '1-3'],
            ['Training', '1-2'],
            ['Support', '3-10'],
          ],
        },
      ],
      weeksLabel: 'Weeks',
      faqTitle: 'Process FAQs',
      faqs: [
        {
          question: 'How much time does our team need to invest?',
          answer:
            '2-4 hours per week during discovery and design. More during build phase. We minimize disruption.',
        },
        {
          question: 'Can we do this in parallel with business-as-usual?',
          answer:
            'Yes. Most clients run the project alongside normal work. There can be timeline trade-offs, but it is doable.',
        },
        {
          question: 'What if we want to change direction mid-project?',
          answer:
            'It happens. We adapt and discuss timeline or budget impact before changing scope.',
        },
        {
          question: 'Do we need a dedicated project manager?',
          answer:
            'Helpful but not required. We manage the work. You just need a single point of contact.',
        },
      ],
      finalTitle: 'From brief to operating system.',
      finalBody: 'If your next campaign needs control, we can define the workflow before production starts.',
      finalCta: 'Schedule a Call',
    },
    contactPage: {
      heroTitle: 'Bring us the bottleneck.',
      heroBody: 'A launch, an avatar, an image pack, a reel, a campaign or a production workflow that needs more control. Tell us what has to move.',
      options: [
        { title: 'Email', value: 'contact@heydestudio.com', link: 'mailto:contact@heydestudio.com' },
        { title: 'WhatsApp', value: '+34 671 141 135', link: 'https://wa.me/34671141135' },
        { title: 'Instagram', value: '@heyde.studio', link: 'https://instagram.com/heyde.studio' },
        { title: 'LinkedIn', value: 'HEYDE Studio', link: 'https://www.linkedin.com/company/heyde-studio' },
      ],
      guaranteeLabel: 'Our Guarantee:',
      guaranteeText: 'We respond to every inquiry within 48 hours. No exceptions.',
      formTitle: 'Project Intake',
      successTitle: 'Message Sent!',
      successText: 'Thanks for reaching out. We will respond within 48 hours.',
      sendAnother: 'Send Another Message',
      labels: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        service: 'Service Interest',
        message: 'Tell us about your project',
      },
      placeholders: {
        name: 'Your name',
        email: 'your@email.com',
        company: 'Your company (optional)',
        service: 'Select a service',
        message: 'What needs to be produced, fixed or systemized?',
      },
      serviceOptions: [
        ['avatar', 'Avatar'],
        ['image', 'Image'],
        ['video-reel', 'Video / Reel'],
        ['campaign', 'Campaign'],
        ['system-infrastructure', 'System / Infrastructure'],
        ['other', 'Other / Not sure yet'],
      ],
      sending: 'Sending...',
      submit: 'Send Message',
      fallbackError: 'An error occurred. Please try again.',
      calendlyTitle: 'Or Schedule a Call',
      finalTitle: 'We will map the next move.',
      finalBody: 'Send the context. We will respond within 48 hours with a practical next step.',
    },
    aboutPage: {
      heroTitle: 'About HEYDE Studio',
      heroBody: 'AI Visual Systems for Modern Brands. We build visual infrastructure for identity, campaigns and scalable creative production.',
      storyTitle: 'Systems, not isolated outputs.',
      story: [
        'HEYDE Studio is an AI Visual Systems Studio. Its work sits between digital identity, visual direction, scalable creative production, avatar systems and campaign architecture.',
        'We do not sell isolated AI images. We design the structure behind them: the identity lock, the campaign rules, the motion logic, the reusable assets and the documentation that keeps everything coherent.',
        'The visible output is only the surface. The real value is control: the ability to repeat a visual language, scale production and keep identity intact without rebuilding from scratch every time.',
      ],
      originTitle: 'What the studio builds.',
      origin: [
        {
          title: 'Digital Identity Systems',
          body: 'Controlled digital identities, avatar structures and reusable visual assets designed to remain consistent across campaigns, social formats and video.',
        },
        {
          title: 'AI Campaign Systems',
          body: 'Campaign worlds built from concept, direction, image language, motion behavior and multiformat production logic.',
        },
        {
          title: 'Visual Infrastructure',
          body: 'Workflows, libraries, playbooks and internal documentation that help brands and teams produce with less drift and more continuity.',
        },
      ],
      beliefsTitle: 'What we believe.',
      beliefs: [
        'The unit of value is the system, not the single image.',
        'The tool is not the product. The product is control, consistency and the ability to scale with taste.',
        'Coherence matters more than spectacle. A quiet image that belongs to the system is stronger than a loud image that drifts.',
        'Every reusable decision deserves structure: rules, constraints, criteria and memory.',
        'AI is most valuable when it serves direction, not when it replaces it.',
      ],
      chooseTitle: 'Why modern brands work with HEYDE.',
      choose: [
        { title: 'System before output', body: 'We define what must stay fixed before multiplying assets, formats or campaign variations.' },
        { title: 'Editorial visual taste', body: 'The direction is cinematic, restrained and brand-conscious, not generic AI content or visual noise.' },
        { title: 'Scalability with identity', body: 'Campaigns can grow across images, reels, social formats and future extensions without losing their visual center.' },
        { title: 'Continuity control', body: 'Characters, products, scenarios and campaign worlds are protected against drift through rules and validation.' },
        { title: 'Method and architecture', body: 'The work does not depend on a single tool. It depends on a documented way of thinking and producing.' },
        { title: 'Lower production friction', body: 'The system reduces the cost, logistics and delay usually attached to repeated visual production.' },
      ],
      teamTitle: 'The Team',
      teamName: 'Oliver Heyde',
      teamRole: 'Founder & Creative Director',
      teamBio:
        'Oliver leads the creative direction, visual criteria and system architecture behind HEYDE Studio. His background connects audiovisual production, color, social media, storytelling and AI-assisted workflows into one operating principle: premium in taste, scalable by system.',
      teamLinkedIn: 'https://www.linkedin.com/in/oliverheyde',
      trustTitle: 'How we work.',
      trust: [
        {
          title: 'Define the system',
          body: 'We clarify the objective, the visual territory, the formats, the variables that can move and the elements that must never break.',
        },
        {
          title: 'Build with control',
          body: 'We produce in modules: identity, scenario, material language, motion, format behavior and validation criteria.',
        },
        {
          title: 'Document what compounds',
          body: 'Every useful rule becomes part of the system, so strong work can be repeated, delegated and extended.',
        },
      ],
      finalTitle: 'Where identity becomes infrastructure.',
      finalBody: 'Send the context. We will help you define what needs to be built: a campaign, a digital identity, a motion system or the infrastructure behind all of it.',
      finalCta: 'Schedule a Call',
    },
    workPage: {
      heroTitle: 'Campaign systems in use.',
      heroBody: 'A working archive of visual systems, campaign worlds and production logic.\nOpen a study, scan the range or move through the campaign frames.',
      projects: [
        {
          name: 'Soleá',
          type: 'AI Campaign System',
          imageLabel: 'Soleá - Luxury Fragrance Brand',
          body:
            'A conceptual fragrance campaign around Mediterranean light, skin memory and material permanence.\nGlass, ceramic, wood and golden liquid scale from editorial stills to motion.',
          href: '/case-studies/solea',
        },
        {
          name: 'eden',
          type: 'AI Editorial Campaign',
          imageLabel: 'Eden - AI Editorial Campaign',
          body:
            'A structured fashion editorial world built through brutalist architecture, sculptural silhouette and cold light.\nFigure, space, styling and atmosphere operate as one campaign system.',
          href: '/case-studies/eden',
        },
        {
          name: 'Motion Studies',
          type: 'AI Motion Showcase',
          imageLabel: 'Motion - Animation System',
          body:
            'A motion-only showcase for campaign reels, teasers and moving image tests.\nBuilt to grow as new campaign motion systems are produced.',
          href: '/case-studies/motion',
        },
      ],
      readCaseStudy: 'View Case Study',
      testimonialsTitle: 'What the work proves.',
      workProof: [
        {
          label: 'Range',
          title: 'Different territories.',
          body: 'Visual systems built across whatever the campaign needs: identity, imagery, avatars, motion and multiformat worlds.',
        },
        {
          label: 'System',
          title: 'From image to system.',
          body: 'A single asset is useful. Reusable visual logic is what keeps production coherent across formats.',
        },
        {
          label: 'Delivery',
          title: 'Built to extend.',
          body: 'Rules, documentation and production logic make each campaign easier to reuse, adapt and scale.',
        },
      ],
      finalTitle: 'Ready to build the system?',
      finalBody: 'Send the context.\nWe will help you identify the right starting point and the level of system your brand actually needs.',
      finalCta: 'Start a Project',
    },
    faqPage: {
      heroTitle: 'Frequently Asked Questions',
      heroBody: 'Everything you need to know about visual systems, our process, and working with us.',
      sections: [
        {
          title: 'General',
          items: [
            {
              question: 'What exactly is a visual system?',
              answer:
                'A visual system is the set of rules, components, standards, and documentation that keeps your brand consistent across touchpoints.',
            },
            {
              question: 'Do we need a visual system?',
              answer:
                'If you produce more than 5-10 assets per month or visual inconsistency costs you time, credibility, or money, yes.',
            },
            {
              question: 'How is this different from brand guidelines?',
              answer:
                'Brand guidelines are often a PDF. A visual system is working infrastructure in your tools, documented and ready to use.',
            },
          ],
        },
        {
          title: 'Pricing & Investment',
          items: [
            {
              question: 'How much does a visual system cost?',
          answer:
            'Entry products start at €300. Campaigns start at €2,200 and system infrastructure starts at €8,500, with final scope confirmed after discovery.',
            },
            {
              question: 'What is included in the price?',
              answer:
                'Design, implementation, documentation, team training, and post-launch support.',
            },
            {
              question: 'Do you offer payment plans?',
              answer:
                'Yes. Larger projects are usually split by phase with clear milestones.',
            },
          ],
        },
        {
          title: 'Timeline & Process',
          items: [
            {
              question: 'How long does this take?',
              answer:
                'Most systems take 6-14 weeks depending on complexity, integrations, and team feedback.',
            },
            {
              question: 'How much time do we need to commit?',
              answer:
                'Usually 2-4 hours per week during discovery and design, with some extra time during handoff.',
            },
            {
              question: 'What happens after delivery?',
              answer:
                'You own the system. We provide support and can continue with optional retainer work.',
            },
          ],
        },
      ],
      finalTitle: 'Still have questions?',
      finalBody: 'Reach out. We will answer anything.',
      contactCta: 'Contact Us',
      callCta: 'Schedule a Call',
    },
    pricingPage: {
      heroTitle: 'Pricing. Products. Control levels.',
      heroBody:
        'Transparent product ladders for visual production and brand systems. Start with a single asset, build a campaign, or install the infrastructure behind repeatable output.',
      recommended: 'Recommended',
      products: [
        {
          name: 'Avatar',
          description: 'Digital character asset. Documented, evolvable, and ready for brand use.',
          tiers: [
            {
              name: 'Entry',
              price: '€300 - €900',
              features: [
                'Pre-created or adapted avatar',
                'Basic SOP documentation',
                '5 expressions x 4 angles',
                'Non-exclusive usage',
                '1 round of changes',
              ],
            },
            {
              name: 'Standard',
              price: '€1,200',
              recommended: true,
              features: [
                'Unique avatar for your brand',
                'Complete SOP documentation',
                '8 expressions x 7 angles',
                '3 looks included',
                '2 rounds of changes',
                'Portfolio usage with permission',
              ],
            },
            {
              name: 'Premium',
              price: '€2,500',
              features: [
                '100% exclusive avatar',
                'Enterprise SOP and visual bible',
                '12+ expressions x 7+ angles',
                '5+ designed looks',
                'Monthly evolution in year 1',
                'Derivative usage rights',
              ],
            },
          ],
        },
        {
          name: 'Image',
          description: 'Static photographic render. One campaign-quality image or a coordinated image pack.',
          tiers: [
            {
              name: 'Entry',
              price: '€300',
              features: [
                '1 static image',
                '4K+ resolution',
                'Catalog avatar or your existing avatar',
                'Simple context or neutral background',
                '1 round of revisions',
                'Delivery in 24-48 hours',
              ],
            },
            {
              name: 'Standard',
              price: '€600',
              recommended: true,
              features: [
                '1 static image with creative direction',
                '4K+ professional finish',
                'Avatar and context coordinated',
                'Premium editing and color grading',
                '2 rounds of revisions',
                'Basic concept documentation',
              ],
            },
            {
              name: 'Premium',
              price: '€950',
              features: [
                '1 hero campaign image',
                'Expert visual direction',
                'Integrated narrative concept',
                'Advanced editing and high-end postproduction',
                '3 rounds of revisions',
                'Image SOP documentation',
              ],
            },
          ],
        },
        {
          name: 'Video / Reel',
          description: 'Campaign motion for reels, stories, teasers and social formats.',
          tiers: [
            {
              name: 'Entry',
              price: '€350',
              features: [
                '1 reel, 10-15 seconds',
                '9:16 or 1:1 format',
                'Avatar transition or simple gesture',
                'Basic editing plus music or sound',
                '1 round of revisions',
                'Delivery in 2-3 days',
              ],
            },
            {
              name: 'Standard',
              price: '€750',
              recommended: true,
              features: [
                '1 reel, 15-30 seconds',
                '9:16, 1:1 or 16:9 formats',
                'Short narrative with multiple shots',
                'Professional editing and sound design',
                'Unified color grading',
                '2 rounds of revisions',
              ],
            },
            {
              name: 'Premium',
              price: '€1,500',
              features: [
                '1 campaign reel, 20-45 seconds',
                'Complete narrative with 3+ scenes',
                'VFX and integrated animation',
                'Cinematic editing and advanced sound design',
                '3+ rounds of revisions',
                'Motion system documentation',
              ],
            },
          ],
        },
        {
          name: 'Campaign',
          description: 'Images, reels, concept and direction choreographed as one visual system.',
          tiers: [
            {
              name: 'Entry',
              price: '€2,200',
              features: [
                '6 images plus 1 reel, 10-15s',
                'Clear visual concept',
                '1 avatar and 1-2 contexts',
                'Basic coherent visual direction',
                '1 round of revisions',
                'Brief and concept documentation',
              ],
            },
            {
              name: 'Standard',
              price: '€5,500',
              recommended: true,
              features: [
                '25 images plus 3 reels',
                'Structured visual concept',
                '1-2 avatars and multiple contexts',
                'Expert visual direction',
                'Multiformat delivery',
                'Campaign SOP documentation',
              ],
            },
            {
              name: 'Premium',
              price: '€9,800',
              features: [
                '40+ images plus 5+ reels',
                'Architectural visual concept',
                '2+ avatars and 3+ contexts',
                'Maison-level campaign editing',
                'Full format adaptation',
                'Advanced SOP and scale rules',
              ],
            },
          ],
        },
        {
          name: 'System / Infrastructure',
          description: 'Your own visual engine: methodology, documentation, training and support inside your team.',
          tiers: [
            {
              name: 'Entry',
              price: '€8,500',
              features: [
                '3-hour needs workshop',
                'Detailed SOP documentation',
                'Initial libraries and prompts',
                '2 team training sessions',
                'Basic tool and workflow setup',
                '3 validated first outputs',
              ],
            },
            {
              name: 'Standard',
              price: '€13,000',
              recommended: true,
              features: [
                '6-hour workflow and scale workshop',
                'Company-grade process documentation',
                'Advanced reusable libraries',
                '3 team training sessions',
                'Technical setup with your stack',
                '10 team-produced outputs with feedback',
              ],
            },
            {
              name: 'Premium',
              price: '€28,000',
              features: [
                '8-hour scale and complexity workshop',
                'Enterprise process documentation',
                'Multi-client reusable libraries',
                'Executive and operational training',
                'Advanced CRM, DAM and approval setup',
                '6-12 month strategic roadmap',
              ],
            },
          ],
        },
      ],
      deliveryTitle: 'Delivery Models',
      models: [
        {
          name: 'Transactional',
          description: 'One-time project. You order, HEYDE produces, and the project closes after delivery.',
          paymentLabel: 'Payment',
          payment: '50% upfront, 50% at delivery',
          timelineLabel: 'Timeline',
          timeline: '24h to 21 days depending on product',
        },
        {
          name: 'Monthly Retainer',
          description: 'Recurring production for teams that need a predictable monthly creative output.',
          paymentLabel: 'Payment',
          payment: 'Monthly in advance',
          timelineLabel: 'Timeline',
          timeline: 'Fixed delivery schedule',
        },
        {
          name: 'Subscription / Access',
          description: 'Ongoing access to licensed avatars, contexts or reusable production resources.',
          paymentLabel: 'Payment',
          payment: 'Monthly subscription',
          timelineLabel: 'Timeline',
          timeline: 'Active while the access model is running',
        },
        {
          name: 'Project + Support',
          description: 'Infrastructure setup followed by a defined support window for validation, training and evolution.',
          paymentLabel: 'Payment',
          payment: 'Project milestones plus support scope',
          timelineLabel: 'Timeline',
          timeline: '3-10 weeks setup with support by scope',
        },
      ],
      finalTitle: 'Ready to Get Started?',
      finalBody:
        'Pick your products, mix tiers, or combine one-time work with monthly production.',
      finalCta: 'Schedule a Call',
    },
    leadForm: {
      labels: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        service: 'Service Interest',
        message: 'Message',
      },
      placeholders: {
        name: 'Your name',
        email: 'your@email.com',
        company: 'Your company (optional)',
        service: 'Select a service',
        message: 'Tell us about your project (optional)',
      },
      services: [
        ['Avatar', 'Avatar'],
        ['Image', 'Image'],
        ['Video / Reel', 'Video / Reel'],
        ['Campaign', 'Campaign'],
        ['System / Infrastructure', 'System / Infrastructure'],
        ['Other', 'Other'],
      ],
      successTitle: 'Success!',
      successText: 'Check your email for your documentation template.',
      errorTitle: 'Error',
      submit: 'Get Your Template',
      sending: 'Sending...',
      privacy:
        'We respect your privacy. Your info is only used to send your template and relevant updates.',
      fallbackError: 'Something went wrong',
    },
    resourcesPage: {
      heroTitle: 'System tools for visual teams.',
      heroBody:
        'A practical starting point for documenting identity, production rules and reusable campaign logic. Built for teams that need more control before they scale.',
      insideTitle: 'Start with the documentation layer.',
      resources: [
        {
          title: 'System Documentation Template',
          body:
            'A working structure for documenting identity, visual rules, formats, quality criteria and handoff.',
          bullets: ['Identity lock', 'Visual rules', 'Format map', 'Handoff notes'],
        },
        {
          title: 'Production Readiness Checklist',
          body:
            'A short audit layer for spotting where visual production breaks before it becomes expensive.',
          bullets: ['Consistency gaps', 'Workflow friction', 'Asset reuse', 'Approval points'],
        },
        {
          title: 'Campaign Format Map',
          body:
            'A way to map one idea into hero images, social crops, reels, stills and future extensions.',
          bullets: ['Hero assets', 'Social crops', 'Motion cues', 'Derivation logic'],
        },
      ],
      captureTitle: 'Get the template',
      captureBody: 'Enter your email and we will send the system documentation template. More resources will be added after launch.',
      trustLines: [
        'No spam. No credit card. Privacy respected.',
        'You may also receive selected updates on visual systems, case studies and production patterns.',
      ],
      whyTitle: 'Why document before scaling?',
      why: [
        {
          title: 'Reduce drift',
          body: 'The more outputs a campaign needs, the more important it becomes to define what cannot change.',
        },
        {
          title: 'Transfer decisions',
          body: 'Built from HEYDE Studio system-first production practice.',
        },
        {
          title: 'Make assets reusable',
          body: 'A documented system makes each campaign easier to extend, adapt and hand over.',
        },
        {
          title: 'Protect quality',
          body: 'Rules, references and checkpoints reduce the gap between direction and production.',
        },
      ],
      finalTitle: 'Need the system behind the assets?',
      finalBody: 'Start with documentation. When the bottleneck is bigger than a template, bring us the context.',
      callCta: 'Schedule a Call',
      processCta: 'See Our Process',
    },
    auditPage: {
      heroTitle: 'Find where your visual production is breaking.',
      heroBody:
        'A focused 20-minute audit for brands that need more consistency, speed and control from their visual production.',
      scheduleCta: 'Schedule your audit',
      workCta: 'See our work',
      introTitle: 'What a visual system audit is.',
      introBody:
        'We look at how your brand currently produces visuals: campaigns, assets, references, templates, workflows and the points where quality starts to drift. Then we identify whether a system would make production clearer, faster and more consistent.',
      summaryCards: [
        ['Time', '20 minutes, with a short pre-audit form so the call starts with context.'],
        ['Cost', 'Free. No hidden fee, no forced follow-up and no generic pitch.'],
        ['Output', 'A clear read on what is working, what is drifting and what should be structured next.'],
        ['Focus', 'Visual consistency, production bottlenecks, reusable assets and campaign scalability.'],
      ],
      questionsTitle: 'The five questions we answer.',
      questions: [
        ['Current state', 'What visual logic already exists, and what is still being improvised?'],
        ['The break point', 'Where does production lose time, consistency, quality or control?'],
        ['System opportunity', 'Which part of the visual process should become reusable infrastructure?'],
        ['Level of effort', 'What would it take to build the right system in time, complexity and scope?'],
        ['Next move', 'What is the most useful next step: template, campaign, identity system or infrastructure?'],
      ],
      discoverTitle: 'What you will leave with.',
      discoveries: [
        ['1. A sharper diagnosis', 'A practical read on the current state of your visual production.'],
        ['2. The main source of drift', 'The point where identity, quality or workflow starts to become inconsistent.'],
        ['3. A system direction', 'The type of structure that would actually help your brand produce better.'],
        ['4. Scope clarity', 'A realistic sense of time, complexity and production depth.'],
        ['5. A next step', 'A template, a campaign system, a digital identity system or a better path for your stage.'],
        ['6. A value read', 'Where a system could reduce friction, protect consistency and make future production easier.'],
      ],
      fitTitle: 'When the audit makes sense.',
      perfectTitle: 'Good fit:',
      perfect: [
        'You produce visual content often',
        'Campaigns take too long to move from idea to execution',
        'Your assets feel inconsistent across channels',
        'You rely on too much manual coordination',
        'You need stronger campaign logic before scaling output',
      ],
      notYetTitle: 'Probably not yet:',
      notYet: [
        'You only need occasional visuals',
        'Consistency is not a current problem',
        'There is no real production bottleneck',
        'You are looking mainly for the lowest-cost image output',
        'You want to test AI without a serious brand or campaign need',
      ],
      unsureLabel: 'Not sure?',
      unsureText:
        'Schedule it anyway. If a full system is not the right move, we will say so and point you toward a lighter path.',
      processTitle: 'How it works.',
      process: [
        ['Book a slot', 'Choose a 20-minute time. The call stays focused and practical.'],
        ['Share context', 'Tell us what you produce, where it slows down and what cannot break visually.'],
        ['Run the audit', 'We map the current logic, the weak points and the system opportunity.'],
        ['Get the readout', 'You receive a concise recommendation and the next step we would take.'],
        ['Decide calmly', 'No pressure. If it makes sense, we define the proper project scope.'],
      ],
      faqTitle: 'Common questions.',
      faqs: [
        ['Is this really free?', 'Yes. No credit card and no scripted follow-up sales call.'],
        ['What if I am not ready to commit?', 'That is fine. The audit exists to clarify whether a system is useful now or later.'],
        ['How long does it take?', '20 minutes. We keep the conversation focused on visual production, consistency and next steps.'],
        ['What if I do not work with you?', 'No problem. You still leave with a clearer read on your production system.'],
      ],
      calendlyTitle: 'Schedule your free audit.',
      calendarFallback: 'Cannot use the calendar? No problem.',
      emailInstead: 'Email us instead',
      finalTitle: 'Start with the point of friction.',
      finalBody: 'Bring the current state of your brand, campaign or workflow. We will help you see whether it needs more assets, or a better system behind them.',
      finalCta: 'Schedule now',
    },
    questionnairePage: {
      successTitle: 'Thank you!',
      successBody:
        'Your questionnaire has been received. We will send you a personalized follow-up email with preliminary findings within 24 hours.',
      nextTitle: 'What happens next:',
      next: [
        'We analyze your answers and current visual production',
        'Send you personalized audit findings',
        'Propose concrete next steps, no pressure',
        'You have 90 days to decide if a system is right for you',
      ],
      backHome: 'Back to Home',
      heroTitle: 'Pre-Audit Questionnaire',
      heroBody: 'Help us understand your visual production challenges. Takes about 5 minutes.',
      labels: {
        brandName: 'Brand / Company Name',
        monthlyAssets: 'Approximately how many visual assets do you produce monthly?',
        currentSystem: 'Do you currently have a visual system or brand guidelines?',
        biggestPain: 'What is your biggest pain point with visual production right now?',
        productionTimeline: 'How long does a typical visual asset take to produce?',
        email: 'Your email',
      },
      placeholders: {
        brandName: 'e.g., Acme Corp',
        biggestPain: 'e.g., It takes weeks to produce consistent assets...',
        email: 'you@company.com',
      },
      select: 'Select an option',
      monthlyOptions: [
        ['1-10', '1-10 assets'],
        ['11-50', '11-50 assets'],
        ['51-100', '51-100 assets'],
        ['100+', '100+ assets'],
      ],
      systemOptions: [
        ['no-system', 'No system in place'],
        ['loose-guidelines', 'Loose guidelines document'],
        ['some-system', 'Partial system'],
        ['solid-system', 'Solid system in place'],
      ],
      timelineOptions: [
        ['hours', 'Hours'],
        ['1-2-days', '1-2 days'],
        ['3-7-days', '3-7 days'],
        ['1-2-weeks', '1-2 weeks'],
        ['2-4-weeks', '2-4 weeks'],
        ['1-2-months', '1-2 months'],
        ['2plus-months', '2+ months'],
      ],
      submit: 'Submit Questionnaire',
      submitting: 'Submitting...',
      helpText: 'Your response will help us customize the audit to your needs.',
      fallbackError: 'Failed to submit questionnaire. Please try again.',
    },
    templatePage: {
      heroTitle: 'Free visual system documentation template.',
      heroBody:
        'A practical starting point for turning visual decisions into a system your team can repeat, audit and extend.',
      insideTitle: 'What is inside.',
      inside: [
        {
          title: 'Identity lock',
          body:
            'Define what cannot drift: visual territory, core assets, material cues, tone, image rules and identity constraints.',
        },
        {
          title: 'Production rules',
          body:
            'A clear checklist for typography, image behavior, motion cues, format usage and quality criteria.',
        },
        {
          title: 'Scalability map',
          body:
            'Plan how the system moves from a few strong assets into campaigns, social formats, motion and recurring production.',
        },
        {
          title: 'Handoff structure',
          body:
            'Organize the system so another person can use it without guessing, improvising or rebuilding the logic.',
        },
      ],
      whyTitle: 'Why use it.',
      why: [
        'Turn scattered visual decisions into usable structure',
        'Protect identity before multiplying formats',
        'Reduce drift between campaigns, assets and teams',
        'Create documentation that supports production',
        'Use it as a starting point, then adapt it to your brand',
      ],
      fitTitle: 'Best for.',
      fit: [
        'Brands building a reusable visual language',
        'Teams producing recurring campaign assets',
        'Founders trying to clarify visual direction',
        'In-house teams auditing inconsistent production',
        'Studios and agencies creating handoff documentation',
      ],
      formTitle: 'Get the template.',
      formBody:
        'Leave your email and we will send the documentation framework. No credit card, no generic nurture sequence.',
      successTitle: 'Check your email',
      successBody: 'Your visual system documentation template has been sent.',
      successHint: 'Look for it in a few seconds. Check spam if needed.',
      nameLabel: 'Name',
      emailLabel: 'Email',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      submit: 'Send me the template',
      sending: 'Sending...',
      privacy:
        'We respect your privacy. Your info is only used to send your template and relevant updates.',
      fallbackError: 'Something went wrong. Try again.',
      networkError: 'Error. Please try again or email contact@heydestudio.com',
      finalTitle: 'A template is a start. A system is the work.',
      finalBody: 'Use the framework to see what needs structure. When the bottleneck is bigger than documentation, bring us the context.',
      finalCta: 'Schedule a discovery call',
    },
    blogPage: {
      heroTitle: 'Notes on visual systems, image and production.',
      heroBody: 'Short essays from HEYDE Studio on campaign logic, AI-assisted production, identity continuity and the systems behind scalable visuals.',
      featuredImage: 'Editorial note',
      readTime: 'min read',
      finalTitle: 'Ready to build your system?',
      finalBody: 'Read the thinking. Then bring us the visual production problem that needs structure.',
      finalCta: 'Schedule a call',
      articleNotFound: 'Article not found',
      articleNotFoundBody: 'The article you are looking for does not exist.',
      backToBlog: 'Back to blog',
      authorBio:
        'Founder and creative director of HEYDE Studio. Oliver writes about visual systems, AI-assisted production, campaign architecture and the discipline required to scale image without losing taste.',
      commentsTitle: 'Comments',
      relatedTitle: 'Related articles',
      learnHow: 'See how we work',
    },
  },
  ES: {
    nav: {
      work: 'Proyectos',
      services: 'Servicios',
      pricing: 'Precios',
      process: 'Proceso',
      resources: 'Recursos',
      about: 'Sobre Nosotros',
      faq: 'FAQ',
      audit: 'Auditoría Gratuita',
      contact: 'Contacto',
    },
    footer: {
      aboutTitle: 'Sobre HEYDE Studio',
      aboutText:
        'Un estudio que construye sistemas visuales con IA para marcas que\nnecesitan campañas, consistencia de identidad y workflows de producción\nque escalan más allá de una entrega.',
      servicesTitle: 'Servicios',
      companyTitle: 'Estudio',
      resourcesTitle: 'Recursos',
      contactTitle: 'Contacto',
      contactEmail: 'contact@heydestudio.com',
      contactPhone: '+34671141135',
      contactPhoneLabel: '+34 671 141 135',
      contactSocial: '@heyde.studio',
      newsletterTitle: 'Recibe insights sobre sistemas visuales',
      newsletterDescription: 'Patrones, casos de estudio y análisis de sistemas.',
      newsletterPlaceholder: 'tu@email.com',
      newsletterSubmit: 'Suscribirse',
      copyright: '© 2026 HEYDE Studio. Todos los derechos reservados.',
      services: [
        { label: 'Servicios', href: '/services' },
        { label: 'Ofertas', href: '/services#offers' },
        { label: 'Proceso', href: '/services#process' },
        { label: 'Auditoría Gratuita', href: '/audit' },
      ],
      company: [
        { label: 'Proyectos', href: '/work' },
        { label: 'Sobre Nosotros', href: '/about' },
        { label: 'Contacto', href: '/contact' },
      ],
      resources: [
        { label: 'Recursos', href: '/resources' },
        { label: 'Plantilla', href: '/system-documentation-template' },
        { label: 'Blog', href: '/blog' },
        { label: 'FAQ', href: '/faq' },
      ],
      social: [
        { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com/heyde.studio' },
        { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/heyde-studio' },
        { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/heydestudio' },
        { label: 'Threads', icon: 'threads', href: 'https://www.threads.net/@heyde.studio' },
      ],
      legal: [
        { label: 'Privacidad', href: '/privacy' },
        { label: 'Términos', href: '/terms' },
      ],
    },
    home: {
      heroTitle: 'Identidad visual. Sistemas de campaña. Producción escalable.',
      heroBody:
        'HEYDE Studio convierte la producción con IA en un activo de marca controlado: dirección, identity lock, derivación de campañas y documentación reutilizable.',
      heroPrimary: 'Explorar El Sistema',
      heroSecondary: 'Ver Proyectos',
      whyTitle: 'Dirección. Sistema. Sensibilidad.',
      whyCards: [
        {
          title: 'Dirección antes que output',
          description:
            'Lideramos el proceso visual, no solo lo ejecutamos. Cada proyecto empieza con un brief claro, una dirección definida y un sistema extensible.',
        },
        {
          title: 'El sistema es el producto',
          description:
            'Una sola imagen no demuestra nada. Un sistema que produce imágenes consistentes desde el mismo identity lock sí es el entregable.',
        },
        {
          title: 'La coherencia se impone',
          description:
            'La consistencia visual no ocurre por intuición. Ocurre porque las reglas se definen antes de empezar la ejecución.',
        },
        {
          title: 'La velocidad necesita estructura',
          description:
            'La IA hace la producción rápida. La estructura la hace repetible. El valor está en lo poco que hay que reconstruir la próxima vez.',
        },
      ],
      problemTitle: 'Donde la producción suele romperse,\nconstruimos la capa operativa.',
      problems: [
        {
          title: '1. Reglas sobre guías',
          description:
            'Traducimos la dirección de marca en reglas visuales prácticas que tu equipo puede usar.',
        },
        {
          title: '2. Workflow sobre bloqueos',
          description:
            'Definimos briefs, referencias y checkpoints para que la producción avance con menos fricción.',
        },
        {
          title: '3. Sistemas sobre assets',
          description:
            'Creamos lógica visual que se extiende a distintos formatos sin perder coherencia.',
        },
        {
          title: '4. Documentación sobre gusto',
          description:
            'Documentamos las decisiones detrás de la imagen para que el sistema se reutilice después del handoff.',
        },
        {
          title: '5. Control sobre velocidad',
          description:
            'Ayudamos al equipo a moverse más rápido sin debilitar la identidad.',
        },
      ],
      servicesTitle: 'Cinco formas de construir\ntu sistema visual.',
      services: [
        {
          title: 'Avatar',
          description: 'Un activo digital reutilizable con lógica de identidad, expresiones y reglas de uso.',
        },
        {
          title: 'Imagen',
          description: 'Una imagen estática de calidad campaña, desde asset individual hasta pack editorial.',
        },
        {
          title: 'Vídeo / Reel',
          description: 'Piezas de motion para social, teasers y momentos de campaña.',
        },
        {
          title: 'Campaña',
          description: 'Una lógica completa de campaña: concepto, mundo visual, formatos y reglas de derivación.',
        },
        {
          title: 'Infraestructura Visual',
          description: 'Tu propio motor visual: documentación, workflows, formación y soporte.',
        },
      ],
      servicesCta: 'Ver Todos Los Servicios',
      processTitle: 'Cómo Trabajamos',
      processSteps: ['Descubrir', 'Diseñar', 'Construir', 'Documentar', 'Implementar'],
      processCta: 'Ver Nuestro Proceso',
      workTitle: 'Proyectos Seleccionados',
      projectPlaceholder1: 'Luz mediterránea, permanencia material y dirección de fragancia preparada para motion.',
      projectPlaceholder2: 'Arquitectura brutalista, silueta escultórica y un mundo editorial listo para escalar.',
      workCta: 'Ver Todos Los Proyectos',
      finalTitle: 'Construyamos algo.',
      finalBody:
        'Envíanos el contexto.\nTe ayudamos a identificar el mejor punto de partida: un asset, un sistema de campaña o infraestructura visual completa.',
      finalCta: 'Empezar Proyecto',
    },
    servicesPage: {
      heroTitle: 'Productos que suben de nivel. Sistemas que componen valor.',
      heroBody: 'Elige el producto y nivel de control que necesitas ahora. Avatar, imagen, reel, campaña o infraestructura: cada oferta escala por documentación, derechos, reutilización y profundidad de producción.',
      whatYouGet: 'Qué Recibes',
      investment: 'Inversión',
      timelineInvestment: 'Timeline E Inversión',
      services: [
        {
          title: '01. Sistema De Avatar',
          body:
            'El activo digital reutilizable. Un avatar canónico con expresiones, ángulos, lógica corporal, derechos de uso y documentación SOP.',
          features: [
            'Avatar de catálogo, nuevo o exclusivo',
            'Expresiones y ángulos canónicos',
            'Identity lock y reglas de evolución',
            'Documentación SOP',
            'Derechos comerciales según nivel',
            'Producción o evolución mensual opcional',
          ],
          price: 'Desde 300€',
          priceNote: 'Avatar Entry de catálogo hasta Avatar Premium exclusivo desde 2.500€',
          cta: 'Construir Avatar',
        },
        {
          title: '02. Imagen',
          body:
            'Render fotográfico estático. Imagen de producto, avatar o contexto con acabado de campaña, desde un asset individual hasta packs editoriales.',
          features: [
            'Imagen individual o packs editoriales',
            'Resolución 4K+',
            'Contexto, luz y mood controlados',
            'Edición, color grading y retoque',
            'Uso comercial incluido',
            'Documentación según nivel',
          ],
          price: 'Desde 300€',
          priceNote: 'Imágenes sueltas de 300€ a 950€. Packs de imagen de 1.800€ a 15.200€',
          cta: 'Crear Imagen',
        },
        {
          title: '03. Vídeo / Reel',
          body:
            'Movimiento para social, teasers de campaña y momentos de producto. Reels cortos desde transiciones simples hasta piezas de campaña cinematic.',
          features: [
            'Reels de 10 a 45 segundos',
            'Formatos 9:16, 1:1 y 16:9',
            'Edición, pacing y transiciones',
            'Sound design y música sincronizada',
            'Color grading unificado con campaña',
            'Documentación de motion según nivel',
          ],
          price: 'Desde 350€',
          priceNote: 'Reels sueltos de 350€ a 1.500€. Packs de vídeo de 1.800€ a 6.500€',
          cta: 'Crear Reel',
        },
        {
          title: '04. Campaña',
          body:
            'Colección coreografiada de imágenes, reels, concepto y dirección. No es una suma de assets: una narrativa visual con lógica de sistema.',
          features: [
            '6 a 40+ imágenes según nivel',
            '1 a 5+ reels según nivel',
            'Concepto y narrativa visual de campaña',
            'Entrega multiformato para social, digital y print',
            'Edición y postproducción de campaña',
            'SOP y reglas de derivación según nivel',
          ],
          price: 'Desde 2.200€',
          priceNote: 'Campañas de 2.200€ a 9.800€ según escala',
          cta: 'Construir Campaña',
        },
        {
          title: '05. Sistema / Infraestructura',
          body:
            'Tu propio motor visual. HEYDE monta la metodología dentro de tu equipo: procesos, librerías, prompts, checkpoints, formación y soporte.',
          features: [
            'Auditoría de workflow y escala',
            'Librerías y templates reutilizables',
            'Documentación operativa',
            'Formación de equipo',
            'Sistema de calidad y validación',
            'Soporte post-launch y roadmap de evolución',
          ],
          price: 'Desde 8.500€',
          priceNote: 'Sistema Entry hasta Infraestructura Premium desde 28.000€',
          cta: 'Construir Infraestructura',
        },
      ],
      comparisonTitle: 'HEYDE Studio vs producción tradicional',
      comparisonHeaders: ['Factor', 'HEYDE Studio', 'Agencia Tradicional'],
      comparisonRows: [
        ['Punto de partida', 'Sistema primero', 'Shoot o asset primero'],
        ['Consistencia', 'Impuesta por reglas', 'Mantenida por memoria'],
        ['Documentación', 'SOP y transferencia incluidas', 'A menudo implícita'],
        ['Derivación', 'Pensado para multiformato', 'Reconstruido por canal'],
        ['Autonomía de equipo', 'Diseñado para transferirse', 'Dependencia de agencia'],
        ['Campañas futuras', 'Extienden la misma lógica', 'Empiezan de nuevo'],
      ],
      methodTitle: 'The HEYDE Frame',
      methodBody:
        'Nuestro método convierte la dirección creativa en un sistema operativo. Primero protege la identidad y después construye la lógica de producción alrededor de lo que la marca necesita repetir.',
      methodSteps: [
        {
          title: 'Direction',
          body: 'Definimos objetivo comercial, territorio visual, referencias y límites antes de empezar a producir.',
        },
        {
          title: 'Identity Lock',
          body: 'Fijamos lo que no puede derivar: avatar, producto, materiales, luz, mood y criterios de calidad.',
        },
        {
          title: 'Production Logic',
          body: 'Construimos reglas para que los outputs sean coherentes entre stills, reels, contextos y momentos de campaña.',
        },
        {
          title: 'Derivation',
          body: 'Adaptamos el sistema a formatos sin reiniciar: hero, social, editorial, reel, launch y extensiones.',
        },
        {
          title: 'Handoff',
          body: 'Documentamos decisiones, SOP, reglas y notas de uso para que el sistema siga funcionando después de la entrega.',
        },
      ],
      limitsTitle: 'Lo que no hacemos.',
      limitsBody:
        'Los sistemas premium necesitan límites. El trabajo mantiene su valor porque protegemos el método, el estándar visual y el alcance de cada proyecto.',
      limits: [
        {
          title: 'No hacemos prompts low-cost',
          body: 'No vendemos imágenes aleatorias con IA ni operación de herramienta como producto. El valor está en dirección, consistencia y lógica reusable.',
        },
        {
          title: 'No hacemos assets aislados sin contexto',
          body: 'Un asset único es posible, pero necesita regla visual, caso de uso claro y un umbral de calidad definido.',
        },
        {
          title: 'No ampliamos demos sin marco',
          body: 'Una demo valida viabilidad. Si la idea necesita escalar, pasa a ser un proyecto con alcance y reglas de producción.',
        },
        {
          title: 'No hacemos campañas guiadas por hype',
          body: 'El trabajo debe sentirse como sistema de marca, no como experimento de IA. La herramienta queda detrás de la dirección.',
        },
      ],
      faqTitle: 'FAQs De Servicios',
      faqs: [
        {
          question: '¿Cuánto tarda construir un sistema?',
          answer:
            'Avatar, imagen y reel pueden empezar en días. Las campañas suelen ir de 5 a 21 días. Sistema e infraestructura empiezan desde 3 semanas según alcance.',
        },
        {
          question: '¿Necesitamos brand guidelines existentes?',
          answer:
            'No. Podemos construir desde cero. Si ya tienes guías, las auditamos y las convertimos en sistema.',
        },
        {
          question: '¿Podemos empezar pequeño y ampliar?',
          answer:
            'Sí. Puedes empezar con avatar, imagen, reel o campaña y extender la misma lógica hacia una infraestructura mayor.',
        },
        {
          question: '¿Qué pasa si nuestro equipo no tiene experiencia en diseño?',
          answer:
            'Para eso existe la documentación. Incluimos formación para que el equipo sea autónomo.',
        },
      ],
      finalTitle: 'Elige el nivel correcto de sistema.',
      finalBody: 'Podemos empezar con un asset, una campaña o la infraestructura detrás de tu workflow de producción.',
      finalCta: 'Agendar Una Llamada',
    },
    processPage: {
      heroTitle: 'Cómo Trabajamos',
      heroBody: 'Una secuencia clara desde auditoría hasta handoff. Definimos reglas, construimos lógica de producción y documentamos el sistema para que tu equipo pueda seguir usándolo.',
      steps: [
        {
          step: '01',
          title: 'Descubrir',
          body: 'Auditamos tu estado actual. ¿Qué funciona? ¿Qué está roto? ¿Dónde está la oportunidad?',
          details: [
            'Auditoría de marca',
            'Entrevistas con stakeholders',
            'Análisis competitivo',
            'Revisión del workflow de producción',
            'Identificación de cuellos de botella',
          ],
        },
        {
          step: '02',
          title: 'Diseñar',
          body: 'Diseñamos la arquitectura del sistema. Qué reglas, qué flexibilidad y qué garantiza consistencia.',
          details: [
            'Definición del lenguaje visual',
            'Diseño de librería de componentes',
            'Tokenización',
            'Patrones de uso',
            'Planificación de casos límite',
          ],
        },
        {
          step: '03',
          title: 'Construir',
          body: 'Lo construimos en tus herramientas. Figma. Adobe. Código. Donde tu equipo trabaja.',
          details: [
            'Implementación del sistema de diseño',
            'Construcción de componentes',
            'Creación de plantillas',
            'Setup de automatización',
            'Control de calidad',
          ],
        },
        {
          step: '04',
          title: 'Documentar',
          body: 'Escribimos el playbook. Guía de uso, reglas, ejemplos y todo lo que tu equipo necesita.',
          details: [
            'Brand guidelines',
            'Documentación de implementación',
            'Materiales de formación',
            'Guía de resolución de problemas',
            'Procedimientos de mantenimiento',
          ],
        },
        {
          step: '05',
          title: 'Implementar',
          body: 'Tu equipo lo recibe. Nosotros damos soporte. Tú lo posees. Para siempre.',
          details: [
            'Formación de equipo',
            'Transferencia de conocimiento',
            'Reunión de handoff',
            '30 días de soporte',
            'Mantenimiento opcional',
          ],
        },
      ],
      whyTitle: 'Por Qué Este Enfoque',
      principles: [
        {
          title: 'Pensamiento Sistémico',
          body: 'Cada decisión afecta a escala, flexibilidad y mantenimiento.',
        },
        {
          title: 'Colaboración',
          body: 'Tu equipo participa en cada paso. Partnership, no handoff misterioso.',
        },
        {
          title: 'Herramientas Reales',
          body: 'Construido en Figma, Adobe, código o lo que tu equipo ya use.',
        },
        {
          title: 'Preparado Para Evolucionar',
          body: 'Sistemas diseñados para crecer con tu marca.',
        },
        {
          title: 'Documentación Primero',
          body: 'El sistema está incompleto sin la guía.',
        },
        {
          title: 'Soporte Incluido',
          body: 'Seguimos disponibles para preguntas después del lanzamiento.',
        },
      ],
      timelineTitle: 'Timeline Por Servicio',
      timelines: [
        {
          service: 'Avatar / Imagen / Reel',
          timeline: '24h-10 días',
          breakdown: [
            ['Brief', '0-1'],
            ['Dirección', '1-2'],
            ['Producción', '1-5'],
            ['Revisión', '1-2'],
            ['Entrega', '1'],
          ],
        },
        {
          service: 'Campaña',
          timeline: '5-21 días',
          breakdown: [
            ['Brief + Concepto', '1-3'],
            ['Sistema visual', '2-4'],
            ['Producción', '3-10'],
            ['Derivación', '2-5'],
            ['Handoff', '1-2'],
          ],
        },
        {
          service: 'Sistema / Infraestructura',
          timeline: '3-10 semanas',
          breakdown: [
            ['Auditoría', '1'],
            ['Arquitectura', '1-2'],
            ['Librerías', '1-3'],
            ['Formación', '1-2'],
            ['Soporte', '3-10'],
          ],
        },
      ],
      weeksLabel: 'Semanas',
      faqTitle: 'FAQs Del Proceso',
      faqs: [
        {
          question: '¿Cuánto tiempo debe invertir nuestro equipo?',
          answer:
            '2-4 horas por semana durante descubrimiento y diseño. Algo más durante construcción. Minimizamos interrupciones.',
        },
        {
          question: '¿Podemos hacerlo en paralelo al trabajo diario?',
          answer:
            'Sí. La mayoría de clientes lo hacen junto a su operación normal. Puede afectar al timeline, pero es viable.',
        },
        {
          question: '¿Qué pasa si queremos cambiar dirección a mitad de proyecto?',
          answer:
            'Puede pasar. Nos adaptamos y discutimos impacto en timeline o presupuesto antes de cambiar alcance.',
        },
        {
          question: '¿Necesitamos un project manager dedicado?',
          answer:
            'Ayuda, pero no es obligatorio. Nosotros gestionamos el trabajo. Solo necesitas un punto de contacto.',
        },
      ],
      finalTitle: 'Del brief al sistema operativo.',
      finalBody: 'Si tu próxima campaña necesita control, podemos definir el workflow antes de producir.',
      finalCta: 'Agendar Una Llamada',
    },
    contactPage: {
      heroTitle: 'Tráenos el cuello de botella.',
      heroBody: 'Un lanzamiento, un avatar, un pack de imágenes, un reel, una campaña o un workflow de producción que necesita más control. Cuéntanos qué tiene que moverse.',
      options: [
        { title: 'Email', value: 'contact@heydestudio.com', link: 'mailto:contact@heydestudio.com' },
        { title: 'WhatsApp', value: '+34 671 141 135', link: 'https://wa.me/34671141135' },
        { title: 'Instagram', value: '@heyde.studio', link: 'https://instagram.com/heyde.studio' },
        { title: 'LinkedIn', value: 'HEYDE Studio', link: 'https://www.linkedin.com/company/heyde-studio' },
      ],
      guaranteeLabel: 'Nuestra Garantía:',
      guaranteeText: 'Respondemos a cada mensaje en menos de 48 horas. Sin excepciones.',
      formTitle: 'Entrada De Proyecto',
      successTitle: 'Mensaje Enviado',
      successText: 'Gracias por escribirnos. Responderemos en menos de 48 horas.',
      sendAnother: 'Enviar Otro Mensaje',
      labels: {
        name: 'Nombre',
        email: 'Email',
        company: 'Empresa',
        service: 'Servicio De Interés',
        message: 'Cuéntanos Sobre Tu Proyecto',
      },
      placeholders: {
        name: 'Tu nombre',
        email: 'tu@email.com',
        company: 'Tu empresa (opcional)',
        service: 'Selecciona un servicio',
        message: '¿Qué hay que producir, corregir o convertir en sistema?',
      },
      serviceOptions: [
        ['avatar', 'Avatar'],
        ['image', 'Imagen'],
        ['video-reel', 'Vídeo / Reel'],
        ['campaign', 'Campaña'],
        ['system-infrastructure', 'Sistema / Infraestructura'],
        ['other', 'Otro / Todavía no estoy seguro'],
      ],
      sending: 'Enviando...',
      submit: 'Enviar Mensaje',
      fallbackError: 'Ha ocurrido un error. Inténtalo de nuevo.',
      calendlyTitle: 'O Agenda Una Llamada',
      finalTitle: 'Mapeamos el siguiente movimiento.',
      finalBody: 'Envíanos el contexto. Respondemos en menos de 48 horas con un próximo paso práctico.',
    },
    aboutPage: {
      heroTitle: 'Sobre HEYDE Studio',
      heroBody: 'AI Visual Systems for Modern Brands. Construimos infraestructura visual para identidad, campañas y producción creativa escalable.',
      storyTitle: 'Sistemas, no outputs aislados.',
      story: [
        'HEYDE Studio es un AI Visual Systems Studio. Trabaja en la intersección entre identidad digital, dirección visual, producción creativa escalable, sistemas de avatar y arquitectura de campaña.',
        'No vendemos imágenes sueltas con IA. Diseñamos la estructura que las sostiene: identity lock, reglas de campaña, lógica motion, assets reutilizables y documentación para mantener coherencia.',
        'El output visible es solo la superficie. El valor real es el control: repetir un lenguaje visual, escalar producción y proteger la identidad sin empezar de cero cada vez.',
      ],
      originTitle: 'Qué construye el estudio.',
      origin: [
        {
          title: 'Digital Identity Systems',
          body: 'Identidades digitales controladas, estructuras de avatar y activos visuales reutilizables diseñados para mantener consistencia en campañas, social y vídeo.',
        },
        {
          title: 'AI Campaign Systems',
          body: 'Mundos de campaña construidos desde concepto, dirección, lenguaje de imagen, comportamiento motion y lógica de producción multiformato.',
        },
        {
          title: 'Visual Infrastructure',
          body: 'Workflows, librerías, playbooks y documentación interna para ayudar a marcas y equipos a producir con menos deriva y más continuidad.',
        },
      ],
      beliefsTitle: 'Lo que creemos.',
      beliefs: [
        'La unidad de valor es el sistema, no la imagen suelta.',
        'La herramienta no es el producto. El producto es control, consistencia y capacidad de escalar con criterio.',
        'La coherencia importa más que el espectáculo. Una imagen sobria que pertenece al sistema es más fuerte que una imagen llamativa que deriva.',
        'Toda decisión reutilizable merece estructura: reglas, límites, criterios y memoria.',
        'La IA tiene más valor cuando sirve a la dirección, no cuando la sustituye.',
      ],
      chooseTitle: 'Por qué las marcas modernas trabajan con HEYDE.',
      choose: [
        { title: 'Sistema antes que output', body: 'Definimos qué debe permanecer fijo antes de multiplicar assets, formatos o variaciones de campaña.' },
        { title: 'Criterio editorial', body: 'La dirección es cinematográfica, contenida y consciente de marca, no contenido IA genérico ni ruido visual.' },
        { title: 'Escalabilidad con identidad', body: 'Las campañas pueden crecer en imágenes, reels, formatos sociales y extensiones futuras sin perder su centro visual.' },
        { title: 'Control de continuidad', body: 'Personajes, productos, escenarios y mundos de campaña se protegen contra la deriva mediante reglas y validación.' },
        { title: 'Método y arquitectura', body: 'El trabajo no depende de una herramienta concreta. Depende de una forma documentada de pensar y producir.' },
        { title: 'Menos fricción de producción', body: 'El sistema reduce coste, logística y retrasos asociados a producir imagen visual de forma recurrente.' },
      ],
      teamTitle: 'El Equipo',
      teamName: 'Oliver Heyde',
      teamRole: 'Fundador & Director Creativo',
      teamBio:
        'Oliver lidera la dirección creativa, el criterio visual y la arquitectura de sistemas detrás de HEYDE Studio. Su background conecta producción audiovisual, color, social media, storytelling y workflows asistidos por IA bajo un principio operativo: premium en criterio, escalable en sistema.',
      teamLinkedIn: 'https://www.linkedin.com/in/oliverheyde',
      trustTitle: 'Cómo trabajamos.',
      trust: [
        {
          title: 'Definir el sistema',
          body: 'Clarificamos objetivo, territorio visual, formatos, variables que pueden moverse y elementos que no deben romperse.',
        },
        {
          title: 'Construir con control',
          body: 'Producimos por módulos: identidad, escenario, lenguaje material, motion, comportamiento por formato y criterios de validación.',
        },
        {
          title: 'Documentar lo que compone valor',
          body: 'Cada regla útil pasa a formar parte del sistema para que el trabajo fuerte pueda repetirse, delegarse y extenderse.',
        },
      ],
      finalTitle: 'Donde la identidad se convierte en infraestructura.',
      finalBody: 'Envíanos el contexto. Te ayudamos a definir qué necesita construirse: una campaña, una identidad digital, un sistema motion o la infraestructura detrás de todo ello.',
      finalCta: 'Agendar Una Llamada',
    },
    workPage: {
      heroTitle: 'Sistemas de campaña en uso.',
      heroBody: 'Un archivo vivo de sistemas visuales, mundos de campaña y lógica de producción.\nAbre un caso, revisa el rango o navega por los frames de cada campaña.',
      projects: [
        {
          name: 'Soleá',
          type: 'AI Campaign System',
          imageLabel: 'Soleá - Marca de fragancias luxury',
          body:
            'Campaña conceptual de fragancia alrededor de luz mediterránea, memoria en la piel y permanencia material.\nVidrio, cerámica, madera y líquido dorado escalan de stills editoriales a motion.',
          href: '/case-studies/solea',
        },
        {
          name: 'eden',
          type: 'AI Editorial Campaign',
          imageLabel: 'Eden - Campaña editorial con IA',
          body:
            'Mundo editorial de moda construido desde arquitectura brutalista, silueta escultórica y luz fría.\nFigura, espacio, styling y atmósfera funcionan como un mismo sistema de campaña.',
          href: '/case-studies/eden',
        },
        {
          name: 'Motion Studies',
          type: 'AI Motion Showcase',
          imageLabel: 'Motion - Sistema de animación',
          body:
            'Un showcase solo motion para reels, teasers y tests de imagen en movimiento.\nPreparado para crecer con nuevos sistemas motion de campaña.',
          href: '/case-studies/motion',
        },
      ],
      readCaseStudy: 'Ver Caso',
      testimonialsTitle: 'Lo que demuestra el trabajo.',
      workProof: [
        {
          label: 'Rango',
          title: 'Territorios distintos.',
          body: 'Sistemas visuales construidos alrededor de lo que necesita cada campaña: identidad, imagen, avatares, motion y mundos multiformato.',
        },
        {
          label: 'Sistema',
          title: 'De imagen a sistema.',
          body: 'Un asset es útil. Una lógica visual reutilizable mantiene la producción coherente en distintos formatos.',
        },
        {
          label: 'Entrega',
          title: 'Construido para extenderse.',
          body: 'Reglas, documentación y lógica de producción hacen que cada campaña sea más fácil de reutilizar, adaptar y escalar.',
        },
      ],
      finalTitle: '¿Construimos el sistema?',
      finalBody: 'Envíanos el contexto.\nTe ayudamos a identificar el mejor punto de partida y el nivel de sistema que tu marca necesita.',
      finalCta: 'Empezar Proyecto',
    },
    faqPage: {
      heroTitle: 'Preguntas Frecuentes',
      heroBody: 'Todo lo que necesitas saber sobre sistemas visuales, proceso y trabajo con nosotros.',
      sections: [
        {
          title: 'General',
          items: [
            {
              question: '¿Qué es exactamente un sistema visual?',
              answer:
                'Es el conjunto de reglas, componentes, estándares y documentación que mantiene tu marca consistente en todos los puntos de contacto.',
            },
            {
              question: '¿Necesitamos un sistema visual?',
              answer:
                'Si produces más de 5-10 assets al mes o la inconsistencia te cuesta tiempo, credibilidad o dinero, sí.',
            },
            {
              question: '¿En qué se diferencia de unas brand guidelines?',
              answer:
                'Las brand guidelines suelen ser un PDF. Un sistema visual es infraestructura operativa dentro de tus herramientas.',
            },
          ],
        },
        {
          title: 'Precio E Inversión',
          items: [
            {
              question: '¿Cuánto cuesta un sistema visual?',
              answer:
                'Los productos entry empiezan en €300. Las campañas empiezan en €2.200 y la infraestructura de sistema en €8.500, con alcance final confirmado tras discovery.',
            },
            {
              question: '¿Qué incluye el precio?',
              answer:
                'Diseño, implementación, documentación, formación de equipo y soporte post-lanzamiento.',
            },
            {
              question: '¿Ofrecéis pagos por fases?',
              answer:
                'Sí. Los proyectos grandes suelen dividirse por fases con hitos claros.',
            },
          ],
        },
        {
          title: 'Timeline Y Proceso',
          items: [
            {
              question: '¿Cuánto tarda?',
              answer:
                'La mayoría de sistemas tardan entre 6 y 14 semanas según complejidad, integraciones y feedback del equipo.',
            },
            {
              question: '¿Cuánto tiempo debe invertir nuestro equipo?',
              answer:
                'Normalmente 2-4 horas por semana durante discovery y diseño, con algo más durante handoff.',
            },
            {
              question: '¿Qué pasa después de la entrega?',
              answer:
                'El sistema es tuyo. Damos soporte y podemos continuar con un retainer opcional.',
            },
          ],
        },
      ],
      finalTitle: '¿Sigues teniendo preguntas?',
      finalBody: 'Escríbenos. Respondemos todo.',
      contactCta: 'Contactar',
      callCta: 'Agendar Una Llamada',
    },
    pricingPage: {
      heroTitle: 'Precios. Productos. Niveles de control.',
      heroBody:
        'Escaleras de producto transparentes para producción visual y sistemas de marca. Empieza con un asset, construye una campaña o instala la infraestructura detrás de una producción repetible.',
      recommended: 'Recomendado',
      products: [
        {
          name: 'Avatar',
          description: 'Asset digital. Documentado, evolucionable y listo para uso de marca.',
          tiers: [
            {
              name: 'Entry',
              price: '€300 - €900',
              features: [
                'Avatar precreado o adaptado',
                'Documentación SOP básica',
                '5 expresiones x 4 ángulos',
                'Uso no exclusivo',
                '1 ronda de cambios',
              ],
            },
            {
              name: 'Standard',
              price: '€1.200',
              recommended: true,
              features: [
                'Avatar único para tu marca',
                'Documentación SOP completa',
                '8 expresiones x 7 ángulos',
                '3 looks incluidos',
                '2 rondas de cambios',
                'Uso en portfolio con permiso',
              ],
            },
            {
              name: 'Premium',
              price: '€2.500',
              features: [
                'Avatar 100% exclusivo',
                'SOP enterprise y biblia visual',
                '12+ expresiones x 7+ ángulos',
                '5+ looks diseñados',
                'Evolución mensual durante el año 1',
                'Derechos de uso derivado',
              ],
            },
          ],
        },
        {
          name: 'Imagen',
          description: 'Render fotográfico estático. Una imagen de calidad campaña o un pack coordinado de imágenes.',
          tiers: [
            {
              name: 'Entry',
              price: '€300',
              features: [
                '1 imagen estática',
                'Resolución 4K+',
                'Avatar de catálogo o avatar existente',
                'Contexto simple o fondo neutro',
                '1 ronda de revisiones',
                'Entrega en 24-48 horas',
              ],
            },
            {
              name: 'Standard',
              price: '€600',
              recommended: true,
              features: [
                '1 imagen con dirección creativa',
                'Acabado profesional 4K+',
                'Avatar y contexto coordinados',
                'Edición y color grading premium',
                '2 rondas de revisiones',
                'Documentación básica de concepto',
              ],
            },
            {
              name: 'Premium',
              price: '€950',
              features: [
                '1 imagen hero de campaña',
                'Dirección visual experta',
                'Concepto narrativo integrado',
                'Edición avanzada y postproducción high-end',
                '3 rondas de revisiones',
                'Documentación SOP de imagen',
              ],
            },
          ],
        },
        {
          name: 'Vídeo / Reel',
          description: 'Motion de campaña para reels, stories, teasers y formatos sociales.',
          tiers: [
            {
              name: 'Entry',
              price: '€350',
              features: [
                '1 reel de 10-15 segundos',
                'Formato 9:16 o 1:1',
                'Transición o gesto simple de avatar',
                'Edición básica + música o sonido',
                '1 ronda de cambios',
                'Entrega en 2-3 días',
              ],
            },
            {
              name: 'Standard',
              price: '€750',
              recommended: true,
              features: [
                '1 reel de 15-30 segundos',
                'Formatos 9:16, 1:1 o 16:9',
                'Narrativa breve con múltiples planos',
                'Edición profesional y sound design',
                'Color grading unificado',
                '2 rondas de cambios',
              ],
            },
            {
              name: 'Premium',
              price: '€1.500',
              features: [
                '1 reel de campaña de 20-45 segundos',
                'Narrativa completa con 3+ escenas',
                'VFX y animaciones integradas',
                'Edición cinematic y sound design avanzado',
                '3+ rondas de cambios',
                'Documentación del sistema de motion',
              ],
            },
          ],
        },
        {
          name: 'Campaña',
          description: 'Imágenes, reels, concepto y dirección coreografiados como un sistema visual.',
          tiers: [
            {
              name: 'Entry',
              price: '€2.200',
              features: [
                '6 imágenes + 1 reel de 10-15s',
                'Concepto visual claro',
                '1 avatar y 1-2 contextos',
                'Dirección visual coherente básica',
                '1 ronda de revisiones',
                'Documentación de brief y concepto',
              ],
            },
            {
              name: 'Standard',
              price: '€5.500',
              recommended: true,
              features: [
                '25 imágenes + 3 reels',
                'Concepto visual estructurado',
                '1-2 avatares y múltiples contextos',
                'Dirección visual experta',
                'Entrega multiformato',
                'Documentación SOP de campaña',
              ],
            },
            {
              name: 'Premium',
              price: '€9.800',
              features: [
                '40+ imágenes + 5+ reels',
                'Concepto visual arquitectónico',
                '2+ avatares y 3+ contextos',
                'Edición de campaña nivel maison',
                'Adaptación completa de formatos',
                'SOP avanzada y reglas de escala',
              ],
            },
          ],
        },
        {
          name: 'Sistema / Infraestructura',
          description: 'Tu propio motor visual: metodología, documentación, formación y soporte dentro de tu equipo.',
          tiers: [
            {
              name: 'Entry',
              price: '€8.500',
              features: [
                'Taller de necesidades de 3 horas',
                'Documentación SOP detallada',
                'Librerías iniciales y prompts',
                '2 sesiones de formación de equipo',
                'Setup básico de herramientas y workflow',
                '3 primeros outputs validados',
              ],
            },
            {
              name: 'Standard',
              price: '€13.000',
              recommended: true,
              features: [
                'Taller de workflow y escala de 6 horas',
                'Documentación de procesos empresa-grade',
                'Librerías reutilizables avanzadas',
                '3 sesiones de formación de equipo',
                'Setup técnico con tu stack',
                '10 outputs producidos por tu equipo con feedback',
              ],
            },
            {
              name: 'Premium',
              price: '€28.000',
              features: [
                'Taller de escala y complejidad de 8 horas',
                'Documentación de procesos enterprise',
                'Librerías multi-cliente reutilizables',
                'Formación ejecutiva y operativa',
                'Setup avanzado de CRM, DAM y aprobaciones',
                'Roadmap estratégico de 6-12 meses',
              ],
            },
          ],
        },
      ],
      deliveryTitle: 'Modelos De Entrega',
      models: [
        {
          name: 'Transaccional',
          description: 'Proyecto puntual. Haces el encargo, HEYDE produce y el proyecto se cierra tras la entrega.',
          paymentLabel: 'Pago',
          payment: '50% upfront, 50% a la entrega',
          timelineLabel: 'Timeline',
          timeline: '24h a 21 días según producto',
        },
        {
          name: 'Retainer Mensual',
          description: 'Producción recurrente para equipos que necesitan una salida creativa mensual predecible.',
          paymentLabel: 'Pago',
          payment: 'Mes por adelantado',
          timelineLabel: 'Timeline',
          timeline: 'Calendario fijo de entregas',
        },
        {
          name: 'Suscripción / Acceso',
          description: 'Acceso continuo a avatares licenciados, contextos o recursos de producción reutilizables.',
          paymentLabel: 'Pago',
          payment: 'Suscripción mensual',
          timelineLabel: 'Timeline',
          timeline: 'Activo mientras funciona el modelo de acceso',
        },
        {
          name: 'Proyecto + Soporte',
          description: 'Setup de infraestructura seguido de una ventana definida de soporte, validación, formación y evolución.',
          paymentLabel: 'Pago',
          payment: 'Hitos de proyecto más alcance de soporte',
          timelineLabel: 'Timeline',
          timeline: 'Setup de 3-10 semanas con soporte según alcance',
        },
      ],
      finalTitle: '¿Listo Para Empezar?',
      finalBody:
        'Elige productos, mezcla tiers o combina trabajo puntual con producción mensual.',
      finalCta: 'Agendar Una Llamada',
    },
    leadForm: {
      labels: {
        name: 'Nombre',
        email: 'Email',
        company: 'Empresa',
        service: 'Servicio De Interés',
        message: 'Mensaje',
      },
      placeholders: {
        name: 'Tu nombre',
        email: 'tu@email.com',
        company: 'Tu empresa (opcional)',
        service: 'Selecciona un servicio',
        message: 'Cuéntanos sobre tu proyecto (opcional)',
      },
      services: [
        ['Avatar', 'Avatar'],
        ['Image', 'Imagen'],
        ['Video / Reel', 'Vídeo / Reel'],
        ['Campaign', 'Campaña'],
        ['System / Infrastructure', 'Sistema / Infraestructura'],
        ['Other', 'Otro'],
      ],
      successTitle: 'Enviado',
      successText: 'Revisa tu email para acceder a la plantilla de documentación.',
      errorTitle: 'Error',
      submit: 'Recibir Plantilla',
      sending: 'Enviando...',
      privacy:
        'Respetamos tu privacidad. Usamos tus datos solo para enviar la plantilla y actualizaciones relevantes.',
      fallbackError: 'Algo ha ido mal',
    },
    resourcesPage: {
      heroTitle: 'Herramientas de sistema para equipos visuales.',
      heroBody:
        'Un punto de partida práctico para documentar identidad, reglas de producción y lógica reusable de campaña.',
      insideTitle: 'Empieza por la capa documental.',
      resources: [
        {
          title: 'Plantilla De Documentación De Sistema',
          body:
            'Una estructura de trabajo para documentar identidad, reglas visuales, formatos, criterios de calidad y handoff.',
          bullets: ['Identity lock', 'Reglas visuales', 'Mapa de formatos', 'Notas de handoff'],
        },
        {
          title: 'Checklist De Preparación',
          body:
            'Una capa breve de auditoría para detectar dónde se rompe la producción visual antes de que sea cara.',
          bullets: ['Gaps de consistencia', 'Fricción de workflow', 'Reutilización', 'Puntos de aprobación'],
        },
        {
          title: 'Mapa De Formatos De Campaña',
          body:
            'Una forma de mapear una idea en hero images, crops sociales, reels, stills y extensiones futuras.',
          bullets: ['Assets hero', 'Crops sociales', 'Cues de motion', 'Lógica de derivación'],
        },
      ],
      captureTitle: 'Recibe la plantilla',
      captureBody: 'Introduce tu email y te enviaremos la plantilla de documentación. Añadiremos más recursos después del lanzamiento.',
      trustLines: [
        'Sin spam. Sin tarjeta. Privacidad respetada.',
        'También podrás recibir actualizaciones seleccionadas sobre sistemas visuales, casos y patrones de producción.',
      ],
      whyTitle: 'Por qué documentar antes de escalar',
      why: [
        {
          title: 'Reduce deriva',
          body: 'Cuantos más outputs necesita una campaña, más importante es definir qué no puede cambiar.',
        },
        {
          title: 'Transfiere decisiones',
          body: 'Construidas desde la práctica system-first de producción de HEYDE Studio.',
        },
        {
          title: 'Haz los assets reutilizables',
          body: 'Un sistema documentado hace que cada campaña sea más fácil de extender, adaptar y entregar.',
        },
        {
          title: 'Protege calidad',
          body: 'Reglas, referencias y checkpoints reducen la distancia entre dirección y producción.',
        },
      ],
      finalTitle: '¿Necesitas el sistema detrás de los assets?',
      finalBody: 'Empieza por documentar. Cuando el cuello de botella sea mayor que una plantilla, tráenos el contexto.',
      callCta: 'Agendar Una Llamada',
      processCta: 'Ver Nuestro Proceso',
    },
    auditPage: {
      heroTitle: 'Encuentra dónde se rompe tu producción visual.',
      heroBody:
        'Una auditoría enfocada de 20 minutos para marcas que necesitan más consistencia, velocidad y control en su producción visual.',
      scheduleCta: 'Agendar auditoría',
      workCta: 'Ver proyectos',
      introTitle: 'Qué es una auditoría de sistema visual.',
      introBody:
        'Revisamos cómo produce visuales tu marca ahora: campañas, assets, referencias, plantillas, workflows y los puntos donde la calidad empieza a derivar. Después identificamos si un sistema haría la producción más clara, rápida y consistente.',
      summaryCards: [
        ['Tiempo', '20 minutos, con un formulario breve para que la llamada empiece con contexto.'],
        ['Coste', 'Gratis. Sin coste oculto, sin follow-up forzado y sin pitch genérico.'],
        ['Resultado', 'Una lectura clara de qué funciona, qué deriva y qué debería estructurarse después.'],
        ['Foco', 'Consistencia visual, cuellos de botella, assets reutilizables y escalabilidad de campaña.'],
      ],
      questionsTitle: 'Las cinco preguntas que respondemos.',
      questions: [
        ['Estado actual', 'Qué lógica visual existe ya y qué sigue dependiendo de improvisación.'],
        ['Punto de ruptura', 'Dónde se pierde tiempo, consistencia, calidad o control.'],
        ['Oportunidad de sistema', 'Qué parte del proceso visual debería convertirse en infraestructura reutilizable.'],
        ['Nivel de esfuerzo', 'Qué haría falta para construir el sistema correcto en tiempo, complejidad y alcance.'],
        ['Siguiente movimiento', 'Qué conviene hacer ahora: plantilla, campaña, identidad digital o infraestructura.'],
      ],
      discoverTitle: 'Con qué te vas.',
      discoveries: [
        ['1. Un diagnóstico más claro', 'Una lectura práctica del estado actual de tu producción visual.'],
        ['2. La fuente principal de deriva', 'El punto donde identidad, calidad o workflow empiezan a perder consistencia.'],
        ['3. Una dirección de sistema', 'El tipo de estructura que ayudaría realmente a tu marca a producir mejor.'],
        ['4. Claridad de alcance', 'Una idea realista de tiempo, complejidad y profundidad de producción.'],
        ['5. Un siguiente paso', 'Una plantilla, sistema de campaña, identidad digital o camino más adecuado para tu etapa.'],
        ['6. Una lectura de valor', 'Dónde un sistema puede reducir fricción, proteger consistencia y facilitar producción futura.'],
      ],
      fitTitle: 'Cuándo tiene sentido la auditoría.',
      perfectTitle: 'Buen encaje:',
      perfect: [
        'Tu marca produce contenido visual con frecuencia',
        'Las campañas tardan demasiado en pasar de idea a ejecución',
        'Los assets se sienten inconsistentes entre canales',
        'Dependes de demasiada coordinación manual',
        'Necesitas lógica de campaña antes de escalar output',
      ],
      notYetTitle: 'Probablemente todavía no:',
      notYet: [
        'Solo necesitas visuales ocasionales',
        'La consistencia no es un problema actual',
        'No hay un cuello de botella real de producción',
        'Buscas principalmente el output de imagen más barato',
        'Quieres probar IA sin una necesidad seria de marca o campaña',
      ],
      unsureLabel: '¿No estás seguro?',
      unsureText:
        'Agenda igualmente. Si un sistema completo no es el movimiento adecuado, te lo diremos y apuntaremos a una vía más ligera.',
      processTitle: 'Cómo funciona.',
      process: [
        ['Reserva un hueco', 'Elige un slot de 20 minutos. La conversación será concreta y práctica.'],
        ['Comparte contexto', 'Cuéntanos qué produces, dónde se ralentiza y qué no puede romperse visualmente.'],
        ['Hacemos la auditoría', 'Mapeamos la lógica actual, los puntos débiles y la oportunidad de sistema.'],
        ['Recibes la lectura', 'Te damos una recomendación breve y el siguiente paso que tomaríamos.'],
        ['Decides con calma', 'Sin presión. Si tiene sentido, definimos el alcance correcto del proyecto.'],
      ],
      faqTitle: 'Preguntas frecuentes.',
      faqs: [
        ['¿De verdad es gratis?', 'Sí. Sin tarjeta y sin llamada de venta guionizada.'],
        ['¿Y si no estoy listo para comprometerme?', 'No pasa nada. La auditoría existe para aclarar si un sistema es útil ahora o más adelante.'],
        ['¿Cuánto tarda?', '20 minutos. Mantenemos la conversación enfocada en producción visual, consistencia y próximos pasos.'],
        ['¿Y si no trabajo con vosotros?', 'No pasa nada. Te llevas una lectura más clara de tu sistema de producción.'],
      ],
      calendlyTitle: 'Agenda tu auditoría gratuita.',
      calendarFallback: '¿No puedes usar el calendario? Sin problema.',
      emailInstead: 'Escríbenos por email',
      finalTitle: 'Empieza por el punto de fricción.',
      finalBody: 'Trae el estado actual de tu marca, campaña o workflow. Te ayudamos a ver si necesitas más assets o un sistema mejor detrás de ellos.',
      finalCta: 'Agendar ahora',
    },
    questionnairePage: {
      successTitle: 'Gracias',
      successBody:
        'Hemos recibido tu cuestionario. Te enviaremos un email personalizado con hallazgos preliminares en menos de 24 horas.',
      nextTitle: 'Qué pasa ahora:',
      next: [
        'Analizamos tus respuestas y tu producción visual actual',
        'Te enviamos hallazgos personalizados',
        'Proponemos próximos pasos concretos, sin presión',
        'Tienes 90 días para decidir si un sistema encaja contigo',
      ],
      backHome: 'Volver al Inicio',
      heroTitle: 'Cuestionario Pre-Auditoría',
      heroBody: 'Ayúdanos a entender tus retos de producción visual. Tarda unos 5 minutos.',
      labels: {
        brandName: 'Nombre De Marca / Empresa',
        monthlyAssets: '¿Cuántos assets visuales producís aproximadamente al mes?',
        currentSystem: '¿Tenéis actualmente un sistema visual o brand guidelines?',
        biggestPain: '¿Cuál es vuestro mayor dolor con la producción visual ahora mismo?',
        productionTimeline: '¿Cuánto tarda normalmente producir un asset visual?',
        email: 'Tu email',
      },
      placeholders: {
        brandName: 'ej., Acme Corp',
        biggestPain: 'ej., Tardamos semanas en producir assets consistentes...',
        email: 'tu@empresa.com',
      },
      select: 'Selecciona una opción',
      monthlyOptions: [
        ['1-10', '1-10 assets'],
        ['11-50', '11-50 assets'],
        ['51-100', '51-100 assets'],
        ['100+', '100+ assets'],
      ],
      systemOptions: [
        ['no-system', 'No tenemos sistema'],
        ['loose-guidelines', 'Documento de guidelines suelto'],
        ['some-system', 'Sistema parcial'],
        ['solid-system', 'Sistema sólido'],
      ],
      timelineOptions: [
        ['hours', 'Horas'],
        ['1-2-days', '1-2 días'],
        ['3-7-days', '3-7 días'],
        ['1-2-weeks', '1-2 semanas'],
        ['2-4-weeks', '2-4 semanas'],
        ['1-2-months', '1-2 meses'],
        ['2plus-months', '2+ meses'],
      ],
      submit: 'Enviar Cuestionario',
      submitting: 'Enviando...',
      helpText: 'Tu respuesta nos ayudará a personalizar la auditoría.',
      fallbackError: 'No se ha podido enviar el cuestionario. Inténtalo de nuevo.',
    },
    templatePage: {
      heroTitle: 'Plantilla gratuita de documentación de sistemas visuales.',
      heroBody:
        'Un punto de partida práctico para convertir decisiones visuales en un sistema que tu equipo pueda repetir, auditar y extender.',
      insideTitle: 'Qué incluye.',
      inside: [
        {
          title: 'Identity lock',
          body:
            'Define lo que no puede derivar: territorio visual, assets base, materiales, tono, reglas de imagen y límites de identidad.',
        },
        {
          title: 'Reglas de producción',
          body:
            'Una checklist clara para tipografía, comportamiento de imagen, cues de motion, uso por formato y criterios de calidad.',
        },
        {
          title: 'Mapa de escalabilidad',
          body:
            'Planifica cómo el sistema pasa de unos assets fuertes a campañas, formatos sociales, motion y producción recurrente.',
        },
        {
          title: 'Estructura de handoff',
          body:
            'Ordena el sistema para que otra persona pueda usarlo sin adivinar, improvisar o reconstruir la lógica.',
        },
      ],
      whyTitle: 'Por qué usarla.',
      why: [
        'Convierte decisiones visuales dispersas en estructura usable',
        'Protege la identidad antes de multiplicar formatos',
        'Reduce deriva entre campañas, assets y equipos',
        'Crea documentación que ayuda a producir',
        'Úsala como punto de partida y adáptala a tu marca',
      ],
      fitTitle: 'Mejor para.',
      fit: [
        'Marcas construyendo un lenguaje visual reutilizable',
        'Equipos que producen assets de campaña de forma recurrente',
        'Founders que necesitan clarificar dirección visual',
        'Equipos in-house auditando producción inconsistente',
        'Estudios y agencias creando documentación de handoff',
      ],
      formTitle: 'Recibe la plantilla.',
      formBody:
        'Déjanos tu email y te enviaremos el framework de documentación. Sin tarjeta y sin secuencia genérica de emails.',
      successTitle: 'Revisa tu email',
      successBody: 'Tu plantilla de documentación de sistema visual ha sido enviada.',
      successHint: 'Debería llegar en unos segundos. Revisa spam si hace falta.',
      nameLabel: 'Nombre',
      emailLabel: 'Email',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      submit: 'Enviarme la plantilla',
      sending: 'Enviando...',
      privacy:
        'Respetamos tu privacidad. Usamos tus datos solo para enviar la plantilla y actualizaciones relevantes.',
      fallbackError: 'Algo ha ido mal. Inténtalo de nuevo.',
      networkError: 'Error. Inténtalo de nuevo o escribe a contact@heydestudio.com',
      finalTitle: 'Una plantilla es el inicio. El sistema es el trabajo.',
      finalBody: 'Usa el framework para detectar qué necesita estructura. Cuando el cuello de botella sea mayor que la documentación, tráenos el contexto.',
      finalCta: 'Agendar una llamada',
    },
    blogPage: {
      heroTitle: 'Notas sobre sistemas, imagen y producción.',
      heroBody: 'Ensayos breves de HEYDE Studio sobre lógica de campaña, producción asistida por IA, continuidad de identidad y los sistemas detrás de una imagen escalable.',
      featuredImage: 'Nota editorial',
      readTime: 'min de lectura',
      finalTitle: '¿Listo para construir tu sistema?',
      finalBody: 'Lee el pensamiento. Después tráenos el problema de producción visual que necesita estructura.',
      finalCta: 'Agendar una llamada',
      articleNotFound: 'Artículo no encontrado',
      articleNotFoundBody: 'El artículo que buscas no existe.',
      backToBlog: 'Volver al blog',
      authorBio:
        'Fundador y director creativo de HEYDE Studio. Oliver escribe sobre sistemas visuales, producción asistida por IA, arquitectura de campaña y la disciplina necesaria para escalar imagen sin perder criterio.',
      commentsTitle: 'Comentarios',
      relatedTitle: 'Artículos relacionados',
      learnHow: 'Ver cómo trabajamos',
    },
  },
} as const;
