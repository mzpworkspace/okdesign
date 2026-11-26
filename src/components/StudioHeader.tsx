import { motion, useScroll, useSpring } from 'motion/react';
import { STUDIO_META } from '../content/portfolio';

export function BrandMark({ className = 'w-[26px] h-[28px]' }: { readonly className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 34"
      className={className}
      fill="none"
    >
      <path
        fill="currentColor"
        d="M1 12 15 4v7L1 19zm0 10 14-8v7L1 29zm17-10 13-8v7l-13 8zm0 10 13-8v7l-13 8z"
      />
    </svg>
  );
}

export function StudioHeader() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <header
      id="top"
      className="no-print sticky top-0 z-40 border-b border-line bg-canvas/88 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-8 px-5 sm:px-8 lg:px-14">
        {/* Brand Wordmark */}
        <a
          href="#top"
          aria-label="Ideolect home"
          className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[22px] font-semibold tracking-[-0.045em] text-ink transition-opacity duration-200 hover:opacity-80"
        >
          <BrandMark className="h-[26px] w-[24px] text-bronze" />
          <span>{STUDIO_META.brand}</span>
        </a>

        {/* Primary Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-5 text-[14px] font-medium text-ink-secondary sm:gap-8"
        >
          <a
            href="#systems"
            className="nav-link-underline inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap transition-colors duration-200 hover:text-ink"
          >
            Systems
          </a>
          <a
            href="#architecture"
            className="nav-link-underline hidden min-h-[44px] shrink-0 items-center whitespace-nowrap transition-colors duration-200 hover:text-ink sm:inline-flex"
          >
            Architecture
          </a>
          <a
            href="#principles"
            className="nav-link-underline hidden min-h-[44px] shrink-0 items-center whitespace-nowrap transition-colors duration-200 hover:text-ink md:inline-flex"
          >
            Principles
          </a>
          <a
            href="#vision"
            className="nav-link-underline inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap transition-colors duration-200 hover:text-ink"
          >
            Vision
          </a>
        </nav>
      </div>

      {/* Hairline scroll-depth indicator */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothProgress }}
        className="pointer-events-none absolute right-0 bottom-[-1px] left-0 h-[1.5px] origin-left bg-ink/75"
      />
    </header>
  );
}
