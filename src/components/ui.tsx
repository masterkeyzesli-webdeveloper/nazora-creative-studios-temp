import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { site, whatsappLink } from '../data/site';

export function Eyebrow({ children, tone = 'electric' }: { children: ReactNode; tone?: 'electric' | 'gold' | 'white' }) {
  const color = tone === 'gold' ? 'text-gold' : tone === 'white' ? 'text-white/60' : 'text-electric';
  return <p className={`eyebrow ${color}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = 'left',
  tone = 'dark',
  eyebrowTone,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  eyebrowTone?: 'electric' | 'gold' | 'white';
}) {
  const isLight = tone === 'light';
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Eyebrow tone={eyebrowTone ?? (isLight ? 'white' : 'electric')}>{eyebrow}</Eyebrow>
      )}
      <h2
        className={`mt-5 font-display text-[2rem] font-semibold leading-[1.12] sm:text-[2.6rem] lg:text-[3rem] ${
          isLight ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-5 text-[1.02rem] leading-relaxed sm:text-[1.08rem] ${
            isLight ? 'text-white/68' : 'text-ink/70'
          } ${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

export function CtaSection({
  eyebrow,
  title,
  copy,
  primaryLabel = 'Start a Project',
  primaryTo = '/contact',
  secondaryLabel,
  secondaryHref,
  secondaryTo,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-electric/22 blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-gold/12 blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(70% 60% at 50% 40%, black, transparent)',
        }}
      />

      <div className="shell relative text-center">
        {eyebrow && <Eyebrow tone="gold">{eyebrow}</Eyebrow>}
        <h2 className="mx-auto mt-6 max-w-3xl font-display text-[2.1rem] font-semibold leading-[1.1] text-white sm:text-[3rem] lg:text-[3.4rem]">
          {title}
        </h2>
        {copy && <p className="mx-auto mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-white/66">{copy}</p>}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {primaryTo && (
            <Link to={primaryTo} className="btn btn-gold w-full !py-4 sm:w-auto">
              {primaryLabel}
              <ArrowRight size={16} />
            </Link>
          )}
          {secondaryTo && (
            <Link to={secondaryTo} className="btn btn-ghost-light w-full !py-4 sm:w-auto">
              {secondaryLabel}
              <ArrowUpRight size={16} />
            </Link>
          )}
          {secondaryHref && (
            <a
              href={secondaryHref}
              target={secondaryHref.startsWith('http') ? '_blank' : undefined}
              rel={secondaryHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="btn btn-ghost-light w-full !py-4 sm:w-auto"
            >
              <MessageCircle size={16} />
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function WhatsAppInline({ message, label = 'Chat on WhatsApp' }: { message?: string; label?: string }) {
  return (
    <a
      href={message ? whatsappLink(message) : site.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/45 px-5 py-2.5 font-display text-[0.85rem] font-semibold text-[#128C4A] transition-colors duration-300 hover:bg-[#25D366] hover:text-white"
    >
      <MessageCircle size={15} />
      {label}
    </a>
  );
}
