import { useState, type CSSProperties } from "react";
import { projects, projectImage } from "../data/portfolio";
import { Icon } from "./PortfolioIcons";

export function SystemAtlas() {
  const [active, setActive] = useState(1);
  const project = projects[active];
  const change = (delta: number) =>
    setActive((index) => (index + delta + projects.length) % projects.length);
  return (
    <div
      className="art"
      style={{ "--accent": project.color } as CSSProperties}
      aria-label="Project artwork gallery"
    >
      <div className="art-label meta">
        <Icon name="cube" />
        System atlas
      </div>
      <span className="cross tr" aria-hidden="true">
        +
      </span>
      <div className="art-inner">
        <img
          src={projectImage(project)}
          alt={project.alt}
          fetchPriority="high"
          width="1280"
          height="860"
        />
      </div>
      <span className="cross bl" aria-hidden="true">
        +
      </span>
      <div className="art-footer">
        <div className="spec">
          <span className="small-line" />
          <span className="art-meta" aria-live="polite" aria-atomic="true">
            {project.name} / {project.form}
          </span>
        </div>
        <div className="steps">
          <button
            className="step"
            aria-label="Previous project artwork"
            onClick={() => change(-1)}
          >
            <Icon name="previous" />
          </button>
          <button
            className="step"
            aria-label="Next project artwork"
            onClick={() => change(1)}
          >
            <Icon name="next" />
          </button>
        </div>
      </div>
    </div>
  );
}
