import { processSteps } from '../data/home';
import { SectionHeading } from '../components/ui';

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-28" aria-labelledby="process-heading">
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-electric/16 blur-[70px]"
      />
      <div className="shell relative">
        <SectionHeading
          eyebrow="05 / How we work"
          title="Intentional From the First Conversation to the Final Delivery."
          tone="light"
          eyebrowTone="gold"
          copy="A defined process keeps projects predictable. Each stage has a purpose, a set of decisions, and a clear handover into the next."
        />

        {/* Desktop timeline */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute left-0 right-0 top-[26px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <ol className="relative grid grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <li
                key={step.number}
                className="reveal group"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/18 bg-navy font-display text-[0.9rem] font-semibold text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                  {step.number}
                </span>
                <h3 className="mt-6 font-display text-[1.15rem] font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-white/58">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile / vertical */}
        <ol className="relative mt-12 space-y-10 border-l border-white/15 pl-8 md:hidden">
          {processSteps.map((step) => (
            <li key={step.number} className="reveal relative">
              <span className="absolute -left-[52px] flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-navy font-display text-[0.82rem] font-semibold text-gold">
                {step.number}
              </span>
              <h3 className="font-display text-[1.1rem] font-semibold text-white">{step.title}</h3>
              <p className="mt-2.5 text-[0.92rem] leading-relaxed text-white/58">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
