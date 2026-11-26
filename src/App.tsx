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

export default function App() {
  // Default Atlas to Pencore (index 1)
  const [atlasIndex, setAtlasIndex] = useState<number>(1);
  const [activeBrief, setActiveBrief] = useState<ProjectEntry | null>(null);

  useSmoothScroll(activeBrief !== null);

  const handleStepAtlas = useCallback((delta: number) => {
    setAtlasIndex((prev) => stepProjectIndex(prev, delta, PROJECTS.length));
  }, []);

  const handleOpenProject = useCallback((project: ProjectEntry) => {
    const idx = PROJECTS.findIndex((item) => item.id === project.id);
    if (idx >= 0) {
      setAtlasIndex(idx);
    }
    setActiveBrief(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveBrief(null);
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

        <StudioHeader />

        <main>
          <HeroAtlas
            activeIndex={atlasIndex}
            onSelectIndex={setAtlasIndex}
            onStep={handleStepAtlas}
            onInspectProject={handleOpenProject}
          />
          <ProjectIndex onSelectProject={handleOpenProject} />
          <ArchitectureMonograph />
          <StudioVision onSelectProject={handleOpenProject} />
        </main>

        <BriefModal
          project={activeBrief}
          onClose={handleCloseModal}
          onSelectProject={handleOpenProject}
        />
      </div>
    </MotionConfig>
  );
}
