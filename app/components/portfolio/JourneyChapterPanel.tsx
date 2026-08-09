import Image from "next/image";

import type {
  CSSProperties,
} from "react";

import type {
  JourneyChapter,
} from "@/app/data/journey";

type JourneyChapterPanelProps = {
  chapter: JourneyChapter | null;
  onClose: () => void;
};

export default function JourneyChapterPanel({
  chapter,
  onClose,
}: JourneyChapterPanelProps) {
  if (!chapter) {
    return null;
  }

  const panelStyle = {
    "--chapter-accent":
      chapter.accent,
  } as CSSProperties;

  return (
    <aside
      className="journey-chapter-panel"
      style={panelStyle}
      aria-label={`${chapter.title} chapter`}
      aria-modal="true"
      role="dialog"
    >
      <div className="journey-chapter-panel__topbar">
        <div className="journey-chapter-panel__meta">
          <span className="journey-chapter-panel__number">
            {chapter.number}
          </span>

          <span className="journey-chapter-panel__eyebrow">
            {chapter.eyebrow}
          </span>
        </div>

        <button
          type="button"
          className="journey-chapter-panel__close"
          onClick={onClose}
          aria-label="Return to portfolio world"
        >
          ×
        </button>
      </div>

      <div className="journey-chapter-panel__scroll">
        <div className="journey-chapter-panel__visual">
          <Image
            src={chapter.image}
            alt=""
            width={520}
            height={340}
            priority
            sizes="(max-width: 767px) 100vw, 520px"
          />
        </div>

        <div className="journey-chapter-panel__content">
          <span className="journey-chapter-panel__label">
            Portfolio destination
          </span>

          <h2>
            {chapter.title}
          </h2>

          <p className="journey-chapter-panel__statement">
            {chapter.statement}
          </p>

          <p className="journey-chapter-panel__description">
            {chapter.description}
          </p>

          <button
            type="button"
            className="journey-chapter-panel__return"
            onClick={onClose}
          >
            <span aria-hidden="true">
              ←
            </span>

            Return to world
          </button>
        </div>
      </div>
    </aside>
  );
}