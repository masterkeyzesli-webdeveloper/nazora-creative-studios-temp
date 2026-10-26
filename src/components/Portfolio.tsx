import { useMemo, useState } from 'react';
import { categoryFilters, projects, type ProjectCategory } from '../data/projects';
import ProjectCard from './ProjectCard';

type Filter = (typeof categoryFilters)[number];

export function PortfolioFilters({
  active,
  onChange,
  counts,
}: {
  active: Filter;
  onChange: (filter: Filter) => void;
  counts: Record<string, number>;
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      {categoryFilters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-full border px-4 py-2.5 font-display text-[0.78rem] font-medium transition-all duration-300 ${
              isActive
                ? 'border-navy bg-navy text-white shadow-[0_12px_24px_-14px_rgba(8,20,38,0.9)]'
                : 'border-navy/14 bg-white text-ink/70 hover:border-navy/40 hover:text-navy'
            }`}
          >
            {filter}
            <span className={`ml-2 text-[0.7rem] ${isActive ? 'text-gold' : 'text-muted'}`}>
              {counts[filter] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function useProjectFilter() {
  const [filter, setFilter] = useState<Filter>('All Projects');

  const counts = useMemo(() => {
    const map: Record<string, number> = { 'All Projects': projects.length };
    categoryFilters.forEach((category) => {
      if (category !== 'All Projects') {
        map[category] = projects.filter((p) => p.category === (category as ProjectCategory)).length;
      }
    });
    return map;
  }, []);

  const visible = useMemo(
    () =>
      filter === 'All Projects'
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  return { filter, setFilter, counts, visible };
}

export function PortfolioGrid({ items, variant = 'grid' }: { items: typeof projects; variant?: 'grid' | 'compact' }) {
  return (
    <div
      className={`grid gap-6 md:gap-7 ${
        variant === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
      }`}
    >
      {items.map((project, index) => (
        <div
          key={project.id}
          className="reveal"
          style={{ transitionDelay: `${Math.min(index, 6) * 70}ms` }}
        >
          <ProjectCard project={project} variant={variant} />
        </div>
      ))}
    </div>
  );
}
