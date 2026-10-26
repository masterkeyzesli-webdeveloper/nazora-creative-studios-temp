import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import type { PackageTier } from '../data/packages';

export default function PricingCard({ tier }: { tier: PackageTier }) {
  const recommended = tier.emphasis === 'recommended';
  const premium = tier.emphasis === 'premium';

  return (
    <div
      className={`relative flex h-full flex-col rounded-[1.6rem] border p-7 transition-all duration-500 sm:p-8 ${
        recommended
          ? 'border-transparent bg-navy text-white shadow-[0_40px_80px_-40px_rgba(8,20,38,0.85)] lg:-mt-6 lg:mb-6'
          : 'border-navy/10 bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lift)]'
      }`}
    >
      {recommended && (
        <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1.5 font-display text-[0.62rem] font-bold uppercase tracking-[0.16em] text-navy">
          <Star size={11} fill="currentColor" strokeWidth={0} />
          Recommended
        </span>
      )}
      {premium && (
        <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-white px-3.5 py-1.5 font-display text-[0.62rem] font-bold uppercase tracking-[0.16em] text-gold">
          Premium experience
        </span>
      )}

      <p className={`font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] ${recommended ? 'text-gold' : 'text-electric'}`}>
        {tier.position}
      </p>
      <h3 className={`mt-3 font-display text-2xl font-semibold ${recommended ? 'text-white' : 'text-navy'}`}>
        {tier.name}
      </h3>

      <p className={`mt-4 font-display text-[2.4rem] font-bold leading-none ${recommended ? 'text-white' : 'text-navy'}`}>
        {tier.priceLabel}
      </p>
      <p className={`mt-2 text-[0.85rem] ${recommended ? 'text-white/60' : 'text-muted'}`}>
        One-off website package
      </p>

      <p className={`mt-5 text-[0.9rem] leading-relaxed ${recommended ? 'text-white/72' : 'text-ink/70'}`}>
        {tier.shortDescription}
      </p>

      <ul className="mt-7 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[0.88rem] leading-snug">
            <span
              className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
                recommended ? 'bg-gold/20 text-gold' : 'bg-electric/10 text-electric'
              }`}
              style={{ height: 18, width: 18 }}
            >
              <Check size={11} strokeWidth={3} />
            </span>
            <span className={recommended ? 'text-white/82' : 'text-ink/78'}>{feature}</span>
          </li>
        ))}
      </ul>

      {tier.notes && (
        <ul className={`mt-6 space-y-1.5 border-t pt-5 text-[0.76rem] leading-relaxed ${recommended ? 'border-white/12 text-white/50' : 'border-navy/8 text-muted'}`}>
          {tier.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}

      <Link
        to={`/contact?package=${tier.id}`}
        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-[0.9rem] font-semibold transition-all duration-300 ${
          recommended
            ? 'bg-gold text-navy hover:bg-[#e3c483]'
            : 'bg-navy text-white hover:bg-[#0f2140]'
        }`}
      >
        {tier.cta}
      </Link>
    </div>
  );
}
