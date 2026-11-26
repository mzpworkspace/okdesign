import { motion, useScroll, useSpring } from 'motion/react';
import { FileText } from 'lucide-react';
import { STUDIO_META } from '../content/portfolio';

interface StudioHeaderProps {
  readonly onOpenStudioBrief: () => void;
}

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

export function StudioHeader({ onOpenStudioBrief }: StudioHeaderProps) {
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
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          aria-label="Ideolect home"
          className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[22px] font-semibold tracking-[-0.045em] text-ink transition-opacity duration-200 hover:opacity-80"
        >
          <BrandMark className="h-[26px] w-[24px] text-bronze" />
          <span>{STUDIO_META.brand}</span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 text-[14px] font-medium text-ink-secondary md:flex"
        >
          <a
            href="#systems"
            className="nav-link-underline shrink-0 whitespace-nowrap py-2 transition-colors duration-200 hover:text-ink"
          >
            Systems
          </a>
          <a
            href="#architecture"
            className="nav-link-underline shrink-0 whitespace-nowrap py-2 transition-colors duration-200 hover:text-ink"
          >
            Architecture
          </a>
          <a
            href="#principles"
            className="nav-link-underline shrink-0 whitespace-nowrap py-2 transition-colors duration-200 hover:text-ink"
          >
            Principles
          </a>
          <a
            href="#vision"
            className="nav-link-underline shrink-0 whitespace-nowrap py-2 transition-colors duration-200 hover:text-ink"
          >
            Vision
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex shrink-0 items-center">
          <motion.button
            type="button"
            onClick={onOpenStudioBrief}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[5px] border border-line-strong bg-surface px-4 py-2 text-[14px] font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-canvas"
          >
            <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Studio brief</span>
          </motion.button>
        </div>
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
