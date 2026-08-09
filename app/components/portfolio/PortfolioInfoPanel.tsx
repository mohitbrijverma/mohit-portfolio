import {
  ExternalLink,
  Mail,
} from "lucide-react";

import type {
  ComponentType,
  SVGProps,
} from "react";

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

type ActionIconComponent =
  ComponentType<
    SVGProps<SVGSVGElement>
  >;

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

function GitHubLogo(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.396.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.848-2.337 4.695-4.566 4.943.359.31.679.923.679 1.861 0 1.344-.012 2.427-.012 2.757 0 .269.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
    </svg>
  );
}

function LinkedInLogo(
  props: SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5.337 3.5A2.337 2.337 0 1 1 5.337 8.174 2.337 2.337 0 0 1 5.337 3.5ZM3.32 9.92h4.034V21H3.32V9.92ZM9.79 9.92h3.87v1.514h.054c.539-1.021 1.856-2.098 3.82-2.098 4.086 0 4.84 2.69 4.84 6.188V21h-4.032v-4.854c0-1.158-.021-2.647-1.613-2.647-1.615 0-1.862 1.262-1.862 2.563V21H9.79V9.92Z" />
    </svg>
  );
}

const actionIcons: Record<
  PortfolioPanelActionIcon,
  ActionIconComponent
> = {
  email: Mail,
  linkedin: LinkedInLogo,
  github: GitHubLogo,
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
                          width={18}
                          height={18}
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