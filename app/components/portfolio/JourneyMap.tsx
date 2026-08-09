"use client";

import { useEffect, useMemo, useState } from "react";

import { journeyChapters } from "@/app/data/journey";

import JourneyChapterPanel from "./JourneyChapterPanel";
import JourneyIntroCard from "./JourneyIntroCard";
import PortfolioInfoPanel from "./PortfolioInfoPanel";

import PortfolioGame from "./game/PortfolioGame";
import PortfolioMobileNavigation from "./game/PortfolioMobileNavigation";
import PortfolioWorldHud from "./game/PortfolioWorldHud";

import type { PortfolioPanelId } from "./game/PortfolioWorldHud";

import type { WorldChapterId } from "./game/world-types";

export default function JourneyMap() {
  const [activeChapterId, setActiveChapterId] = useState<WorldChapterId | null>(
    null,
  );

  const [activePortfolioPanel, setActivePortfolioPanel] =
    useState<PortfolioPanelId | null>(null);

  const [introCollapsed, setIntroCollapsed] = useState(false);

  const [worldResetRequest, setWorldResetRequest] = useState(0);

  const activeChapter = useMemo(() => {
    if (!activeChapterId) {
      return null;
    }

    return (
      journeyChapters.find((chapter) => chapter.id === activeChapterId) ?? null
    );
  }, [activeChapterId]);

  useEffect(() => {
    const collapseTimer = window.setTimeout(() => {
      setIntroCollapsed(true);
    }, 4200);

    return () => {
      window.clearTimeout(collapseTimer);
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      if (activePortfolioPanel) {
        setActivePortfolioPanel(null);
        return;
      }

      if (activeChapterId) {
        setActiveChapterId(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeChapterId, activePortfolioPanel]);

  function openChapter(chapterId: WorldChapterId) {
    setActivePortfolioPanel(null);
    setActiveChapterId(chapterId);
    setIntroCollapsed(true);
  }

  function closeChapter() {
    setActiveChapterId(null);
  }

  function openPortfolioPanel(panelId: PortfolioPanelId) {
    setActiveChapterId(null);
    setActivePortfolioPanel(panelId);
    setIntroCollapsed(true);
  }

  function closePortfolioPanel() {
    setActivePortfolioPanel(null);
  }

  function returnToWorld() {
    setActiveChapterId(null);
    setActivePortfolioPanel(null);
    setIntroCollapsed(true);

    setWorldResetRequest((currentRequest) => currentRequest + 1);
  }

  const interfaceIsOpen =
    Boolean(activePortfolioPanel) || Boolean(activeChapterId);

  return (
    <section
      id="journey"
      className="game-portfolio"
      aria-label="Mohit Verma portfolio journey"
    >
      <PortfolioWorldHud
        activePanel={activePortfolioPanel}
        onSelectPanel={openPortfolioPanel}
        onReturnToWorld={returnToWorld}
      />

      <PortfolioMobileNavigation
        activePanel={activePortfolioPanel}
        onSelectPanel={openPortfolioPanel}
      />

      <PortfolioGame
        activeChapterId={activeChapterId}
        ambientPaused={interfaceIsOpen}
        resetRequest={worldResetRequest}
        onOpenChapter={openChapter}
        onCloseChapter={closeChapter}
      />

      {!interfaceIsOpen && (
        <JourneyIntroCard
          collapsed={introCollapsed}
          onCollapse={() => {
            setIntroCollapsed(true);
          }}
          onExpand={() => {
            setIntroCollapsed(false);
          }}
        />
      )}

      <JourneyChapterPanel chapter={activeChapter} onClose={closeChapter} />

      <PortfolioInfoPanel
        activePanel={activePortfolioPanel}
        onSelectPanel={openPortfolioPanel}
        onClose={closePortfolioPanel}
      />

      {!interfaceIsOpen && (
        <div className="game-interface" aria-hidden="true">
          <span>Drag to explore</span>

          <span>Select a destination</span>
        </div>
      )}
    </section>
  );
}
