import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  type Brief,
  projects,
  projectImage,
  COMPANY_PDF,
} from "../data/portfolio";
import { Icon } from "./PortfolioIcons";

export function BriefDialog({
  brief,
  onClose,
}: {
  brief: Brief | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!brief || !element) return;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    element.showModal();
    element.scrollTop = 0;
    return () => {
      element.close();
      trigger?.focus();
    };
  }, [brief]);
  const project = projects.find((project) => project.id === brief?.id);
  return createPortal(
    <dialog
      ref={dialog}
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      {brief && (
        <>
          <div className="dialog-head">
            <span className="meta">
              {project ? "Project brief" : "Company brief"}
            </span>
            <button
              className="close"
              aria-label="Close brief"
              autoFocus
              onClick={onClose}
            >
              <Icon name="close" />
            </button>
          </div>
          {project && (
            <div className="modal-art">
              <img src={projectImage(project)} alt="" />
            </div>
          )}
          <div className="modal-body">
            <div className="chip" style={{ color: brief.color }}>
              {brief.category}
            </div>
            <h2 id="dialog-title">{brief.name}</h2>
            <p className="lead">{brief.summary}</p>
            {brief.blocks.map(([heading, body]) => (
              <section key={heading}>
                <h3>{heading}</h3>
                <p>{body}</p>
              </section>
            ))}
            <div className="actions">
              <a className="btn primary" href={COMPANY_PDF} download>
                <Icon name="brief" />
                Download company brief
              </a>
              <button className="btn" onClick={() => window.print()}>
                Print this brief
              </button>
            </div>
          </div>
        </>
      )}
    </dialog>,
    document.body,
  );
}
