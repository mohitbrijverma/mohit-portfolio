"use client";

import { useEffect, useRef } from "react";

import type { WorldChapterId } from "./world-types";

const WILDLIFE_PAUSE_EVENT = "portfolio:wildlife-pause";

type PortfolioGameProps = {
  activeChapterId: WorldChapterId | null;

  ambientPaused?: boolean;
  resetRequest?: number;

  onOpenChapter: (chapterId: WorldChapterId) => void;

  onCloseChapter?: () => void;
};

export default function PortfolioGame({
  activeChapterId,
  ambientPaused = false,
  resetRequest = 0,
  onOpenChapter,
  onCloseChapter,
}: PortfolioGameProps) {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const gameRef = useRef<import("phaser").Game | null>(null);

  const openCallbackRef = useRef(onOpenChapter);

  const closeCallbackRef = useRef(onCloseChapter);

  const ambientPausedRef = useRef(ambientPaused);

  useEffect(() => {
    openCallbackRef.current = onOpenChapter;
  }, [onOpenChapter]);

  useEffect(() => {
    closeCallbackRef.current = onCloseChapter;
  }, [onCloseChapter]);

  useEffect(() => {
    ambientPausedRef.current = ambientPaused;

    gameRef.current?.events.emit(WILDLIFE_PAUSE_EVENT, ambientPaused);
  }, [ambientPaused]);

  useEffect(() => {
    let cancelled = false;

    async function createGame() {
      if (!gameContainerRef.current || gameRef.current) {
        return;
      }

      const PhaserModule = await import("phaser");

      const SceneModule = await import("./PortfolioWorldScene");

      if (cancelled || !gameContainerRef.current) {
        return;
      }

      const Phaser = PhaserModule.default;

      const PortfolioWorldScene = SceneModule.default;

      const game = new Phaser.Game({
        type: Phaser.AUTO,

        parent: gameContainerRef.current,

        transparent: true,

        audio: {
          noAudio: true,
        },

        scale: {
          mode: Phaser.Scale.RESIZE,

          autoCenter: Phaser.Scale.CENTER_BOTH,

          width: "100%",
          height: "100%",
        },

        render: {
          antialias: true,
          pixelArt: false,
          roundPixels: false,
        },

        scene: [PortfolioWorldScene],
      });

      function handleOpenChapter(chapterId: WorldChapterId) {
        openCallbackRef.current(chapterId);
      }

      function handleCloseChapter() {
        closeCallbackRef.current?.();
      }

      game.events.on("portfolio:open-chapter", handleOpenChapter);

      game.events.on("portfolio:close-chapter", handleCloseChapter);

      gameRef.current = game;

      /*
       * Normally the initial value is false.
       * This also covers a panel being opened
       * while Phaser is loading.
       */

      window.setTimeout(() => {
        if (gameRef.current === game) {
          game.events.emit(WILDLIFE_PAUSE_EVENT, ambientPausedRef.current);
        }
      }, 120);
    }

    createGame();

    return () => {
      cancelled = true;

      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (activeChapterId !== null) {
      return;
    }

    const scene = gameRef.current?.scene.getScene("PortfolioWorldScene") as
      | {
          returnToWorld?: () => void;
        }
      | undefined;

    scene?.returnToWorld?.();
  }, [activeChapterId, resetRequest]);

  return (
    <div
      ref={gameContainerRef}
      className="portfolio-game"
      aria-label="Interactive portfolio world"
    />
  );
}
