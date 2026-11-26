import {
  useState,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { projects, projectImage, type Brief } from "../data/portfolio";
import { Icon } from "./PortfolioIcons";

export function ProductShowcase({
  onOpen,
}: {
  onOpen: (brief: Brief) => void;
}) {
  const [active, setActive] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[active];
  const selectWithKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const last = projects.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % projects.length
        : event.key === "ArrowLeft"
          ? (index + last) % projects.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };
  return (
    <section
      id="products"
      className="product-section"
      aria-labelledby="products-title"
    >
      <div className="wrap">
        <div className="section-head product-heading">
          <div>
            <div className="kicker">The Ideolect product family</div>
            <h2 id="products-title">
              Three disciplines.
              <br />
              <span className="serif">An independent mind.</span>
            </h2>
          </div>
          <p>
            Different tools. Shared conviction.
            <br />
            The details are where the real work begins.
          </p>
        </div>
        <div
          className="product-tabs"
          role="tablist"
          aria-label="Explore Ideolect products"
        >
          {projects.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={active === index}
              aria-controls="product-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => selectWithKeyboard(event, index)}
              style={{ "--accent": item.color } as CSSProperties}
            >
              <span className="tab-symbol" aria-hidden="true">
                {index === 0 ? "▱" : index === 1 ? "⌘" : "◉"}
              </span>
              <span>
                {item.name}
                <small>{item.category}</small>
              </span>
              <span className="tab-indicator" />
            </button>
          ))}
        </div>
        <div
          id="product-panel"
          className={`product-stage product-${project.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${project.id}`}
          tabIndex={0}
          style={{ "--accent": project.color } as CSSProperties}
        >
          <div className="product-visual" key={project.id}>
            <div className="visual-grid" aria-hidden="true" />
            <span className="visual-label">
              {project.name}
              <small>BY IDEOLECT</small>
            </span>
            <img
              src={projectImage(project)}
              alt={project.alt}
              width="1280"
              height="860"
            />
            <span className="visual-caption">
              {project.form} <span aria-hidden="true">+</span>
            </span>
          </div>
          <div className="product-story">
            <span className="chip">{project.audience}</span>
            <h3>{project.headline}</h3>
            <p>{project.summary}</p>
            <ul
              className="focus-list"
              aria-label={`${project.name} focus areas`}
            >
              {project.focus.map((focus) => (
                <li key={focus}>{focus}</li>
              ))}
            </ul>
            <div className="actions">
              <button
                className="btn primary"
                onClick={() => onOpen(project)}
                aria-haspopup="dialog"
              >
                <Icon name="expand" />
                Inside {project.name}
              </button>
              <span className="development-label">In development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
