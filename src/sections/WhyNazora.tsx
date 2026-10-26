import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { differentiators } from '../data/home';
import { Eyebrow } from '../components/ui';

export default function WhyNazora() {
  return (
    <section className="bg-white py-24 sm:py-28" aria-labelledby="why-heading">
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>06 / Why choose us</Eyebrow>
          <h2
            id="why-heading"
            className="mt-6 font-display text-[2rem] font-semibold leading-[1.12] text-navy sm:text-[2.5rem]"
          >
            A Thoughtful Approach to Every Digital Detail.
          </h2>
          <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-ink/70">
            These principles shape how we scope work, make decisions, and communicate throughout a
            project.
          </p>
          <Link to="/about" className="btn btn-dark mt-8">
            Our Approach
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="reveal card card-hover group p-6"
              style={{ transitionDelay: `${Math.min(index, 5) * 70}ms` }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/6 text-navy transition-colors duration-500 group-hover:bg-electric group-hover:text-white">
                <Check size={16} strokeWidth={2.6} />
              </span>
              <h3 className="mt-5 font-display text-[1.04rem] font-semibold text-navy">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink/66">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
