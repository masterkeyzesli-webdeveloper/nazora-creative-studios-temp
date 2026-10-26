import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import { useReveal } from '../hooks/useReveal';
import { navItems } from '../data/site';

export default function NotFound() {
  useReveal();

  return (
    <>
      <Seo
        title="Page Not Found | Nazora Creative Studios"
        description="The page you are looking for could not be found."
        path="/404"
      />
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy pt-[112px] pb-24">
        <div
          aria-hidden="true"
          className="animate-drift absolute -top-24 right-0 h-80 w-80 rounded-full bg-electric/20 blur-[70px]"
        />
        <div className="shell relative text-center">
          <p className="font-display text-[5rem] font-bold leading-none text-gold sm:text-[7rem]">404</p>
          <h1 className="mt-6 font-display text-[1.9rem] font-semibold text-white sm:text-[2.4rem]">
            This page could not be found.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-white/60">
            The link may be out of date, or the page may have moved. Everything else is still where
            you left it.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn btn-gold">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <Link to="/contact" className="btn btn-ghost-light">
              Contact Us
            </Link>
          </div>

          <nav aria-label="Popular pages" className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navItems
              .filter((item) => item.to !== '/')
              .map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-[0.86rem] text-white/50 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>
      </section>
    </>
  );
}
