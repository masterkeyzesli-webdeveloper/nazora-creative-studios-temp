import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { faqs } from '../data/faqs';
import FaqAccordion from '../components/FaqAccordion';
import { SectionHeading } from '../components/ui';

export default function FaqSection() {
  return (
    <section className="bg-surface py-24 sm:py-28" aria-labelledby="faq-heading">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="10 / Questions"
            title="Frequently Asked Questions."
            copy="Straight answers about services, packages, production rates, and how to get started."
          />
          <Link to="/contact" className="btn btn-dark mt-8">
            Ask a Question
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="reveal">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
