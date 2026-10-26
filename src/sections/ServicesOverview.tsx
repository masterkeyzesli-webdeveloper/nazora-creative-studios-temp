import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';
import { SectionHeading } from '../components/ui';

export default function ServicesOverview() {
  return (
    <section className="bg-white py-24 sm:py-28" aria-labelledby="services-heading">
      <div className="shell">
        <div className="reveal flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="02 / What we do"
            title="Everything Your Brand Needs to Build, Create, and Scale."
            copy="An integrated collection of digital and creative services, delivered with one commitment: quality without compromise."
          />
          <Link to="/services" className="btn btn-outline-dark shrink-0">
            Explore All Services
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={`/services#${service.id}`}
              className="reveal card card-hover group flex h-full flex-col p-6"
              style={{ transitionDelay: `${Math.min(index, 7) * 60}ms` }}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-500 ${
                  service.accent === 'gold'
                    ? 'bg-gold/14 text-gold group-hover:bg-gold group-hover:text-navy'
                    : 'bg-electric/10 text-electric group-hover:bg-electric group-hover:text-white'
                }`}
              >
                <service.icon size={20} strokeWidth={1.8} />
              </span>

              <h3 className="mt-5 font-display text-[1.06rem] font-semibold leading-snug text-navy">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-ink/66">
                {service.shortDescription}
              </p>

              {service.rate && (
                <p className="mt-4 inline-flex w-fit rounded-full bg-navy/6 px-3 py-1 font-display text-[0.72rem] font-semibold text-navy">
                  {service.rate.label}
                </p>
              )}

              <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[0.8rem] font-semibold text-navy transition-colors duration-300 group-hover:text-electric">
                Learn more
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
