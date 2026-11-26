import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * Initializes a single persistent Lenis smooth-scroll instance while honoring
 * prefers-reduced-motion, and cleanly pauses/resumes scrolling when modals open
 * without tearing down or resetting scroll position.
 */
export function useSmoothScroll(locked: boolean): void {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };
    frameId = window.requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const destination = document.querySelector(hash);
      if (destination instanceof HTMLElement) {
        event.preventDefault();
        lenis.scrollTo(destination, { offset: hash === '#top' ? 0 : -72 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (locked) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [locked]);
}
