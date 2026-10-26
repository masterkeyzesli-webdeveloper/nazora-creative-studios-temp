import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { navItems, site } from '../data/site';
import { services } from '../data/services';

const serviceLinks = [
  { label: 'Web Design', to: '/services#web-design' },
  { label: 'Web Development', to: '/services#web-development' },
  { label: 'Graphic Design', to: '/services#graphic-design' },
  { label: 'Sound Engineering', to: '/services#sound-engineering' },
  { label: 'Podcast Production', to: '/services#podcast-production' },
  { label: 'Photography and Videography', to: '/services#photography-videography' },
  { label: 'AI and Automation', to: '/services#ai-automation' },
  { label: 'Media Consulting', to: '/services#media-consulting' },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <div className="shell grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-4 lg:gap-10">
        <div className="lg:pr-8">
          <p className="font-display text-lg font-bold tracking-[0.06em]">NAZORA</p>
          <p className="mt-1 font-display text-[0.62rem] uppercase tracking-[0.34em] text-gold">
            Creative Studios
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/62">
            {site.description}
          </p>
          <p className="mt-4 font-display text-sm italic text-white/80">{site.tagline}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col">
          <h2 className="eyebrow text-gold">Explore</h2>
          <ul className="mt-6 space-y-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-white/72 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Our services" className="flex flex-col">
          <h2 className="eyebrow text-gold">Our Services</h2>
          <ul className="mt-6 space-y-3">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-white/72 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col">
          <h2 className="eyebrow text-gold">Get in Touch</h2>
          <ul className="mt-6 space-y-4">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group flex items-start gap-3 text-sm text-white/72 transition-colors hover:text-white"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
                <span className="break-all">{site.email}</span>
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="flex items-start gap-3 text-sm text-white/72 transition-colors hover:text-white"
              >
                <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>{site.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-white/72 transition-colors hover:text-white"
              >
                <MessageCircle size={16} className="mt-0.5 shrink-0 text-gold" />
                <span>WhatsApp: {site.phoneDisplay}</span>
              </a>
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/22 px-5 py-2.5 font-display text-sm font-medium text-white transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Start a Project
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-white/48 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-white/40">
            Serving clients across Kenya, the region, and internationally — {services.length} service
            disciplines under one roof.
          </p>
        </div>
      </div>
    </footer>
  );
}
