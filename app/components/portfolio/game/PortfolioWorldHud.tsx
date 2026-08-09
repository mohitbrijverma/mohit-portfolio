"use client";

import { useEffect, useState } from "react";

export type PortfolioPanelId = "about" | "projects" | "skills" | "contact";

type WorldTimeMode = "day" | "night";

type WorldTimeChangeDetail = {
  mode: WorldTimeMode;
};

type PortfolioWorldHudProps = {
  activePanel: PortfolioPanelId | null;

  onSelectPanel: (panelId: PortfolioPanelId) => void;

  onReturnToWorld: () => void;
};

const WORLD_TIME_CHANGE_EVENT = "portfolio:world-time-change";

const WORLD_TIME_TOGGLE_EVENT = "portfolio:world-time-toggle";

const navigationItems: Array<{
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

export default function PortfolioWorldHud({
  activePanel,
  onSelectPanel,
  onReturnToWorld,
}: PortfolioWorldHudProps) {
  const [worldTime, setWorldTime] = useState<WorldTimeMode>("day");

  useEffect(() => {
    const storedMode = window.localStorage.getItem("portfolio-world-time");

    if (storedMode === "day" || storedMode === "night") {
      setWorldTime(storedMode);
    }

    function handleWorldTimeChange(event: Event) {
      const customEvent = event as CustomEvent<WorldTimeChangeDetail>;

      const nextMode = customEvent.detail?.mode;

      if (nextMode === "day" || nextMode === "night") {
        setWorldTime(nextMode);
      }
    }

    window.addEventListener(WORLD_TIME_CHANGE_EVENT, handleWorldTimeChange);

    return () => {
      window.removeEventListener(
        WORLD_TIME_CHANGE_EVENT,
        handleWorldTimeChange,
      );
    };
  }, []);

  function toggleWorldTime() {
    const nextMode: WorldTimeMode = worldTime === "day" ? "night" : "day";

    /*
     * Update immediately so the button feels responsive.
     * Phaser will confirm the mode through its change event.
     */
    setWorldTime(nextMode);

    window.localStorage.setItem("portfolio-world-time", nextMode);

    window.dispatchEvent(new CustomEvent(WORLD_TIME_TOGGLE_EVENT));
  }

  const nightIsActive = worldTime === "night";

  return (
    <header className="portfolio-world-hud">
      <button
        type="button"
        className="portfolio-world-brand"
        onClick={onReturnToWorld}
        aria-label="Return to portfolio world"
      >
        <span className="portfolio-world-brand__mark" aria-hidden="true">
          MV
        </span>

        <span className="portfolio-world-brand__text">
          <strong>Mohit Verma</strong>

          <small>Product Builder Portfolio</small>
        </span>
      </button>

      <nav
        className="portfolio-world-navigation"
        aria-label="Portfolio navigation"
      >
        {navigationItems.map((item) => {
          const isActive = activePanel === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={
                isActive
                  ? "portfolio-world-navigation__button portfolio-world-navigation__button--active"
                  : "portfolio-world-navigation__button"
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

      <button
        type="button"
        className={
          nightIsActive
            ? "portfolio-world-time-toggle portfolio-world-time-toggle--night"
            : "portfolio-world-time-toggle"
        }
        onClick={toggleWorldTime}
        aria-label={nightIsActive ? "Switch to daytime" : "Switch to nighttime"}
        aria-pressed={nightIsActive}
        title={nightIsActive ? "Switch to day" : "Switch to night"}
      >
        <span className="portfolio-world-time-toggle__icon" aria-hidden="true">
          {nightIsActive ? "☾" : "☀"}
        </span>

        <span className="portfolio-world-time-toggle__label">
          {nightIsActive ? "Night" : "Day"}
        </span>
      </button>

      <div className="portfolio-world-status">
        <span aria-hidden="true" />
        Available to build
      </div>
    </header>
  );
}
