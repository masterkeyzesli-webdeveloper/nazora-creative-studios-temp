import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navItems, site } from '../data/site';

function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-baseline gap-1.5 leading-none">
      <span
        className={`font-display text-[1.35rem] font-700 tracking-[0.06em] ${
          inverted ? 'text-white' : 'text-navy'
        }`}
        style={{ fontWeight: 700 }}
      >
        NAZORA
      </span>
      <span
        className={`hidden text-[0.62rem] font-500 uppercase tracking-[0.34em] sm:inline ${
          inverted ? 'text-gold' : 'text-gold'
        }`}
        style={{ fontWeight: 500 }}
      >
        Creative Studios
      </span>
    </span>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        scrolled || open
          ? 'bg-navy/92 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="shell flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
        <Link to="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Wordmark inverted />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `font-display text-[0.9rem] font-medium transition-colors duration-300 ${
                  isActive ? 'text-gold' : 'text-white/78 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative py-2">
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn btn-gold hidden !py-3 !px-6 md:inline-flex">
            Start a Project
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/60 hover:bg-white/10 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!open}
        className="border-t border-white/10 bg-navy/98 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-6">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}
              className={({ isActive }) =>
                `reveal-mob flex items-center justify-between border-b border-white/8 py-4 font-display text-xl font-medium transition-all duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                } ${isActive ? 'text-gold' : 'text-white'}`
              }
            >
              {item.label}
              <ArrowUpRight size={18} className="text-white/40" />
            </NavLink>
          ))}
          <Link
            to="/contact"
            className={`btn btn-gold mt-6 w-full transition-all duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{ transitionDelay: open ? '320ms' : '0ms' }}
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
