import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Waves, Workflow } from 'lucide-react';

function BrowserMock() {
  return (
    <div className="relative w-full max-w-[520px]">
      {/* Browser window */}
      <div className="glass overflow-hidden rounded-2xl shadow-[0_50px_100px_-40px_rgba(0,0,0,0.75)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/6 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="ml-3 truncate rounded-full bg-white/8 px-3 py-1 text-[0.62rem] tracking-wide text-white/45">
            yourbrand.co.ke
          </span>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <span className="h-2.5 w-16 rounded-full bg-gold/70" />
            <span className="flex gap-1.5">
              <span className="h-2 w-8 rounded-full bg-white/15" />
              <span className="h-2 w-8 rounded-full bg-white/15" />
              <span className="h-2 w-10 rounded-full bg-electric/70" />
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <span className="block h-3.5 w-[85%] rounded-md bg-white/82" />
            <span className="block h-3.5 w-[62%] rounded-md bg-white/62" />
            <span className="block h-2 w-[74%] rounded-md bg-white/18" />
            <span className="block h-2 w-[66%] rounded-md bg-white/14" />
          </div>

          <div className="flex gap-2 pt-1">
            <span className="h-7 w-24 rounded-full bg-electric" />
            <span className="h-7 w-20 rounded-full border border-white/25" />
          </div>

          <div className="grid grid-cols-3 gap-2.5 pt-2">
            {[
              { accent: 'bg-electric/70' },
              { accent: 'bg-gold/60' },
              { accent: 'bg-white/20' },
            ].map((card, index) => (
              <div key={index} className="rounded-xl bg-white/6 p-2.5">
                <span className={`block h-6 w-6 rounded-lg ${card.accent}`} />
                <span className="mt-2.5 block h-1.5 w-full rounded-full bg-white/22" />
                <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-white/12" />
              </div>
            ))}
          </div>

          <div className="flex h-16 items-end gap-1.5 rounded-xl bg-white/5 p-3">
            {[38, 55, 30, 72, 48, 88, 60, 44, 76].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-sm"
                style={{
                  height: `${height}%`,
                  background: index % 3 === 0 ? 'rgba(216,180,106,0.85)' : 'rgba(40,100,255,0.75)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating card: production rate */}
      <div className="animate-float absolute -left-6 bottom-16 hidden w-[190px] rounded-2xl border border-white/12 bg-navy/95 p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:block sm:-left-12">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/18 text-gold">
          <Waves size={15} />
        </span>
        <p className="mt-3 font-display text-[0.7rem] uppercase tracking-[0.16em] text-white/45">
          Podcast production
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-white">
          KSh 2,000<span className="text-[0.72rem] font-normal text-white/50"> / hour</span>
        </p>
      </div>

      {/* Floating card: automation */}
      <div
        className="animate-float absolute -right-4 -bottom-8 hidden w-[210px] rounded-2xl border border-white/12 bg-navy/95 p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:block sm:-right-10"
        style={{ animationDelay: '1.6s' }}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-electric/20 text-electric-soft">
            <Workflow size={15} />
          </span>
          <p className="font-display text-[0.7rem] uppercase tracking-[0.16em] text-white/45">
            Automation
          </p>
        </div>
        <div className="mt-3 space-y-1.5">
          {['Enquiry received', 'Categorised & routed', 'Team notified'].map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${index === 2 ? 'bg-gold' : 'bg-electric'}`}
              />
              <span className="text-[0.7rem] text-white/62">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating card: packages */}
      <div className="absolute -top-6 right-4 hidden items-center gap-2 rounded-full border border-white/12 bg-navy/95 px-4 py-2 sm:flex">
        <Sparkles size={13} className="text-gold" />
        <span className="text-[0.7rem] tracking-wide text-white/65">Websites from KSh 15,999</span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-[92px] pb-28 md:pt-[132px] md:pb-32">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="animate-drift absolute -top-24 -left-16 h-80 w-80 rounded-full bg-electric/25 blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="animate-drift absolute -right-12 top-24 h-72 w-72 rounded-full bg-gold/12 blur-[80px]"
        style={{ animationDelay: '4s' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(90% 70% at 30% 20%, black, transparent 80%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy"
      />

      <div className="shell relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p className="eyebrow mt-1 text-gold md:mt-0">
            Nazora Creative Studios | Digital Solutions &amp; Creative Technology
          </p>

          <h1 className="mt-6 font-display text-[2.55rem] font-semibold leading-[1.04] text-white sm:mt-7 sm:text-[3.4rem] lg:text-[3.9rem]">
            We Transform Bold Ideas Into{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-gold-soft via-gold to-electric-soft bg-clip-text text-transparent">
                Extraordinary
              </span>
            </span>{' '}
            Digital Experiences.
          </h1>

          <p className="mt-5 max-w-xl text-[1.03rem] leading-relaxed text-white/66 sm:mt-7 sm:text-[1.1rem]">
            From high-performance websites and distinctive brand identities to professional media
            production and intelligent AI automation, we help ambitious businesses turn their vision
            into a powerful digital reality.
          </p>

          <div className="mt-7 flex flex-col-reverse gap-5 sm:mt-10 sm:flex-col sm:gap-0">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-gold !py-4 !px-7">
                Start Your Project
                <ArrowRight size={16} />
              </Link>
              <Link to="/projects" className="btn btn-ghost-light !py-4 !px-7">
                Explore Our Work
              </Link>
            </div>

            <p className="flex items-center gap-3 text-[0.85rem] leading-relaxed text-white/45 sm:mt-9">
              <span className="hidden h-px w-8 shrink-0 bg-gold/60 sm:block" />
              Built for ambitious businesses, growing organizations, and visionary brands.
            </p>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <BrowserMock />
        </div>
      </div>
    </section>
  );
}
