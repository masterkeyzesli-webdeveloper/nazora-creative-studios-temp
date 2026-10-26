import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { packages, packageNote } from '../data/packages';
import PricingCard from '../components/PricingCard';
import { SectionHeading } from '../components/ui';

export default function PackagesSection() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-28" aria-labelledby="packages-heading">
      <div
        aria-hidden="true"
        className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-electric/6 blur-[70px]"
      />
      <div className="shell relative">
        <SectionHeading
          eyebrow="03 / Website solutions"
          title="The Right Website for Your Next Stage of Growth."
          copy="Choose a website package that aligns with your goals. Every tier is designed to establish a professional digital presence, with additional capabilities and support available as your requirements evolve."
          align="center"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {packages.map((tier, index) => (
            <div key={tier.id} className="reveal" style={{ transitionDelay: `${index * 110}ms` }}>
              <PricingCard tier={tier} />
            </div>
          ))}
        </div>

        <div className="reveal mx-auto mt-14 max-w-3xl rounded-2xl border border-navy/10 bg-white/70 px-6 py-5 text-center backdrop-blur-sm">
          <p className="text-[0.9rem] leading-relaxed text-ink/70">{packageNote}</p>
        </div>

        <div className="reveal mt-10 flex justify-center">
          <Link to="/contact" className="btn btn-dark !py-4 !px-8">
            Not Sure Which Package Fits? Let's Talk.
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
