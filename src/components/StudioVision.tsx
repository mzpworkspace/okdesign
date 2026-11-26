import { motion } from 'motion/react';
import { ArrowUp, FileText } from 'lucide-react';
import { PROJECTS, STUDIO_META } from '../content/portfolio';
import type { ProjectEntry } from '../lib/atlas';
import { BrandMark } from './StudioHeader';

interface StudioVisionProps {
  readonly onOpenStudioBrief: () => void;
  readonly onSelectProject: (project: ProjectEntry) => void;
}

const ARCHITECTURAL_EASE = [0.22, 1, 0.36, 1] as const;

export function StudioVision({ onOpenStudioBrief, onSelectProject }: StudioVisionProps) {
  return (
    <>
      <section
        id="vision"
        aria-labelledby="vision-heading"
        className="border-b border-line bg-mist py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: ARCHITECTURAL_EASE }}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="mb-4 flex items-center gap-3 font-mono text-[12px] tracking-[0.1em] text-bronze">
                <span aria-hidden="true" className="inline-block h-px w-6 bg-bronze" />
                <span>{STUDIO_META.visionKicker}</span>
              </div>
              <h2
                id="vision-heading"
                className="max-w-[500px] text-balance text-[clamp(34px,3.6vw,54px)] leading-[1.08] font-medium tracking-[-0.045em] text-ink"
              >
                {STUDIO_META.visionHeading}
              </h2>
            </div>

            <p className="mt-8 font-mono text-[12px] leading-[1.6] text-ink-muted lg:mt-12">
              {STUDIO_META.visionColophon}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.1, ease: ARCHITECTURAL_EASE }}
            className="max-w-[580px] text-[16px] leading-[1.7] text-ink-secondary"
          >
            {STUDIO_META.visionParagraphs.map((paragraph, idx) => (
              <p key={idx} className={idx > 0 ? 'mt-4' : undefined}>
                {paragraph}
              </p>
            ))}

            <motion.button
              type="button"
              onClick={onOpenStudioBrief}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-[5px] border border-ink bg-surface px-5 py-2.5 text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-ink hover:text-canvas"
            >
              <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Read the studio brief</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <footer className="no-print bg-canvas">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-6 px-5 py-8 sm:flex-row sm:items-center sm:px-8 lg:px-14">
          <a
            href="#top"
            aria-label="Ideolect back to top"
            className="inline-flex shrink-0 items-center gap-2.5 text-[19px] font-semibold tracking-[-0.04em] text-ink"
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
