import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import { useReveal } from '../hooks/useReveal';
import { PortfolioFilters, PortfolioGrid, useProjectFilter } from '../components/Portfolio';
import { CtaSection } from '../components/ui';

export default function Projects() {
  useReveal();
  const { filter, setFilter, counts, visible } = useProjectFilter();

  return (
    <>
      <Seo
        title="Projects | Nazora Creative Studios"
        description="Explore selected digital projects serving business, construction, education, procurement, and nonprofit needs across Kenya and beyond."
        path="/projects"
      />

      <section className="relative overflow-hidden bg-navy pb-16 pt-[132px] sm:pb-20 md:pt-[168px]">
        <div
          aria-hidden="true"
          className="animate-drift absolute -top-32 right-0 h-72 w-72 rounded-full bg-electric/22 blur-[70px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '84px 84px',
            maskImage: 'radial-gradient(80% 70% at 20% 10%, black, transparent)',
          }}
        />
        <div className="shell relative">
          <p className="eyebrow text-gold">Selected work</p>
          <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.06] text-white sm:text-[3.2rem]">
            Our Work, Across Industries.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-white/64">
            Explore a selection of digital projects serving business, construction, education,
            procurement, and nonprofit needs.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="shell">
          <PortfolioFilters active={filter} onChange={setFilter} counts={counts} />

          <p className="mt-6 text-[0.85rem] text-muted" role="status">
            Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
            {filter !== 'All Projects' ? ` in ${filter}` : ''}.
          </p>

          <div className="mt-8">
            <PortfolioGrid items={visible} variant="compact" />
          </div>

          <div className="reveal mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-navy/10 bg-surface px-7 py-8 sm:flex-row sm:items-center sm:px-10">
            <div>
              <h2 className="font-display text-[1.25rem] font-semibold text-navy">
                Want a project like these?
              </h2>
              <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-ink/66">
                Every engagement begins with your objectives, audience, and requirements — then a
                scope that fits.
              </p>
            </div>
            <Link to="/contact" className="btn btn-dark shrink-0">
              Start a Project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        title="Let's Discuss What You Are Building."
        copy="Share your objectives and requirements, and we will help you identify the right next step."
        primaryLabel="Start a Project"
        primaryTo="/contact"
        secondaryLabel="Explore Services"
        secondaryTo="/services"
      />
    </>
  );
}
