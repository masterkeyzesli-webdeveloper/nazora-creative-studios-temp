export type PackageTier = {
  id: 'bronze' | 'silver' | 'gold';
  name: string;
  price: number;
  priceLabel: string;
  badge?: string;
  position: string;
  shortDescription: string;
  features: string[];
  notes?: string[];
  emphasis: 'default' | 'recommended' | 'premium';
  cta: string;
};

export const packages: PackageTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 15999,
    priceLabel: 'KSh 15,999',
    position: 'Essential professional web presence',
    shortDescription:
      'An accessible starting point for businesses ready to establish their credibility online.',
    features: [
      'Professionally designed business website',
      'Responsive desktop, tablet, and mobile layouts',
      'Core business information and service sections',
      'Contact form',
      'WhatsApp contact integration',
      'Basic on-page SEO setup',
      'Social media links',
      'Free hosting for one year',
      'Free domain registration for one year, subject to domain availability and applicable registration conditions',
    ],
    notes: [
      'Page count, delivery timeframe, and revision allowance are confirmed during consultation.',
    ],
    emphasis: 'default',
    cta: 'Choose Bronze',
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 24999,
    priceLabel: 'KSh 24,999',
    badge: 'Recommended',
    position: 'Enhanced business website',
    shortDescription:
      'For growing businesses that require a more complete and professionally supported digital presence.',
    features: [
      'Everything included in Bronze',
      'More comprehensive website design and content structure',
      'Professional email setup',
      '30 GB of hosting storage',
      'Six months of website support',
      'Enhanced on-page SEO configuration',
      'Improved content presentation and conversion-focused layouts',
      'Responsive optimisation across modern devices',
      'Contact and enquiry workflow configuration',
    ],
    notes: [
      'Free hosting and domain benefits apply only where explicitly confirmed in the final quotation.',
    ],
    emphasis: 'recommended',
    cta: 'Choose Silver',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 34999,
    priceLabel: 'KSh 34,999',
    badge: 'Premium experience',
    position: 'Premium business website experience',
    shortDescription:
      'For brands seeking a more distinctive digital presence, more sophisticated presentation, and a tailored project experience.',
    features: [
      'Everything in the agreed Silver scope',
      'More bespoke visual direction',
      'Advanced page layouts and content presentation',
      'Enhanced UI/UX refinement',
      'Additional brand-specific visual elements',
      'Expanded conversion-focused sections',
      'More comprehensive search optimisation foundations',
      'Advanced contact and lead-generation workflows where required',
      'Priority project communication during development',
      'A personalised handover and website walkthrough',
      'Tailored recommendations for future enhancements',
    ],
    notes: [
      'Gold features are proposed and confirmed against the final agreed scope.',
    ],
    emphasis: 'premium',
    cta: 'Choose Gold',
  },
];

export const packageNote =
  'Every project begins with a conversation about your objectives, content, functionality, and timeline. Final scope and any third-party costs will be confirmed before work begins.';
