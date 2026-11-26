import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PROJECTS } from '../content/portfolio';
import type { ProjectEntry } from '../lib/atlas';
import { stepProjectIndex } from '../lib/atlas';
import { ArchitecturalMotif } from './ArchitecturalMotif';

interface BriefModalProps {
  readonly project: ProjectEntry | null;
  readonly onClose: () => void;
  readonly onSelectProject: (project: ProjectEntry) => void;
}

const ARCHITECTURAL_EASE = [0.22, 1, 0.36, 1] as const;

export function BriefModal({ project, onClose, onSelectProject }: BriefModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = project !== null;

  const currentProjectIndex = project
    ? PROJECTS.findIndex((item) => item.id === project.id)
    : -1;

  const handleStepProject = (delta: number) => {
    if (currentProjectIndex < 0) return;
    const nextIdx = stepProjectIndex(currentProjectIndex, delta, PROJECTS.length);
    const nextProject = PROJECTS[nextIdx];
    if (nextProject) {
      onSelectProject(nextProject);
    }
  };

  // Reset modal scroll position whenever stepping between systems
  useEffect(() => {
    if (project && scrollBodyRef.current) {
      scrollBodyRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [project?.id]);

  // Body scroll lock and focus restoration strictly on modal open/close lifecycle
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  // Keyboard navigation (Escape, ArrowLeft/ArrowRight stepping, Tab focus trap)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleStepProject(1);
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handleStepProject(-1);
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentProjectIndex, onClose, onSelectProject]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="brief-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-[6px] sm:p-6"
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.34, ease: ARCHITECTURAL_EASE }}
            className="print-brief-surface flex max-h-[88dvh] w-full max-w-[680px] flex-col overflow-hidden rounded-[8px] border border-line-strong bg-surface text-ink shadow-[0_32px_90px_rgba(17,19,18,0.22)]"
          >
            {/* Modal Header Bar */}
            <div className="no-print flex items-center justify-between border-b border-line px-5 py-3 sm:px-6">
              <div className="flex items-center gap-3 font-mono text-[12px] tracking-[0.08em] text-ink-muted">
                <span>
                  System brief · {project.index} / 0{PROJECTS.length}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close brief"
                className="grid h-[44px] w-[44px] cursor-pointer place-items-center rounded-[4px] border border-line bg-canvas text-ink transition-colors duration-200 hover:border-ink hover:bg-mist"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Monograph Body */}
            <div ref={scrollBodyRef} className="min-h-0 flex-1 overflow-y-auto">
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: ARCHITECTURAL_EASE }}
              >
                <div className="no-print relative isolate flex min-h-[164px] w-full flex-col justify-end overflow-hidden border-b border-line bg-plinth px-6 py-6 sm:px-9 sm:py-7">
                  <ArchitecturalMotif
                    motifId={project.motifId}
                    accentHex={project.accentHex}
                    variant="modal"
                  />
                  {/* Directional scrim so header typography never clashes with blueprint arcs */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-plinth/95 via-plinth/78 to-plinth/15"
                  />
                  <div className="relative z-10">
                    <div
                      style={{ color: project.accentHex }}
                      className="font-mono text-[12px] tracking-[0.07em]"
                    >
                      {project.discipline} · {project.formLabel}
                    </div>
                    <p className="display-heading mt-2 max-w-[420px] text-[clamp(24px,3.2vw,31px)] leading-[1.1] font-medium tracking-[-0.025em] text-ink">
                      {project.plateHeadline}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-7 pb-10 sm:px-9 sm:py-8 sm:pb-10">
                  <h2
                    id="brief-modal-title"
                    className="display-heading text-[clamp(32px,4.5vw,42px)] leading-[1.09] font-medium tracking-[-0.028em] text-ink"
                  >
                    {project.name}
                  </h2>
                  <p className="mt-4 text-[17px] leading-[1.6] text-ink">
                    {project.lead}
                  </p>

                  <div className="mt-6 space-y-5 border-t border-line pt-6">
                    {project.sections.map((section) => (
                      <div key={section.heading}>
                        <h3 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">
                          {section.heading}
                        </h3>
                        <p className="mt-1.5 text-[15px] leading-[1.65] text-ink-secondary">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Anchored Modal Footer Bar */}
            <div className="no-print shrink-0 border-t border-line bg-canvas/90 px-5 py-3 sm:px-9">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => handleStepProject(-1)}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-[14px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Previous system</span>
                </button>

                <span
                  aria-hidden="true"
                  className="hidden font-mono text-[11px] text-ink-muted sm:inline"
                >
                  ← / →
                </span>

                <button
                  type="button"
                  onClick={() => handleStepProject(1)}
                  className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-[14px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
                >
                  <span>Next system</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
