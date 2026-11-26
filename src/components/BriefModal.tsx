import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Printer, X } from 'lucide-react';
import { PROJECTS, STUDIO_BRIEF } from '../content/portfolio';
import type { ProjectEntry } from '../lib/atlas';
import { stepProjectIndex } from '../lib/atlas';
import { ArchitecturalMotif } from './ArchitecturalMotif';

export type ModalState =
  | { readonly kind: 'closed' }
  | { readonly kind: 'studio' }
  | { readonly kind: 'project'; readonly project: ProjectEntry };

interface BriefModalProps {
  readonly state: ModalState;
  readonly onClose: () => void;
  readonly onSelectProject: (project: ProjectEntry) => void;
}

const ARCHITECTURAL_EASE = [0.22, 1, 0.36, 1] as const;

export function BriefModal({ state, onClose, onSelectProject }: BriefModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = state.kind !== 'closed';

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onClose]);

  const currentProjectIndex =
    state.kind === 'project'
      ? PROJECTS.findIndex((item) => item.id === state.project.id)
      : -1;

  const handleStepProject = (delta: number) => {
    if (currentProjectIndex < 0) return;
    const nextIdx = stepProjectIndex(currentProjectIndex, delta, PROJECTS.length);
    const nextProject = PROJECTS[nextIdx];
    if (nextProject) {
      onSelectProject(nextProject);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.34, ease: ARCHITECTURAL_EASE }}
            className="print-brief-surface flex max-h-[88dvh] w-full max-w-[680px] flex-col overflow-hidden rounded-[8px] border border-line-strong bg-surface text-ink shadow-[0_32px_90px_rgba(17,19,18,0.22)]"
          >
            {/* Modal Header Bar */}
            <div className="no-print flex items-center justify-between border-b border-line px-6 py-3.5">
              <span className="font-mono text-[12px] tracking-[0.09em] text-ink-muted">
                {state.kind === 'project'
                  ? `System brief · ${state.project.index} / 0${PROJECTS.length}`
                  : STUDIO_BRIEF.label}
              </span>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close brief"
                className="grid h-[40px] w-[40px] cursor-pointer place-items-center rounded-[4px] border border-line bg-canvas text-ink transition-colors duration-200 hover:border-ink hover:bg-mist"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Monograph Body */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              {state.kind === 'project' ? (
                <>
                  <div className="no-print relative isolate flex min-h-[164px] w-full flex-col justify-end overflow-hidden border-b border-line bg-plinth px-6 py-6 sm:px-9 sm:py-7">
                    <ArchitecturalMotif
                      motifId={state.project.motifId}
                      accentHex={state.project.accentHex}
                      variant="modal"
                    />
                    <div className="relative z-10">
                      <div
                        style={{ color: state.project.accentHex }}
                        className="font-mono text-[12px] tracking-[0.07em]"
                      >
                        {state.project.discipline} · {state.project.formLabel}
                      </div>
                      <p className="mt-2 max-w-[420px] text-[clamp(24px,3.2vw,32px)] leading-[1.08] font-medium tracking-[-0.04em] text-ink">
                        {state.project.plateHeadline}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-7 sm:px-9 sm:py-8">
                    <h2
                      id="brief-modal-title"
                      className="text-[clamp(32px,4.5vw,44px)] leading-[1.08] font-medium tracking-[-0.045em] text-ink"
                    >
                      {state.project.name}
                    </h2>
                    <p className="mt-4 text-[17px] leading-[1.6] text-ink">
                      {state.project.lead}
                    </p>

                    <div className="mt-6 space-y-5 border-t border-line pt-6">
                      {state.project.sections.map((section) => (
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
                </>
              ) : (
                <div className="px-6 py-7 sm:px-9 sm:py-8">
                  <div className="font-mono text-[12px] tracking-[0.07em] text-bronze">
                    {STUDIO_BRIEF.subtitle}
                  </div>
                  <h2
                    id="brief-modal-title"
                    className="mt-3 text-balance text-[clamp(30px,4.2vw,42px)] leading-[1.08] font-medium tracking-[-0.045em] text-ink"
                  >
                    {STUDIO_BRIEF.title}
                  </h2>
                  <p className="mt-4 text-[17px] leading-[1.62] text-ink">
                    {STUDIO_BRIEF.lead}
                  </p>

                  <div className="mt-6 space-y-5 border-t border-line pt-6">
                    {STUDIO_BRIEF.sections.map((section) => (
                      <div key={section.heading}>
                        <h3 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">
                          {section.heading}
                        </h3>
                        <p className="mt-1.5 text-[15px] leading-[1.68] text-ink-secondary">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Anchored Modal Footer Bar */}
            <div className="no-print shrink-0 border-t border-line bg-canvas/85 px-6 py-3.5 sm:px-9">
              {state.kind === 'project' ? (
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => handleStepProject(-1)}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-[14px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Previous system</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStepProject(1)}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-[14px] font-medium text-ink-secondary transition-colors duration-200 hover:text-ink"
                  >
                    <span>Next system</span>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-[12px] text-ink-muted">
                    Own weights · Own reasoning · Own solutions
                  </span>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-[5px] border border-ink bg-ink px-4 py-2 text-[14px] font-medium text-canvas transition-colors duration-200 hover:bg-ink-secondary"
                  >
                    <Printer className="h-4 w-4" aria-hidden="true" />
                    <span>Print studio brief</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
