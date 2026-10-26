import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { Eyebrow } from '../components/ui';

/**
 * Editorial conversion section.
 *
 * The `testimonials` array below is intentionally empty: verified client
 * feedback will be added here once it has been supplied and approved.
 * The layout supports one featured quote and a grid of additional quotes
 * without any structural change.
 */
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

const testimonials: Testimonial[] = [];

export default function ConversationSection() {
  return (
    <section className="bg-white py-24 sm:py-28" aria-labelledby="conversation-heading">
      <div className="shell">
        <div className="reveal mx-auto max-w-3xl text-center">
          <Eyebrow>09 / Testimonials</Eyebrow>
          <h2
            id="conversation-heading"
            className="mt-6 font-display text-[2.1rem] font-semibold leading-[1.1] text-navy sm:text-[2.7rem]"
          >
            Every Great Project Starts With a Conversation.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-ink/70">
            The best results come from understanding the business before proposing the solution. If
            you are weighing options, planning a launch, or simply exploring what is possible, a
            conversation is the most useful first step.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn btn-primary !py-4 !px-7">
              Discuss Your Needs
              <ArrowRight size={16} />
            </Link>
            <Link to="/projects" className="btn btn-outline-dark !py-4 !px-7">
              See Recent Work
            </Link>
          </div>
        </div>

        {testimonials.length > 0 && (
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="card p-7">
                <Quote size={20} className="text-gold" />
                <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-ink/75">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-navy/8 pt-4">
                  <p className="font-display text-[0.9rem] font-semibold text-navy">{item.name}</p>
                  <p className="text-[0.8rem] text-muted">
                    {item.role}
                    {item.company ? `, ${item.company}` : ''}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
