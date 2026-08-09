import Phaser from "phaser";

import type {
  WorldDimensions,
} from "../world-types";

import type {
  WorldTimeController,
  WorldTimeEventPayload,
  WorldTimeMode,
} from "./day-night-types";

export const WORLD_TIME_CHANGE_EVENT =
  "portfolio:world-time-change";

export const WORLD_TIME_TOGGLE_EVENT =
  "portfolio:world-time-toggle";

function getInitialMode(): WorldTimeMode {
  if (
    typeof window ===
    "undefined"
  ) {
    return "day";
  }

  const storedMode =
    window.localStorage.getItem(
      "portfolio-world-time",
    );

  if (
    storedMode === "day" ||
    storedMode === "night"
  ) {
    return storedMode;
  }

  const hour =
    new Date().getHours();

  return hour >= 19 ||
    hour < 6
    ? "night"
    : "day";
}

export function createWorldDayNight(
  scene: Phaser.Scene,
  world: WorldDimensions,
): WorldTimeController {
  const overlay =
    createNightOverlay(
      scene,
      world,
    );

  let mode =
    getInitialMode();

  let destroyed = false;

  function emitModeChange() {
    const payload:
      WorldTimeEventPayload = {
        mode,
      };

    scene.game.events.emit(
      WORLD_TIME_CHANGE_EVENT,
      payload,
    );

    if (
      typeof window !==
      "undefined"
    ) {
      window.dispatchEvent(
        new CustomEvent<WorldTimeEventPayload>(
          WORLD_TIME_CHANGE_EVENT,
          {
            detail: payload,
          },
        ),
      );
    }
  }

  function applyMode(
    nextMode: WorldTimeMode,
    immediate = false,
  ) {
    if (destroyed) {
      return;
    }

    mode = nextMode;

    const targetAlpha =
      mode === "night"
        ? 0.3
        : 0;

    scene.tweens.killTweensOf(
      overlay,
    );

    if (immediate) {
      overlay.setAlpha(
        targetAlpha,
      );
    } else {
      scene.tweens.add({
        targets: overlay,

        alpha:
          targetAlpha,

        duration: 850,

        ease:
          Phaser.Math.Easing.Sine
            .InOut,
      });
    }

    if (
      typeof window !==
      "undefined"
    ) {
      window.localStorage.setItem(
        "portfolio-world-time",
        mode,
      );
    }

    emitModeChange();
  }

  function setMode(
    nextMode: WorldTimeMode,
  ) {
    if (
      destroyed ||
      nextMode === mode
    ) {
      return;
    }

    applyMode(nextMode);
  }

  function toggleMode() {
    setMode(
      mode === "day"
        ? "night"
        : "day",
    );
  }

  function handleToggleRequest() {
    toggleMode();
  }

  function destroy() {
    if (destroyed) {
      return;
    }

    destroyed = true;

    scene.game.events.off(
      WORLD_TIME_TOGGLE_EVENT,
      handleToggleRequest,
    );

    if (
      typeof window !==
      "undefined"
    ) {
      window.removeEventListener(
        WORLD_TIME_TOGGLE_EVENT,
        handleToggleRequest,
      );
    }

    scene.events.off(
      "shutdown",
      destroy,
    );

    scene.tweens.killTweensOf(
      overlay,
    );

    overlay.destroy();
  }

  scene.game.events.on(
    WORLD_TIME_TOGGLE_EVENT,
    handleToggleRequest,
  );

  if (
    typeof window !==
    "undefined"
  ) {
    window.addEventListener(
      WORLD_TIME_TOGGLE_EVENT,
      handleToggleRequest,
    );
  }

  scene.events.once(
    "shutdown",
    destroy,
  );

  applyMode(
    mode,
    true,
  );

  return {
    getMode() {
      return mode;
    },

    setMode,
    toggleMode,
    destroy,
  };
}

function createNightOverlay(
  scene: Phaser.Scene,
  world: WorldDimensions,
): Phaser.GameObjects.Rectangle {
  return scene.add
    .rectangle(
      world.width / 2,
      world.height / 2,
      world.width,
      world.height,
      0x071b38,
      1,
    )
    .setDepth(5)
    .setAlpha(0);
}