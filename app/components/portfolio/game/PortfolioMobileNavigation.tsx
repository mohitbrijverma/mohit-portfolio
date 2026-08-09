import type {
  PortfolioPanelId,
} from "./PortfolioWorldHud";

type PortfolioMobileNavigationProps = {
  activePanel:
    | PortfolioPanelId
    | null;

  onSelectPanel: (
    panelId: PortfolioPanelId,
  ) => void;
};

const mobileNavigationItems: Array<{
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

export default function PortfolioMobileNavigation({
  activePanel,
  onSelectPanel,
}: PortfolioMobileNavigationProps) {
  return (
    <nav
      className="portfolio-mobile-navigation"
      aria-label="Mobile portfolio navigation"
    >
      {mobileNavigationItems.map(
        (item) => {
          const isActive =
            activePanel === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={
                isActive
                  ? "portfolio-mobile-navigation__button portfolio-mobile-navigation__button--active"
                  : "portfolio-mobile-navigation__button"
              }
              onClick={() => {
                onSelectPanel(item.id);
              }}
              aria-pressed={isActive}
            >
              {item.label}
            </button>
          );
        },
      )}
    </nav>
  );
}