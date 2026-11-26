import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, STUDIO_META } from '../content/portfolio';
import type { ProjectEntry } from '../lib/atlas';
import { ArchitecturalMotif } from './ArchitecturalMotif';

interface ProjectIndexProps {
  readonly onSelectProject: (project: ProjectEntry) => void;
}

const ARCHITECTURAL_EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectIndex({ onSelectProject }: ProjectIndexProps) {
  return (
    <section
      id="systems"
      aria-labelledby="systems-heading"
      className="border-b border-line bg-canvas py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        {/* Section Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: ARCHITECTURAL_EASE }}
          className="mb-10 flex flex-col items-start justify-between gap-5 md:mb-12 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono text-[12px] tracking-[0.1em] text-bronze">
              <span aria-hidden="true" className="inline-block h-px w-6 bg-bronze" />
              <span>{STUDIO_META.systemsKicker}</span>
            </div>
            <h2
              id="systems-heading"
              className="text-balance text-[clamp(34px,3.6vw,54px)] leading-[1.08] font-medium tracking-[-0.045em] text-ink"
            >
              {STUDIO_META.systemsHeading}
            </h2>
          </div>

          <p className="max-w-[390px] text-[15px] leading-[1.6] text-ink-muted">
            {STUDIO_META.systemsNote}
          </p>
        </motion.div>

        {/* Three-Column Typographic Architectural Poster Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {PROJECTS.map((project, index) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.62,
                delay: index * 0.09,
                ease: ARCHITECTURAL_EASE,
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.992 }}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[6px] border border-line bg-surface text-left transition-colors duration-300 hover:border-line-strong"
            >
              {/* Typographic Architectural Poster Header (replaces random image pieces) */}
              <div className="relative isolate flex min-h-[212px] w-full flex-col justify-between overflow-hidden border-b border-line bg-plinth p-6 sm:min-h-[228px] sm:p-7">
                <ArchitecturalMotif
                  motifId={project.motifId}
                  accentHex={project.accentHex}
                  variant="card"
                />

                {/* Top-left architectural L-tick */}
                <span
                  aria-hidden="true"
                  style={{ borderColor: project.accentHex }}
                  className="pointer-events-none absolute top-4 left-4 h-3 w-3 border-t-[1.5px] border-l-[1.5px] opacity-65 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100"
                />

                <div className="relative z-10 flex items-center justify-between gap-3 pt-1">
                  <span
                    style={{ color: project.accentHex }}
                    className="font-mono text-[11.5px] tracking-[0.07em]"
                  >
                    {project.discipline}
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-ink-muted">
                    {project.index}
                  </span>
                </div>

                <div className="relative z-10 mt-6">
                  <span className="block text-balance text-[clamp(24px,2.1vw,31px)] leading-[1.08] font-medium tracking-[-0.04em] text-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                    {project.plateHeadline}
                  </span>
                  <span className="mt-2.5 block font-mono text-[11px] tracking-[0.04em] text-ink-muted">
                    {project.formLabel}
                  </span>
                </div>
              </div>

              {/* Lower Editorial Details Block */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <h3 className="text-[clamp(26px,2.2vw,34px)] leading-[1.12] font-medium tracking-[-0.04em] text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-ink-secondary">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4">
                  <span className="font-mono text-[11.5px] text-ink-muted">
                    {project.principleLine}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-ink transition-transform duration-200 group-hover:translate-x-0.5">
                    <span>Brief</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
