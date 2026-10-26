import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PortfolioFilters, PortfolioGrid, useProjectFilter } from '../components/Portfolio';
import { SectionHeading } from '../components/ui';

export default function SelectedWork() {
  const { filter, setFilter, counts, visible } = useProjectFilter();
  const featured = visible.slice(0, 6);

  return (
    <section className="bg-white py-24 sm:py-28" aria-labelledby="work-heading">
      <div className="shell">
        <div className="reveal flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="04 / Selected work"
            title="Digital Experiences Built Around Real-World Objectives."
            copy="Explore selected websites designed for businesses, educational organizations, construction companies, nonprofits, and service providers."
          />
          <Link to="/projects" className="btn btn-outline-dark shrink-0">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="reveal mt-10">
          <PortfolioFilters active={filter} onChange={setFilter} counts={counts} />
        </div>

        <div className="mt-10">
          <PortfolioGrid items={featured} />
        </div>

        <div className="reveal mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy px-7 py-8 sm:flex-row sm:items-center sm:px-10">
          <div>
            <h3 className="font-display text-[1.3rem] font-semibold text-white sm:text-[1.5rem]">
              Have a Project in Mind?
            </h3>
            <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-white/60">
              Tell us what you are building and what it needs to achieve. We will help you define a
              practical scope and the right next step.
            </p>
          </div>
          <Link to="/contact" className="btn btn-gold shrink-0">
            Start a Project
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
