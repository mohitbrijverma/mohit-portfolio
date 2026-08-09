import {
  portfolioPanels,
} from "@/app/data/portfolio-panels";

import type {
  PortfolioPanelId,
} from "./game/PortfolioWorldHud";

type PortfolioInfoPanelProps = {
  activePanel: PortfolioPanelId | null;

  onSelectPanel: (
    panelId: PortfolioPanelId,
  ) => void;

  onClose: () => void;
};

const panelNavigation: Array<{
  id: PortfolioPanelId;
  label: string;
}> = [
  {
    id: "about",
    label: "About",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "skills",
    label: "Skills",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

export default function PortfolioInfoPanel({
  activePanel,
  onSelectPanel,
  onClose,
}: PortfolioInfoPanelProps) {
  if (!activePanel) {
    return null;
  }

  const content =
    portfolioPanels[activePanel];

  return (
    <>
      <button
        type="button"
        className="portfolio-info-backdrop"
        onClick={onClose}
        aria-label="Close portfolio information"
      />

      <aside
        className="portfolio-info-panel"
        aria-label={`${content.title} panel`}
      >
        <div className="portfolio-info-panel__header">
          <div>
            <span className="portfolio-info-panel__eyebrow">
              {content.eyebrow}
            </span>

            <span className="portfolio-info-panel__count">
              {String(
                panelNavigation.findIndex(
                  (item) =>
                    item.id === activePanel,
                ) + 1,
              ).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            className="portfolio-info-panel__close"
            onClick={onClose}
            aria-label="Close panel"
          >
            ×
          </button>
        </div>

        <nav
          className="portfolio-info-panel__navigation"
          aria-label="Portfolio panel navigation"
        >
          {panelNavigation.map((item) => {
            const isActive =
              activePanel === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={
                  isActive
                    ? "portfolio-info-panel__tab portfolio-info-panel__tab--active"
                    : "portfolio-info-panel__tab"
                }
                onClick={() => {
                  onSelectPanel(item.id);
                }}
                aria-pressed={isActive}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="portfolio-info-panel__content">
          <h2>{content.title}</h2>

          <p className="portfolio-info-panel__description">
            {content.description}
          </p>

          <div className="portfolio-info-panel__items">
            {content.items.map(
              (item, index) => (
                <article
                  key={item.title}
                  className="portfolio-info-panel__item"
                >
                  <span className="portfolio-info-panel__item-number">
                    {String(
                      index + 1,
                    ).padStart(2, "0")}
                  </span>

                  <div>
                    {item.meta && (
                      <span className="portfolio-info-panel__item-meta">
                        {item.meta}
                      </span>
                    )}

                    <h3>{item.title}</h3>

                    <p>
                      {item.description}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>

          {content.actions && (
            <div className="portfolio-info-panel__actions">
              {content.actions.map(
                (action) => {
                  const isExternal =
                    action.href.startsWith(
                      "http",
                    );

                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      target={
                        isExternal
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        isExternal
                          ? "noreferrer"
                          : undefined
                      }
                    >
                      {action.label}
                      <span aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  );
                },
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}