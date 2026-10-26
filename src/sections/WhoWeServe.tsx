import { audiences } from '../data/home';
import { SectionHeading } from '../components/ui';

export default function WhoWeServe() {
  return (
    <section className="bg-surface py-24 sm:py-28" aria-labelledby="serve-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="07 / Who we serve"
          title="Solutions for Businesses With Something Worth Building."
          copy="Whether you're launching your first website, refining an established brand, producing professional content, or automating repetitive business processes, we help you identify the right solution and execute it with care."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience, index) => (
            <li
              key={audience}
              className="reveal group flex items-center gap-4 bg-white px-6 py-7 transition-colors duration-500 hover:bg-navy"
              style={{ transitionDelay: `${Math.min(index, 7) * 55}ms` }}
            >
              <span className="font-display text-[0.68rem] font-semibold tracking-[0.18em] text-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-[0.98rem] font-medium leading-snug text-navy transition-colors duration-500 group-hover:text-white">
                {audience}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
