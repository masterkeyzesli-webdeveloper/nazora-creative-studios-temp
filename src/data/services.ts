import {
  Code2,
  LayoutTemplate,
  PenTool,
  AudioLines,
  Mic,
  Camera,
  Bot,
  RadioTower,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  shortDescription: string;
  description: string[];
  deliverables: string[];
  audience: string[];
  icon: LucideIcon;
  accent: 'electric' | 'gold';
  rate?: { label: string; note?: string };
  highlights?: { title: string; body: string }[];
};

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    shortDescription:
      'Robust, responsive digital platforms engineered around performance, functionality, maintainability, and your business objectives.',
    description: [
      'We build websites and web applications that are fast, stable, and straightforward to maintain. Every build starts from the outcome the business needs: more qualified enquiries, a clearer catalogue, a lighter administrative load, or a platform that can grow with the organisation.',
      'Architecture, performance budgets, accessibility, and content structure are considered from the first sprint rather than corrected at the end, so the finished platform remains dependable long after launch.',
    ],
    deliverables: [
      'Business and corporate websites',
      'Landing pages and campaign sites',
      'Custom web applications',
      'Third-party integrations and APIs',
      'Performance and accessibility improvements',
      'Ongoing website maintenance and updates',
    ],
    audience: [
      'Businesses replacing an outdated website',
      'Organisations that need custom functionality',
      'Teams requiring integrations with existing tools',
    ],
    icon: Code2,
    accent: 'electric',
  },
  {
    id: 'web-design',
    title: 'Web Design',
    shortDescription:
      'Distinctive digital interfaces that combine aesthetic refinement, intuitive navigation, responsive layouts, and strategic user experience.',
    description: [
      'Design is where a brand becomes usable. We shape interface, hierarchy, and flow around what a visitor actually needs to understand and do, then translate that into responsive layouts that hold their composure on every screen.',
      'Work typically moves from structure to wireframe to visual direction, so decisions about content and navigation are settled before visual refinement begins.',
    ],
    deliverables: [
      'UI and UX design',
      'Responsive design across devices',
      'Landing pages and corporate websites',
      'Website redesigns',
      'Design systems and component libraries',
      'Prototypes for review before development',
    ],
    audience: [
      'Brands refreshing an existing digital presence',
      'New businesses establishing credibility online',
      'Organisations preparing a redesign before relaunch',
    ],
    icon: LayoutTemplate,
    accent: 'electric',
    highlights: [
      { title: 'Website packages', body: 'Available as Bronze, Silver, and Gold packages.' },
    ],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    shortDescription:
      'Visual communication that gives your brand clarity, consistency, and a recognisable identity across digital and print media.',
    description: [
      'Consistent visual language makes an organisation easier to recognise and easier to trust. We develop identities and supporting assets that stay coherent across a website, a social post, a proposal, and a printed banner.',
      'Deliverables are prepared to the right specifications for each channel, so the work arrives ready to use.',
    ],
    deliverables: [
      'Brand identities and logos',
      'Promotional and campaign graphics',
      'Marketing collateral',
      'Posters and print material',
      'Social media design systems',
      'Presentation and document templates',
    ],
    audience: [
      'New brands building an identity',
      'Organisations with inconsistent visual materials',
      'Teams running regular campaigns',
    ],
    icon: PenTool,
    accent: 'gold',
  },
  {
    id: 'sound-engineering',
    title: 'Sound Engineering',
    shortDescription:
      'Professional audio solutions for clear, balanced, polished sound across recording, production, and live or recorded media.',
    description: [
      'Sound carries the professionalism of a production more than most teams expect. We record, edit, mix, and enhance audio so speech is clear, music sits correctly, and the finished material translates well on phones, laptops, and venue systems.',
      'Sessions are scoped around the intended use of the recording, whether that is a podcast, a video soundtrack, an institutional broadcast, or an archived live event.',
    ],
    deliverables: [
      'Audio recording and editing',
      'Mixing and mastering',
      'Noise reduction and sound enhancement',
      'Voice-over production',
      'Audio for video and presentation',
      'Restoration of existing recordings',
    ],
    audience: [
      'Podcasters and content creators',
      'Churches and ministries',
      'Corporate and institutional media teams',
    ],
    icon: AudioLines,
    accent: 'gold',
  },
  {
    id: 'podcast-production',
    title: 'Audio-Visual and Podcast Production',
    shortDescription:
      'Create engaging podcast and audiovisual content with professional production support, considered sound, and a polished final presentation.',
    description: [
      'We support production from preparation through to the finished episode: recording, editing, sound treatment, visual capture, and the supporting assets a release needs.',
      'Requirements vary widely between a single-host show and a multi-guest video production, so scope and equipment are agreed before the session.',
    ],
    deliverables: [
      'Podcast recording and editing',
      'Video podcast and audiovisual production',
      'Episode packaging and release assets',
      'Promotional clips for social media',
      'Music, transitions, and sound treatment',
      'Post-production quality control',
    ],
    audience: [
      'Brands launching a podcast',
      'Thought leaders building an audience',
      'Organisations producing regular video content',
    ],
    icon: Mic,
    accent: 'electric',
    rate: {
      label: 'KSh 2,000 per hour',
      note: 'Starting rate. Final cost depends on requirements, equipment, and agreed deliverables.',
    },
  },
  {
    id: 'photography-videography',
    title: 'Photography and Videography',
    shortDescription:
      'Capture the moments, people, products, and stories that make your brand worth remembering.',
    description: [
      'Visual content determines how a brand is remembered between campaigns. We plan, shoot, and edit material that can be used across a website, social channels, presentations, and print.',
      'Each engagement begins with the intended use of the content, which shapes the shot list, format, and delivery schedule.',
    ],
    deliverables: [
      'Promotional and brand videos',
      'Corporate and product photography',
      'Event coverage',
      'Interviews and testimonial capture',
      'Branded visual content for campaigns',
      'Editing, grading, and final delivery',
    ],
    audience: [
      'Businesses refreshing their content library',
      'Event organisers and institutions',
      'Brands preparing a campaign or launch',
    ],
    icon: Camera,
    accent: 'gold',
  },
  {
    id: 'ai-automation',
    title: 'AI and Automation',
    shortDescription:
      'Reduce repetitive work, streamline processes, and create more intelligent workflows through practical AI integration and automation.',
    description: [
      'Automation is worth applying where it removes genuine friction. We review how work currently moves through the business, identify steps that are repetitive or error-prone, and design a solution around the process that already exists.',
      'Every proposed integration is scoped, reviewed with the client, and tested before it is described as operational.',
    ],
    deliverables: [
      'Process review and automation opportunity mapping',
      'Business workflow automation design',
      'AI-assisted enquiry and support workflows',
      'Lead handling and routing logic',
      'Connected tools and process integration',
      'Productivity and internal tooling improvements',
    ],
    audience: [
      'Teams handling high volumes of enquiries',
      'Businesses with repetitive manual processes',
      'Organisations connecting several digital tools',
    ],
    icon: Bot,
    accent: 'electric',
    highlights: [
      {
        title: 'Example workflows',
        body: 'Enquiry categorisation and routing, follow-up reminders, content drafting support, reporting summaries, and hand-offs between tools your team already uses.',
      },
      {
        title: 'Honest scope',
        body: 'We only describe an integration as delivered once it has been implemented and tested for that client.',
      },
    ],
  },
  {
    id: 'media-consulting',
    title: 'Media Setup and Consulting for Churches and Organizations',
    shortDescription:
      'Build a reliable media environment with the right equipment, workflow, technical setup, and production practices for your organization.',
    description: [
      'A media environment fails on planning more often than on equipment. We help organisations define what they need to capture, mix, stream, and archive, then specify a setup that matches the room, the team, and the budget.',
      'Services are equally suited to churches and ministries, schools, nonprofits, and corporate communications teams, and are scoped to the agreed requirements.',
    ],
    deliverables: [
      'Church and organization media setup',
      'Audiovisual systems planning',
      'Streaming workflow configuration',
      'Recording setup and room assessment',
      'Equipment consulting and specification',
      'Media-team guidance and training',
    ],
    audience: [
      'Churches and ministries',
      'Schools and training institutions',
      'Nonprofits and community organizations',
      'Corporate communications teams',
    ],
    icon: RadioTower,
    accent: 'gold',
    highlights: [
      {
        title: 'Scope',
        body: 'Equipment planning, audio and video workflow assessment, streaming configuration, media-team guidance, and production setup are provided subject to the agreed scope.',
      },
    ],
  },
];

export const getServiceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id);
