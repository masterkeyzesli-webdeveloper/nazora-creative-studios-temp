import Seo from '../components/Seo';
import { useReveal } from '../hooks/useReveal';
import Hero from '../sections/Hero';
import IntroSection from '../sections/IntroSection';
import ServicesOverview from '../sections/ServicesOverview';
import PackagesSection from '../sections/PackagesSection';
import SelectedWork from '../sections/SelectedWork';
import ProcessSection from '../sections/ProcessSection';
import WhyNazora from '../sections/WhyNazora';
import WhoWeServe from '../sections/WhoWeServe';
import AiSpotlight from '../sections/AiSpotlight';
import ConversationSection from '../sections/ConversationSection';
import FaqSection from '../sections/FaqSection';
import { CtaSection } from '../components/ui';

export default function Home() {
  useReveal();

  return (
    <>
      <Seo
        title="Nazora Creative Studios | Web Design, Development & Digital Solutions"
        description="Nazora Creative Studios delivers web design, web development, graphic design, podcast production, audiovisual services, and AI automation for businesses and organizations in Kenya and beyond."
        path="/"
      />
      <Hero />
      <IntroSection />
      <ServicesOverview />
      <PackagesSection />
      <SelectedWork />
      <ProcessSection />
      <WhyNazora />
      <WhoWeServe />
      <AiSpotlight />
      <ConversationSection />
      <FaqSection />
      <CtaSection
        eyebrow="Let's build"
        title="Your Next Big Idea Deserves an Exceptional Execution."
        copy="Let's turn your objectives into a clear plan and build something that moves your business forward."
        primaryLabel="Start a Project"
        primaryTo="/contact"
        secondaryLabel="Chat on WhatsApp"
        secondaryHref="https://wa.me/254707646476?text=Hello%20Nazora%20Creative%20Studios.%20I%20would%20like%20to%20enquire%20about%20your%20services%20and%20discuss%20a%20possible%20project."
      />
    </>
  );
}
