import { useEffect, useRef, useState } from 'react';

/**
 * Observes elements carrying the `reveal` class and adds `is-visible`
 * when they enter the viewport. Elements already in view on mount
 * animate immediately, and the hook respects reduced-motion users
 * (handled in CSS).
 */
export function useReveal() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    targets.forEach((el) => {
      if (!el.classList.contains('is-visible')) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ready]);

  return ready;
}

/** Stagger helper for grids: returns an inline transition-delay. */
export function stagger(index: number, base = 70, offset = 60) {
  return `${base + index * offset}ms`;
}

/** Tracks whether an element is hovered, for card-level animation. */
export function useHover<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const on = () => setHovered(true);
    const off = () => setHovered(false);
    node.addEventListener('mouseenter', on);
    node.addEventListener('mouseleave', off);
    return () => {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mouseleave', off);
    };
  }, []);
  return { ref, hovered };
}
