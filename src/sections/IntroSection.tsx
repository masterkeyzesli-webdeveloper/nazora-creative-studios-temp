import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { pillars } from '../data/home';
import { Eyebrow } from '../components/ui';

export default function IntroSection() {
  return (
    <section className="relative bg-surface py-24 sm:py-28" aria-labelledby="intro-heading">
      <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="reveal">
          <Eyebrow>01 / Who we are</Eyebrow>
          <h2
            id="intro-heading"
            className="mt-6 font-display text-[2rem] font-semibold leading-[1.12] text-navy sm:text-[2.5rem]"
          >
            A Creative Studio. A Technology Partner. A Growth Enabler.
          </h2>
          <Link to="/about" className="btn btn-dark mt-9">
            Discover Nazora
            <ArrowRight size={16} />
          </Link>
        </div>

        <div>
          <div className="reveal space-y-5 text-[1.02rem] leading-relaxed text-ink/74">
            <p>
              Nazora Creative Studios brings design, technology, and digital media together to help
              businesses communicate more effectively, create meaningful customer experiences, and
              operate with greater precision.
            </p>
            <p>
              We approach every engagement with intentionality: understanding the client's
              objectives, identifying the right solution, and executing with attention to detail from
              concept to delivery.
            </p>
          </div>

          <dl className="mt-10 divide-y divide-navy/10 border-t border-navy/10">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="reveal group flex gap-6 py-6"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span className="mt-1 font-display text-[0.72rem] font-semibold tracking-[0.2em] text-gold">
                  0{index + 1}
                </span>
                <div>
                  <dt className="font-display text-[1.08rem] font-semibold text-navy transition-colors duration-300 group-hover:text-electric">
                    {pillar.title}
                  </dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink/68">{pillar.body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
