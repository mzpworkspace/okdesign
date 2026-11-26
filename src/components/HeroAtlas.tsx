import { useCallback, useEffect, useRef } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowDownRight, Box, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { PROJECTS, STUDIO_META } from '../content/portfolio';
import type { ProjectEntry } from '../lib/atlas';
import { ArchitecturalMotif } from './ArchitecturalMotif';

interface HeroAtlasProps {
  readonly activeIndex: number;
  readonly onSelectIndex: (index: number) => void;
  readonly onStep: (delta: number) => void;
  readonly onInspectProject: (project: ProjectEntry) => void;
}

const ARCHITECTURAL_EASE = [0.22, 1, 0.36, 1] as const;

export function HeroAtlas({
  activeIndex,
  onSelectIndex,
  onStep,
  onInspectProject,
}: HeroAtlasProps) {
  const activeProject = PROJECTS[activeIndex] ?? PROJECTS[0];
  const stageRef = useRef<HTMLDivElement>(null);

  // Subtle pointer-reactive parallax on the architectural monograph plate
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24 });
  const motifX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const motifY = useTransform(smoothY, [-0.5, 0.5], [-9, 9]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const node = stageRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    },
    [pointerX, pointerY],
  );

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (!activeEl || !stageRef.current?.contains(activeEl)) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onStep(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onStep(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onStep]);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative border-b border-line bg-canvas"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch px-5 sm:px-8 lg:min-h-[min(calc(100dvh-72px),790px)] lg:grid-cols-[1.06fr_1fr] lg:px-14">
        {/* Left Architectural Copy Column */}
        <div className="relative flex flex-col justify-center py-12 sm:py-16 lg:border-r lg:border-line lg:py-20 lg:pr-12 xl:pr-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: ARCHITECTURAL_EASE }}
            className="flex items-center gap-3 font-mono text-[12px] tracking-[0.1em] text-bronze"
          >
            <span aria-hidden="true" className="inline-block h-px w-7 bg-bronze" />
            <span>{STUDIO_META.kicker}</span>
          </motion.div>

          <h1
            id="hero-title"
            className="mt-6 mb-6 text-balance text-[clamp(52px,6.3vw,98px)] leading-[0.98] font-medium tracking-[-0.055em] text-ink"
          >
            <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
              <motion.span
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.08, ease: ARCHITECTURAL_EASE }}
                className="block"
              >
                {STUDIO_META.heroLineOne}
              </motion.span>
            </span>
            <span className="block overflow-hidden pt-[0.04em] pb-[0.16em] -mb-[0.12em]">
              <motion.em
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.78, delay: 0.16, ease: ARCHITECTURAL_EASE }}
                style={{ color: activeProject.accentHex }}
                className="block font-serif text-[1.06em] font-normal italic tracking-[-0.03em] transition-colors duration-500"
              >
                {STUDIO_META.heroLineTwo}
              </motion.em>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: ARCHITECTURAL_EASE }}
            className="max-w-[515px] text-[clamp(16px,1.2vw,19px)] leading-[1.6] text-ink-secondary"
          >
            {STUDIO_META.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: ARCHITECTURAL_EASE }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <motion.a
              href="#systems"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-[5px] border border-ink bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-colors duration-200 hover:bg-ink-secondary"
            >
              <LayoutGrid className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Explore systems</span>
            </motion.a>

            <motion.a
              href="#vision"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[5px] border border-line-strong bg-surface px-5 py-2.5 text-[14px] font-medium text-ink transition-colors duration-200 hover:border-ink hover:bg-mist"
            >
              <span>Our vision</span>
            </motion.a>
          </motion.div>

          {/* Subtle architectural index colophon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease: ARCHITECTURAL_EASE }}
            className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5 font-mono text-[12px] text-ink-muted"
          >
            <span>PenSuite</span>
            <span aria-hidden="true">·</span>
            <span>Pencore</span>
            <span aria-hidden="true">·</span>
            <span>Independent HMOS Model</span>
          </motion.div>
        </div>

        {/* Right Interactive Architectural Monograph Plate (Typographic + Purpose-Built Geometry) */}
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative isolate flex min-h-[430px] flex-col justify-between overflow-hidden py-7 sm:min-h-[500px] lg:min-h-[590px] lg:py-9 lg:pl-12 xl:pl-14"
        >
          {/* Top Plate Metadata Bar */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.09em] text-ink-muted">
              <Box
                className="h-3.5 w-3.5 transition-colors duration-500"
                style={{ color: activeProject.accentHex }}
                aria-hidden="true"
              />
              <span>System atlas</span>
            </div>

            <div className="flex items-center gap-4">
              <div
                role="tablist"
                aria-label="Select featured system"
                className="flex items-center gap-1"
              >
                {PROJECTS.map((project, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`View ${project.name} in system atlas`}
                      onClick={() => onSelectIndex(idx)}
                      className={`relative min-h-[44px] min-w-[44px] cursor-pointer font-mono text-[12px] tabular-nums transition-colors duration-200 ${
                        isActive ? 'font-medium text-ink' : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      <span>{project.index}</span>
                      {isActive && (
                        <motion.span
                          layoutId="atlas-active-bar"
                          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                          style={{ backgroundColor: project.accentHex }}
                          className="absolute right-2.5 bottom-2 left-2.5 h-[1.5px]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <span
                aria-hidden="true"
                className="hidden font-mono text-[15px] text-line-strong sm:inline"
              >
                +
              </span>
            </div>
          </div>

          {/* Center Typographic Architectural Plate */}
          <div className="my-5 flex flex-1 items-center">
            <button
              type="button"
              onClick={() => onInspectProject(activeProject)}
              aria-label={`Open architectural brief for ${activeProject.name}`}
              className="group relative flex min-h-[340px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-[6px] border border-line bg-surface p-7 text-left transition-colors duration-300 hover:border-line-strong sm:min-h-[385px] sm:p-9 lg:min-h-[415px] lg:p-10"
            >
              {/* Purpose-built parallax architectural backdrop */}
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`motif-${activeProject.id}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: ARCHITECTURAL_EASE }}
                  style={{ x: motifX, y: motifY }}
                  className="pointer-events-none absolute -inset-4 will-change-transform"
                >
                  <ArchitecturalMotif
                    motifId={activeProject.motifId}
                    accentHex={activeProject.accentHex}
                    variant="hero"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Corner Architectural L-Tick */}
              <span
                aria-hidden="true"
                style={{ borderColor: activeProject.accentHex }}
                className="pointer-events-none absolute top-4 left-4 h-3.5 w-3.5 border-t-[1.5px] border-l-[1.5px] opacity-75 transition-all duration-300 group-hover:h-4 group-hover:w-4 group-hover:opacity-100"
              />

              {/* Typographic Foreground */}
              <div className="relative z-10 flex h-full flex-1 flex-col justify-between">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.32, ease: ARCHITECTURAL_EASE }}
                    className="flex h-full flex-1 flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span
                          style={{ color: activeProject.accentHex }}
                          className="font-mono text-[12px] tracking-[0.08em]"
                        >
                          {activeProject.plateEyebrow}
                        </span>
                        <span className="font-mono text-[11px] tabular-nums text-ink-muted">
                          {activeProject.formLabel}
                        </span>
                      </div>

                      <h2 className="mt-7 max-w-[440px] text-balance text-[clamp(34px,3.6vw,50px)] leading-[1.04] font-medium tracking-[-0.048em] text-ink">
                        {activeProject.plateHeadline}
                      </h2>

                      <p className="mt-4 max-w-[410px] text-[15px] leading-[1.62] text-ink-secondary">
                        {activeProject.plateSubline}
                      </p>
                    </div>

                    {/* Disciplined 3-Point Typographic Specification Rail */}
                    <div className="mt-8 border-t border-line/90 pt-5">
                      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
                        {activeProject.platePoints.map((point, i) => (
                          <li key={point} className="flex flex-col gap-1">
                            <span
                              style={{ color: activeProject.accentHex }}
                              className="font-mono text-[10.5px] tabular-nums"
                            >
                              0{i + 1}
                            </span>
                            <span className="text-[13px] leading-[1.35] font-medium text-ink">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>
          </div>

          {/* Bottom Atlas Caption & Step Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                style={{ backgroundColor: activeProject.accentHex }}
                className="h-[1.5px] w-6 shrink-0 transition-colors duration-500"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: ARCHITECTURAL_EASE }}
                  className="flex items-center gap-2 font-mono text-[12px] tracking-[0.05em] text-ink-secondary"
                >
                  <span className="font-medium text-ink">{activeProject.name}</span>
                  <span aria-hidden="true" className="text-ink-muted">
                    /
                  </span>
                  <span className="text-ink-muted">{activeProject.discipline}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onInspectProject(activeProject)}
                className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 px-2.5 text-[13px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
              >
                <span>Inspect brief</span>
                <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-1.5">
                <motion.button
                  type="button"
                  onClick={() => onStep(-1)}
                  whileTap={{ scale: 0.94 }}
                  aria-label="Previous system in atlas"
                  className="grid h-[44px] w-[44px] cursor-pointer place-items-center rounded-[4px] border border-line bg-surface text-ink transition-colors duration-200 hover:border-ink hover:bg-mist"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => onStep(1)}
                  whileTap={{ scale: 0.94 }}
                  aria-label="Next system in atlas"
                  className="grid h-[44px] w-[44px] cursor-pointer place-items-center rounded-[4px] border border-line bg-surface text-ink transition-colors duration-200 hover:border-ink hover:bg-mist"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
