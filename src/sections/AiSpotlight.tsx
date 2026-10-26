import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Cable, GitBranch } from 'lucide-react';
import { aiFeatures } from '../data/home';
import { SectionHeading } from '../components/ui';

const icons = [Bot, GitBranch, Cable];

export default function AiSpotlight() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 sm:py-28" aria-labelledby="ai-heading">
      <div
        aria-hidden="true"
        className="animate-drift absolute -right-20 -top-20 h-80 w-80 rounded-full bg-electric/22 blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(80% 60% at 70% 30%, black, transparent)',
        }}
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading
              eyebrow="08 / AI & automation"
              title="Make Your Business Work Smarter."
              tone="light"
              eyebrowTone="gold"
              copy="Intelligent automation can help businesses reduce repetitive tasks, organise enquiries, streamline workflows, and deliver more consistent customer experiences. We help identify practical opportunities and design solutions around your existing processes."
            />
            <Link to="/services#ai-automation" className="btn btn-gold mt-9">
              Explore AI and Automation
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {aiFeatures.map((feature, index) => {
              const Icon = icons[index] ?? Bot;
              return (
                <div
                  key={feature.title}
                  className="reveal glass group rounded-2xl p-6 transition-all duration-500 hover:border-gold/35 hover:bg-white/9"
                  style={{ transitionDelay: `${index * 110}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/14 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                      <Icon size={19} strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.05rem] font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-white/60">
                        {feature.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="reveal pt-2 text-[0.78rem] leading-relaxed text-white/40">
              Every proposed automation is scoped and reviewed with the client. We describe an
              integration as delivered only once it has been implemented and tested.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
