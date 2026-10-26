export const site = {
  name: 'Nazora Creative Studios',
  shortName: 'Nazora',
  tagline: 'Where Vision Becomes Digital Reality.',
  supporting: 'Creative Intelligence. Digital Excellence. Measurable Impact.',
  description:
    'Creative technology and digital solutions designed around your ambitions.',
  email: 'nazoracreativestudioske@gmail.com',
  phoneDisplay: '+254 707 646 476',
  phoneHref: 'tel:+254707646476',
  whatsappNumber: '254707646476',
  whatsappLink:
    'https://wa.me/254707646476?text=' +
    encodeURIComponent(
      'Hello Nazora Creative Studios. I would like to enquire about your services and discuss a possible project.',
    ),
  origin: 'https://nazoracreativestudios.com',
} as const;

export type NavItem = { label: string; to: string };

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
