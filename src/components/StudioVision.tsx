import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { PROJECTS, STUDIO_META } from '../content/portfolio';
import type { ProjectEntry } from '../lib/atlas';
import { BrandMark } from './StudioHeader';

interface StudioVisionProps {
  readonly onSelectProject: (project: ProjectEntry) => void;
}

const ARCHITECTURAL_EASE = [0.22, 1, 0.36, 1] as const;

export function StudioVision({ onSelectProject }: StudioVisionProps) {
  const visionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: visionRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const copyY = useTransform(scrollYProgress, [0, 1], [24, -10]);

  return (
    <>
      <section
        ref={visionRef}
        id="vision"
        aria-labelledby="vision-heading"
        className="overflow-hidden border-b border-line bg-mist py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-14">
          <motion.div
            style={{ y: headingY }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: ARCHITECTURAL_EASE }}
            className="flex flex-col justify-between will-change-transform"
          >
            <div>
              <div className="mb-4 flex items-center gap-3 font-mono text-[12px] tracking-[0.1em] text-bronze">
                <span aria-hidden="true" className="inline-block h-px w-6 bg-bronze" />
                <span>{STUDIO_META.visionKicker}</span>
              </div>
              <h2
                id="vision-heading"
                className="display-heading max-w-[500px] text-balance text-[clamp(34px,3.6vw,54px)] leading-[1.09] font-medium tracking-[-0.028em] text-ink"
              >
                {STUDIO_META.visionHeading}
              </h2>
            </div>

            <p className="mt-8 font-mono text-[12px] leading-[1.6] text-ink-muted lg:mt-12">
              {STUDIO_META.visionColophon}
            </p>
          </motion.div>

          <motion.div
            style={{ y: copyY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.1, ease: ARCHITECTURAL_EASE }}
            className="max-w-[580px] text-[16px] leading-[1.7] text-ink-secondary will-change-transform"
          >
            {STUDIO_META.visionParagraphs.map((paragraph, idx) => (
              <p key={idx} className={idx > 0 ? 'mt-4' : undefined}>
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="no-print bg-canvas">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-6 px-5 py-8 sm:flex-row sm:items-center sm:px-8 lg:px-14">
          <a
            href="#top"
            aria-label="Ideolect back to top"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2.5 text-[19px] font-semibold tracking-[-0.03em] text-ink transition-opacity duration-200 hover:opacity-80"
          >
            <BrandMark className="h-[22px] w-[20px] text-bronze" />
            <span>{STUDIO_META.brand}</span>
          </a>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-ink-muted">
            {PROJECTS.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => onSelectProject(project)}
                className="min-h-[44px] cursor-pointer whitespace-nowrap transition-colors duration-200 hover:text-ink"
              >
                {project.name}
              </button>
            ))}
          </div>

          <a
            href="#top"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 whitespace-nowrap text-[14px] text-ink-muted transition-colors duration-200 hover:text-ink"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  );
}
