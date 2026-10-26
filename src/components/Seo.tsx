import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
};

const ORIGIN = 'https://nazoracreativestudios.com';
/**
 * Share images resolve against the current deployment origin so that social
 * previews never request a file on a domain that is not live yet. Point this
 * (and ORIGIN, canonical tags, robots.txt and sitemap.xml) at the confirmed
 * production domain once it is connected.
 */
const SHARE_ORIGIN = 'https://site-c09746be39d84def8f6037bb362212c9.freebuff.page';

function setMeta(selector: string, attribute: string, key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

/**
 * Sets the document title and social/meta tags per route.
 * Canonical URLs point at the production domain configured in src/data/site.ts
 * and can be updated once the final domain is confirmed.
 */
export default function Seo({ title, description, path = '/', image = '/og-image.png', type = 'website' }: SeoProps) {
  const location = useLocation();
  const url = `${ORIGIN}${location.pathname}${location.search}`;

  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:image"]', 'property', 'og:image', `${SHARE_ORIGIN}${image}`);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', `${SHARE_ORIGIN}${image}`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${ORIGIN}${path}`;
  }, [title, description, url, image, type, path]);

  return null;
}

/** Scroll restoration and focus management for route changes. */
export function useScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);
}
