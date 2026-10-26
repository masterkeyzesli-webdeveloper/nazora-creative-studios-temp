export type ProjectCategory =
  | 'Corporate'
  | 'Construction'
  | 'Education'
  | 'Procurement'
  | 'Nonprofit and Ministry';

export type Project = {
  id: string;
  name: string;
  industry: string;
  category: ProjectCategory;
  description: string;
  overview: string[];
  url: string;
  /** A genuine screenshot where one could be captured reliably, otherwise a designed placeholder is rendered. */
  thumbnail?: string;
  alt: string;
};

export const categoryFilters: ('All Projects' | ProjectCategory)[] = [
  'All Projects',
  'Corporate',
  'Construction',
  'Education',
  'Procurement',
  'Nonprofit and Ministry',
];

export const projects: Project[] = [
  {
    id: 'jali-ecosystems',
    name: 'Jali Ecosystems Limited',
    industry: 'Asbestos Management, Engineering and Construction',
    category: 'Corporate',
    description:
      'A corporate digital presence for a company operating in asbestos management and construction-related services.',
    overview: [
      'A corporate website presenting a specialist service offering that requires clarity, credibility, and a professional first impression for procurement and facilities teams.',
      'The structure prioritises service explanation and direct enquiry routes so prospective clients can quickly confirm capability and make contact.',
    ],
    url: 'https://jaliecosystems.co.ke',
    thumbnail: undefined,
    alt: 'Homepage of the Jali Ecosystems Limited website',
  },
  {
    id: 'artnation-group',
    name: 'The Artnation Group',
    industry: 'Construction Company',
    category: 'Construction',
    description:
      "A business website showcasing a construction company's services and professional digital presence.",
    overview: [
      'A services-led construction website built to communicate capability, project focus, and contact pathways in a clean, scannable layout.',
      'Content is organised so that a visitor moving from a referral or tender conversation can verify scope within a few scrolls.',
    ],
    url: 'https://theartnationgroup.site/',
    thumbnail: undefined,
    alt: 'Homepage of The Artnation Group website',
  },
  {
    id: 'shiv-construction',
    name: 'Shiv Construction',
    industry: 'Construction Portfolio and Services',
    category: 'Construction',
    description:
      'A construction-focused website presenting company information, service offerings, and portfolio content.',
    overview: [
      'A company site that balances service information with portfolio presentation, giving past work and current capability equal weight.',
      'The layout supports visual proof of delivery while keeping enquiry routes accessible from every page.',
    ],
    url: 'https://shivconstruction.co.ke',
    thumbnail: undefined,
    alt: 'Homepage of the Shiv Construction website',
  },
  {
    id: 'my-school-partner',
    name: 'My School Partner',
    industry: 'Education and Educational Supplies',
    category: 'Education',
    description:
      'An educational business platform supporting the presentation of school technology, learning resources, equipment, and institutional solutions.',
    overview: [
      'A platform-style website that organises a broad education catalogue into sections schools and institutions can navigate easily.',
      'Product and solution presentation is structured for decision-makers comparing options across budget and requirement.',
    ],
    url: 'https://myschoolpartner.co.ke',
    thumbnail: '/thumbnails/my-school-partner.jpg',
    alt: 'Homepage of the My School Partner website',
  },
  {
    id: 'skilite-education',
    name: 'Skilite Education',
    industry: 'Publishing and Educational Technology',
    category: 'Education',
    description:
      'A digital presence for an education and publishing brand operating within the learning and educational technology space.',
    overview: [
      'A brand-led website for a publishing and edtech organisation, designed to present learning products with clarity and consistency.',
      'Navigation supports both institutional buyers and individual educators looking for specific resources.',
    ],
    url: 'https://skiliteducation.com',
    thumbnail: undefined,
    alt: 'Homepage of the Skilite Education website',
  },
  {
    id: 'chrisale-solutions',
    name: 'Chrisale Solutions',
    industry: 'Procurement and Supplies',
    category: 'Procurement',
    description:
      'A procurement and supplies platform designed to communicate business offerings and support customer enquiries.',
    overview: [
      'A business site that presents supply capability and service categories in a way that shortens the path to a request for quotation.',
      'Clear enquiry workflows help the business capture structured information from prospective clients.',
    ],
    url: 'https://chrisalesolutions.co.ke',
    thumbnail: '/thumbnails/chrisale-solutions.jpg',
    alt: 'Homepage of the Chrisale Solutions website',
  },
  {
    id: 'tvogim-kenya',
    name: 'TVOGIM Kenya',
    industry: 'Ministry and Nonprofit Organization',
    category: 'Nonprofit and Ministry',
    description:
      'A ministry and nonprofit-oriented website presenting organizational information, ministry activities, and opportunities for engagement.',
    overview: [
      'An organizational website that communicates mission, activities, and ways to participate without overwhelming the visitor.',
      'Content is arranged so supporters and volunteers can find relevant information and engagement routes quickly.',
    ],
    url: 'https://tvogimkenya.vercel.app',
    thumbnail: undefined,
    alt: 'Homepage of the TVOGIM Kenya website',
  },
];
