import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import type {
  LucideIcon,
} from "lucide-react";

import {
  portfolioPanels,
} from "@/app/data/portfolio-panels";

import type {
  PortfolioPanelActionIcon,
} from "@/app/data/portfolio-panels";

import type {
  PortfolioPanelId,
} from "./game/PortfolioWorldHud";

type PortfolioInfoPanelProps = {
  activePanel:
    PortfolioPanelId | null;

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

const actionIcons: Record<
  PortfolioPanelActionIcon,
  LucideIcon
> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
  external: ExternalLink,
};

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

  const activePanelIndex =
    panelNavigation.findIndex(
      (item) =>
        item.id === activePanel,
    );

  return (
    <>
      <button
        type="button"
        className="portfolio-info-backdrop"
        onClick={onClose}
        aria-label="Close portfolio panel"
      />

      <aside
        className="portfolio-info-panel"
        aria-label={`${content.title} panel`}
        aria-modal="true"
        role="dialog"
      >
        <div className="portfolio-info-panel__header">
          <div>
            <span className="portfolio-info-panel__eyebrow">
              {content.eyebrow}
            </span>

            <span className="portfolio-info-panel__count">
              {String(
                activePanelIndex + 1,
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
          {panelNavigation.map(
            (item) => {
              const isActive =
                activePanel ===
                item.id;

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
                    onSelectPanel(
                      item.id,
                    );
                  }}
                  aria-pressed={
                    isActive
                  }
                >
                  {item.label}
                </button>
              );
            },
          )}
        </nav>

        <div className="portfolio-info-panel__content">
          <h2>
            {content.title}
          </h2>

          <p className="portfolio-info-panel__description">
            {content.description}
          </p>

          <div className="portfolio-info-panel__items">
            {content.items.map(
              (
                item,
                index,
              ) => (
                <article
                  key={item.title}
                  className="portfolio-info-panel__item"
                >
                  <span className="portfolio-info-panel__item-number">
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <div>
                    {item.meta && (
                      <span className="portfolio-info-panel__item-meta">
                        {item.meta}
                      </span>
                    )}

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {
                        item.description
                      }
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>

          {content.actions &&
            content.actions.length >
              0 && (
              <div className="portfolio-info-panel__actions">
                {content.actions.map(
                  (action) => {
                    const Icon =
                      actionIcons[
                        action.icon
                      ];

                    const isExternal =
                      action.href.startsWith(
                        "http",
                      );

                    return (
                      <a
                        key={
                          action.label
                        }
                        href={
                          action.href
                        }
                        target={
                          isExternal
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          isExternal
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={
                          isExternal
                            ? `${action.label} — opens in a new tab`
                            : action.label
                        }
                      >
                        <Icon
                          className="portfolio-info-panel__action-icon"
                          size={18}
                          strokeWidth={
                            2.2
                          }
                          aria-hidden="true"
                        />

                        <span>
                          {
                            action.label
                          }
                        </span>

                        {isExternal && (
                          <ExternalLink
                            className="portfolio-info-panel__action-external"
                            size={14}
                            aria-hidden="true"
                          />
                        )}
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