import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Eye, Target } from 'lucide-react';
import Seo from '../components/Seo';
import { useReveal } from '../hooks/useReveal';
import { values } from '../data/home';
import { CtaSection, SectionHeading } from '../components/ui';

const approach = [
  {
    title: 'Discovery',
    body: 'We begin by understanding the business, the audience, the constraints, and what a successful outcome actually looks like.',
  },
  {
    title: 'Planning',
    body: 'Requirements are translated into a defined scope, a content and feature plan, and a direction the client can review before production begins.',
  },
  {
    title: 'Execution',
    body: 'Design, development, and production work proceeds in visible stages, so decisions are made with context rather than at the end.',
  },
  {
    title: 'Testing',
    body: 'Functionality, responsiveness, accessibility, and content accuracy are reviewed before anything is presented as finished.',
  },
  {
    title: 'Delivery',
    body: 'The final work is handed over with clear guidance, along with the agreed support and recommendations for what comes next.',
  },
];

export default function About() {
  useReveal();

  return (
    <>
      <Seo
        title="About Us | Nazora Creative Studios"
        description="Nazora Creative Studios is a creative technology studio helping businesses and organizations communicate their value through design, technology, and media."
        path="/about"
      />

      <section className="relative overflow-hidden bg-navy pb-20 pt-[132px] md:pt-[168px]">
        <div
          aria-hidden="true"
          className="animate-drift absolute -top-32 right-0 h-72 w-72 rounded-full bg-electric/20 blur-[70px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-gold/10 blur-[70px]"
        />
        <div className="shell relative">
          <p className="eyebrow text-gold">About Nazora</p>
          <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.06] text-white sm:text-[3.2rem]">
            We Believe Great Digital Work Begins With Understanding.
          </h1>
          <div className="mt-8 max-w-2xl space-y-5 text-[1.02rem] leading-relaxed text-white/64">
            <p>
              Nazora Creative Studios is a creative technology studio dedicated to helping businesses
              and organizations communicate their value, strengthen their digital presence, and
              explore new possibilities through design, technology, and media.
            </p>
            <p>
              We bring an intentional approach to every engagement, combining creativity with
              practical execution and keeping the client's objectives at the centre of the process.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="shell grid gap-6 md:grid-cols-2">
          <div className="reveal card p-8 sm:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-electric/10 text-electric">
              <Target size={20} strokeWidth={1.8} />
            </span>
            <h2 className="mt-6 font-display text-[1.4rem] font-semibold text-navy">Our mission</h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink/72">
              To deliver thoughtful, high-quality digital and creative solutions that help businesses
              communicate clearly, operate effectively, and pursue sustainable growth.
            </p>
          </div>

          <div className="reveal card p-8 sm:p-10" style={{ transitionDelay: '110ms' }}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/14 text-gold">
              <Eye size={20} strokeWidth={1.8} />
            </span>
            <h2 className="mt-6 font-display text-[1.4rem] font-semibold text-navy">Our vision</h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink/72">
              To become a trusted creative technology partner for ambitious businesses and
              organizations across Africa and the wider international market.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-24" aria-labelledby="values-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="Our values"
            title="The Principles Behind the Work."
            copy="Six commitments that shape how we make decisions, communicate, and deliver."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <li
                key={value}
                className="reveal group flex items-baseline gap-4 bg-white px-7 py-8 transition-colors duration-500 hover:bg-navy"
                style={{ transitionDelay: `${Math.min(index, 5) * 60}ms` }}
              >
                <span className="font-display text-[0.68rem] font-semibold tracking-[0.2em] text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[1.12rem] font-medium text-navy transition-colors duration-500 group-hover:text-white">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden bg-charcoal py-24 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-electric/18 blur-[70px]"
        />
        <div className="shell relative">
          <div className="reveal mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/14 text-gold">
              <Compass size={21} strokeWidth={1.7} />
            </span>
            <p className="eyebrow mt-7 justify-center text-white/50">Our philosophy</p>
            <blockquote className="mt-6 font-display text-[1.6rem] font-medium leading-[1.35] text-white sm:text-[2.1rem]">
              “Good design attracts attention. Good engineering makes the experience work. Good
              strategy connects both to a meaningful objective.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-white py-24 sm:py-28" aria-labelledby="approach-heading">
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="How we work"
              title="From Understanding to Delivery."
              copy="Every engagement follows a defined path, so you always know what stage the project is in and what comes next."
            />
            <Link to="/projects" className="btn btn-dark mt-8">
              See the results
              <ArrowRight size={16} />
            </Link>
          </div>

          <ol className="relative space-y-8 border-l border-navy/12 pl-8">
            {approach.map((step, index) => (
              <li key={step.title} className="reveal relative">
                <span className="absolute -left-[46px] flex h-9 w-9 items-center justify-center rounded-full border border-navy/12 bg-white font-display text-[0.76rem] font-semibold text-navy">
                  {index + 1}
                </span>
                <h3 className="font-display text-[1.08rem] font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/68">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection
        eyebrow="Work with us"
        title="Let's Build Something Worth Remembering."
        copy="Share your objectives and we will help you shape the right approach, scope, and next step."
        primaryLabel="Start a Project"
        primaryTo="/contact"
        secondaryLabel="Explore Our Work"
        secondaryTo="/projects"
      />
    </>
  );
}
