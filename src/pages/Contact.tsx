import { Mail, MessageCircle, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import { useReveal } from '../hooks/useReveal';
import ContactForm from '../components/ContactForm';
import { site } from '../data/site';

const contactCards = [
  {
    label: 'Email',
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: 'Phone',
    value: site.phoneDisplay,
    href: site.phoneHref,
    icon: Phone,
    external: false,
  },
  {
    label: 'WhatsApp',
    value: site.phoneDisplay,
    href: site.whatsappLink,
    icon: MessageCircle,
    external: true,
  },
];

export default function Contact() {
  useReveal();

  return (
    <>
      <Seo
        title="Contact | Nazora Creative Studios"
        description="Tell us what you are building. Contact Nazora Creative Studios by email, phone, WhatsApp, or through the project enquiry form."
        path="/contact"
      />

      <section className="relative overflow-hidden bg-navy pb-16 pt-[132px] sm:pb-20 md:pt-[168px]">
        <div
          aria-hidden="true"
          className="animate-drift absolute -top-28 right-0 h-72 w-72 rounded-full bg-electric/22 blur-[70px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-gold/12 blur-[70px]"
        />
        <div className="shell relative">
          <p className="eyebrow text-gold">Contact</p>
          <h1 className="mt-6 max-w-3xl font-display text-[2.4rem] font-semibold leading-[1.06] text-white sm:text-[3.2rem]">
            Tell Us What You're Building.
          </h1>
          <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-white/64">
            Share your idea, business challenge, or project requirements. We'll use the information to
            understand what you need and identify the next steps.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {contactCards.map((card, index) => (
              <a
                key={card.label}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                className="reveal glass group rounded-2xl p-6 transition-all duration-500 hover:border-gold/40 hover:bg-white/10"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/16 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                  <card.icon size={18} strokeWidth={1.8} />
                </span>
                <p className="mt-5 font-display text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                  {card.label}
                </p>
                <p className="mt-1.5 break-all text-[0.95rem] font-medium text-white">{card.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24" aria-labelledby="enquiry-heading">
        <div className="shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-electric">Project enquiry</p>
            <h2
              id="enquiry-heading"
              className="mt-6 font-display text-[1.9rem] font-semibold leading-[1.14] text-navy sm:text-[2.2rem]"
            >
              Start the Conversation.
            </h2>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-ink/70">
              The form below captures the details we need to prepare a relevant response. If you
              prefer a direct conversation, WhatsApp is usually the fastest route.
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-navy/10 bg-surface p-6">
              <p className="font-display text-[0.86rem] font-semibold text-navy">
                What happens next
              </p>
              <ol className="space-y-3 text-[0.88rem] leading-relaxed text-ink/66">
                <li className="flex gap-3">
                  <span className="font-display text-gold">01</span>
                  We review your requirements and identify the disciplines involved.
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-gold">02</span>
                  We respond using your preferred contact method with clarifying questions.
                </li>
                <li className="flex gap-3">
                  <span className="font-display text-gold">03</span>
                  We confirm scope, timeline, and any third-party costs before work begins.
                </li>
              </ol>
            </div>
          </div>

          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
