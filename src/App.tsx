import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { PROJECTS } from './content/portfolio';
import { stepProjectIndex } from './lib/atlas';
import type { ProjectEntry } from './lib/atlas';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { StudioHeader } from './components/StudioHeader';
import { HeroAtlas } from './components/HeroAtlas';
import { ProjectIndex } from './components/ProjectIndex';
import { ArchitectureMonograph } from './components/ArchitectureMonograph';
import { StudioVision } from './components/StudioVision';
import { BriefModal } from './components/BriefModal';
import type { ModalState } from './components/BriefModal';

export default function App() {
  // Default Atlas to Pencore (index 1, cast bronze knot) — mirrors the reference composition
  const [atlasIndex, setAtlasIndex] = useState<number>(1);
  const [modalState, setModalState] = useState<ModalState>({ kind: 'closed' });

  const isModalOpen = modalState.kind !== 'closed';
  useSmoothScroll(isModalOpen);

  const handleStepAtlas = useCallback((delta: number) => {
    setAtlasIndex((prev) => stepProjectIndex(prev, delta, PROJECTS.length));
  }, []);

  const handleOpenProject = useCallback((project: ProjectEntry) => {
    const idx = PROJECTS.findIndex((item) => item.id === project.id);
    if (idx >= 0) {
      setAtlasIndex(idx);
    }
    setModalState({ kind: 'project', project });
  }, []);

  const handleOpenStudioBrief = useCallback(() => {
    setModalState({ kind: 'studio' });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalState({ kind: 'closed' });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-canvas text-ink">
        <a
          href="#systems"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to systems
        </a>

        <StudioHeader onOpenStudioBrief={handleOpenStudioBrief} />

        <main>
          <HeroAtlas
            activeIndex={atlasIndex}
            onSelectIndex={setAtlasIndex}
            onStep={handleStepAtlas}
            onInspectProject={handleOpenProject}
          />
          <ProjectIndex onSelectProject={handleOpenProject} />
          <ArchitectureMonograph />
          <StudioVision
            onOpenStudioBrief={handleOpenStudioBrief}
            onSelectProject={handleOpenProject}
          />
        </main>

        <BriefModal
          state={modalState}
          onClose={handleCloseModal}
          onSelectProject={handleOpenProject}
        />
      </div>
    </MotionConfig>
  );
}
