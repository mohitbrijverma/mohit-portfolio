type JourneyIntroCardProps = {
  collapsed: boolean;
  onCollapse: () => void;
  onExpand: () => void;
};

export default function JourneyIntroCard({
  collapsed,
  onCollapse,
  onExpand,
}: JourneyIntroCardProps) {
  if (collapsed) {
    return (
      <button
        type="button"
        className="journey-intro-badge"
        onClick={onExpand}
        aria-label="Open portfolio introduction"
      >
        <span>MV</span>
        <small>Portfolio</small>
      </button>
    );
  }

  return (
    <section
      className="game-heading"
      aria-label="Portfolio introduction"
    >
      <button
        type="button"
        className="game-heading__close"
        onClick={onCollapse}
        aria-label="Minimise introduction"
      >
        ×
      </button>

      <p className="game-heading__eyebrow">
        Mohit Verma · Product Builder
      </p>

      <h1>
        I build by following curiosity.
      </h1>

      <p className="game-heading__description">
        Explore my journey through research,
        artificial intelligence, teaching,
        healthcare products and engineering.
      </p>

      <div className="game-heading__instruction">
        <span className="game-heading__instruction-dot" />

        <span>
          Drag to explore · Select a destination
        </span>
      </div>
    </section>
  );
}