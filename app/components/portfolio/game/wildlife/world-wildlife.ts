import type Phaser from "phaser";

import type { WorldDimensions } from "../world-types";
import type { WildlifeController } from "./wildlife-common";

import { createWorldBirds } from "./world-birds";
import { createWorldButterflies } from "./world-butterflies";

export const WILDLIFE_PAUSE_EVENT =
  "portfolio:wildlife-pause";

export function createWorldWildlife(
  scene: Phaser.Scene,
  world: WorldDimensions,
): WildlifeController {
  const controllers: WildlifeController[] = [
    createWorldBirds(scene, world),
    createWorldButterflies(scene, world),
  ];

  let paused = false;
  let destroyed = false;

  function setPaused(nextPaused: boolean) {
    if (destroyed || paused === nextPaused) {
      return;
    }

    paused = nextPaused;

    controllers.forEach((controller) => {
      controller.setPaused(nextPaused);
    });
  }

  function handlePauseEvent(nextPaused: boolean) {
    setPaused(Boolean(nextPaused));
  }

  function destroy() {
    if (destroyed) {
      return;
    }

    destroyed = true;

    scene.game.events.off(
      WILDLIFE_PAUSE_EVENT,
      handlePauseEvent,
    );

    scene.events.off(
      "shutdown",
      destroy,
    );

    controllers.forEach((controller) => {
      controller.destroy();
    });
  }

  scene.game.events.on(
    WILDLIFE_PAUSE_EVENT,
    handlePauseEvent,
  );

  scene.events.once(
    "shutdown",
    destroy,
  );

  return {
    setPaused,
    destroy,
  };
}