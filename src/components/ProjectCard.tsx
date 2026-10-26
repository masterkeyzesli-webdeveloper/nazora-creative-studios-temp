import { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';

const categoryTint: Record<string, string> = {
  Corporate: '#2864FF',
  Construction: '#D8B46A',
  Education: '#5A89FF',
  Procurement: '#8A94A6',
  'Nonprofit and Ministry': '#D8B46A',
};

function domainOf(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/**
 * Project thumbnails are genuine screenshots where they could be captured
 * reliably. Where a capture is not available, a designed representative
 * panel is shown instead — no fabricated client artwork.
 */
function Preview({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const tint = categoryTint[project.category] ?? '#2864FF';

  if (project.thumbnail && !failed) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy">
        <img
          src={project.thumbnail}
          alt={project.alt}
          loading="lazy"
          decoding="async"
          width={1200}
          height={750}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden bg-navy p-5 sm:p-7"
      style={{
        backgroundImage: `radial-gradient(120% 90% at 12% 0%, ${tint}33 0%, transparent 55%), linear-gradient(160deg, #081426 0%, #0c1b33 55%, #111318 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="relative flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-3 truncate font-display text-[0.68rem] uppercase tracking-[0.2em] text-white/45">
          Live site
        </span>
      </div>
      <div className="relative">
        <p
          className="font-display text-lg font-semibold leading-snug text-white sm:text-xl"
          style={{ color: tint === '#D8B46A' ? '#E9D4A5' : undefined }}
        >
          {project.name}
        </p>
        <p className="mt-1 font-display text-[0.7rem] tracking-[0.16em] text-white/45">
          {domainOf(project.url)}
        </p>
      </div>
      <span className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full opacity-30 blur-2xl" style={{ background: tint }} />
    </div>
  );
}

export default function ProjectCard({ project, variant = 'grid' }: { project: Project; variant?: 'grid' | 'compact' }) {
  const detail = variant === 'grid';
  return (
    <article className="group card card-hover flex h-full flex-col overflow-hidden">
      <Preview project={project} />
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-electric/25 bg-electric/6 px-3 py-1 font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-electric">
            {project.category}
          </span>
          <span className="text-xs text-muted">{project.industry}</span>
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold text-navy">{project.name}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/72">{project.description}</p>

        {detail && (
          <ul className="mt-4 space-y-2 border-t border-navy/8 pt-4">
            {project.overview.map((paragraph) => (
              <li key={paragraph} className="text-sm leading-relaxed text-ink/62">
                {paragraph}
              </li>
            ))}
          </ul>
        )}

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-auto inline-flex items-center gap-2 self-start pt-6 font-display text-sm font-semibold text-navy transition-colors duration-300 hover:text-electric"
        >
          View Live Website
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/6 text-navy transition-all duration-300 group-hover:bg-electric group-hover:text-white">
            <ExternalLink size={14} strokeWidth={2.2} />
          </span>
          <ArrowUpRight size={0} className="hidden" />
        </a>
      </div>
    </article>
  );
}
