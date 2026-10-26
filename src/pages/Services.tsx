import { Link } from 'react-router-dom';
import { ArrowRight, Check, Users } from 'lucide-react';
import Seo from '../components/Seo';
import { useReveal } from '../hooks/useReveal';
import { services, type Service } from '../data/services';
import { packages } from '../data/packages';
import { CtaSection, Eyebrow } from '../components/ui';

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const reversed = index % 2 === 1;
  const isGold = service.accent === 'gold';

  return (
    <section
      id={service.id}
      aria-labelledby={`${service.id}-heading`}
      className={`scroll-mt-24 py-20 sm:py-24 ${reversed ? 'bg-surface' : 'bg-white'}`}
    >
      <div className="shell grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className={reversed ? 'lg:order-2' : ''}>
          <div className="reveal flex items-center gap-4">
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                isGold ? 'bg-gold/14 text-gold' : 'bg-electric/10 text-electric'
              }`}
            >
              <service.icon size={22} strokeWidth={1.8} />
            </span>
            <span className="font-display text-[0.7rem] font-semibold tracking-[0.22em] text-muted">
              {String(index + 1).padStart(2, '0')} / 08
            </span>
          </div>

          <h2
            id={`${service.id}-heading`}
            className="reveal mt-6 font-display text-[1.9rem] font-semibold leading-[1.14] text-navy sm:text-[2.3rem]"
          >
            {service.title}
          </h2>

          <div className="reveal mt-6 space-y-5 text-[1rem] leading-relaxed text-ink/72">
            {service.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {service.rate && (
            <div className="reveal mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-gold/40 bg-gold/8 px-6 py-5">
              <p className="font-display text-[1.7rem] font-bold leading-none text-navy">
                {service.rate.label}
              </p>
              {service.rate.note && (
                <p className="max-w-sm text-[0.82rem] leading-relaxed text-ink/64">
                  {service.rate.note}
                </p>
              )}
            </div>
          )}

          {service.highlights?.map((highlight) => (
            <div key={highlight.title} className="reveal mt-6 rounded-2xl border border-navy/10 bg-white px-6 py-5">
              <p className="font-display text-[0.86rem] font-semibold text-navy">{highlight.title}</p>
              <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink/66">{highlight.body}</p>
            </div>
          ))}

          <div className="reveal mt-8 flex flex-wrap gap-3">
            <Link
              to={`/contact?service=${service.id}`}
              className={`btn ${isGold ? 'btn-dark' : 'btn-primary'}`}
            >
              Enquire about {service.title.split(' and ')[0]}
              <ArrowRight size={16} />
            </Link>

            {service.id === 'web-design' && (
              <a href="#website-packages" className="btn btn-outline-dark">
                View website packages
              </a>
            )}
          </div>
        </div>

        <div className={`reveal ${reversed ? 'lg:order-1' : ''}`}>
          <div className="card h-full p-7 sm:p-8">
            <h3 className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-electric">
              Typical deliverables
            </h3>
            <ul className="mt-5 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.92rem] leading-snug text-ink/76">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-9 flex items-center gap-2 font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy">
              <Users size={13} className="text-gold" />
              Who benefits
            </h3>
            <ul className="mt-4 space-y-2.5">
              {service.audience.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.9rem] leading-snug text-ink/66">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  useReveal();

  return (
    <>
      <Seo
        title="Services | Nazora Creative Studios"
        description="Web design, web development, graphic design, sound engineering, podcast production, photography, videography, AI automation, and media consulting for organizations in Kenya and beyond."
        path="/services"
      />

      <section className="relative overflow-hidden bg-navy pb-16 pt-[132px] sm:pb-20 md:pt-[168px]">
        <div
          aria-hidden="true"
          className="animate-drift absolute -top-28 -left-24 h-72 w-72 rounded-full bg-electric/22 blur-[70px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-gold/12 blur-[70px]"
        />
        <div className="shell relative">
          <p className="eyebrow text-gold">Our services</p>
          <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.06] text-white sm:text-[3.2rem]">
            Creative and Technical Solutions for a Digital-First World.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-white/64">
            From your brand's first digital impression to the systems that support its growth, Nazora
            Creative Studios provides integrated services shaped around your objectives.
          </p>

          <nav aria-label="Jump to a service" className="mt-10 flex flex-wrap gap-2">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="rounded-full border border-white/18 px-4 py-2 font-display text-[0.76rem] text-white/72 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                {service.title.split(' for ')[0].split(' and ').slice(0, 2).join(' and ')}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}

      {/* Website packages ---------------------------------------------- */}
      <section id="website-packages" className="scroll-mt-24 bg-white py-24 sm:py-28">
        <div className="shell">
          <div className="reveal max-w-3xl">
            <Eyebrow>Website packages</Eyebrow>
            <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.12] text-navy sm:text-[2.5rem]">
              Web Design and Development Packages.
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-ink/70">
              Every website project can be scoped as one of three published packages. Final scope,
              third-party costs, and any hosting or domain arrangements are confirmed in your
              quotation before work begins.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {packages.map((tier, index) => (
              <div
                key={tier.id}
                className="reveal card card-hover flex h-full flex-col p-7"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-semibold text-navy">{tier.name}</h3>
                  <p className="font-display text-[1.35rem] font-bold text-navy">{tier.priceLabel}</p>
                </div>
                <p className="mt-2 font-display text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-electric">
                  {tier.position}
                </p>
                <p className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-ink/66">
                  {tier.shortDescription}
                </p>
                <ul className="mt-5 space-y-2 border-t border-navy/8 pt-5">
                  {tier.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[0.84rem] leading-snug text-ink/70">
                      <Check size={12} strokeWidth={3} className="mt-1 shrink-0 text-electric" />
                      {feature}
                    </li>
                  ))}
                  {tier.features.length > 5 && (
                    <li className="text-[0.8rem] text-muted">
                      + {tier.features.length - 5} more inclusions
                    </li>
                  )}
                </ul>
                <Link
                  to={`/contact?package=${tier.id}`}
                  className="btn btn-dark mt-7 w-full justify-center"
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-service enquiry ----------------------------------------- */}
      <CtaSection
        eyebrow="Combined projects"
        title="Need More Than One Service?"
        copy="Many engagements combine disciplines: a website with a brand identity, a podcast with promotional graphics, or a digital platform with AI-assisted workflows. Tell us the full picture and we will scope it as one coordinated project."
        primaryLabel="Discuss Your Requirements"
        primaryTo="/contact"
        secondaryLabel="See Our Work"
        secondaryTo="/projects"
      />
    </>
  );
}
