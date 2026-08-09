import Phaser from "phaser";

import type {
  HotspotCallbacks,
  WorldChapterId,
  WorldDestination,
} from "../world-types";

import {
  hideHotspotLabel,
  showHotspotLabel,
  startHotspotPulse,
  type HotspotVisuals,
} from "./hotspot-animation";

import {
  createHotspotLabel,
} from "./hotspot-label";

const CLICK_DISTANCE_LIMIT = 12;
const LABEL_HIDE_DELAY = 1200;

const HOTSPOT_HOVER_EVENT =
  "portfolio:hotspot-hover";

export function createHotspot(
  scene: Phaser.Scene,
  destination: WorldDestination,
  callbacks: HotspotCallbacks,
) {
  const container =
    scene.add.container(
      destination.x,
      destination.y,
    );

  const halo = createHalo(
    scene,
    destination,
  );

  const label = createHotspotLabel(
    scene,
    destination,
  );

  const interactionZone =
    createInteractionZone(
      scene,
      destination,
    );

  container.add([
    halo,
    label.background,
    label.text,
    interactionZone,
  ]);

  const visuals: HotspotVisuals = {
    container,
    halo,
    label,
  };

  let pulseTween =
    startHotspotPulse(
      scene,
      halo,
    );

  let hideTimer:
    | Phaser.Time.TimerEvent
    | null = null;

  let restartTimer:
    | Phaser.Time.TimerEvent
    | null = null;

  let pointerStartX = 0;
  let pointerStartY = 0;

  function clearHideTimer() {
    hideTimer?.remove(false);
    hideTimer = null;
  }

  function clearRestartTimer() {
    restartTimer?.remove(false);
    restartTimer = null;
  }

  function stopPulse() {
    clearRestartTimer();
    pulseTween?.stop();
  }

  function restartPulse() {
    clearRestartTimer();

    restartTimer =
      scene.time.delayedCall(
        200,
        () => {
          if (
            callbacks.getSelectedDestination() ===
            destination.id
          ) {
            return;
          }

          pulseTween =
            startHotspotPulse(
              scene,
              halo,
            );
        },
      );
  }

  function hideLabel() {
    clearHideTimer();

    if (
      callbacks.getSelectedDestination() ===
      destination.id
    ) {
      return;
    }

    hideHotspotLabel(
      scene,
      visuals,
    );

    restartPulse();
  }

  function scheduleLabelHide() {
    clearHideTimer();

    hideTimer =
      scene.time.delayedCall(
        LABEL_HIDE_DELAY,
        () => {
          hideLabel();
        },
      );
  }

  function handleAnotherHotspotHover(
    hoveredId: WorldChapterId,
  ) {
    if (
      hoveredId === destination.id
    ) {
      return;
    }

    hideLabel();
  }

  interactionZone.on(
    "pointerover",
    () => {
      scene.events.emit(
        HOTSPOT_HOVER_EVENT,
        destination.id,
      );

      stopPulse();

      showHotspotLabel(
        scene,
        visuals,
      );

      scheduleLabelHide();

      scene.input.setDefaultCursor(
        "pointer",
      );
    },
  );

  interactionZone.on(
    "pointerout",
    () => {
      scene.input.setDefaultCursor(
        "default",
      );

      hideLabel();
    },
  );

  interactionZone.on(
    "pointerdown",
    (
      pointer:
        Phaser.Input.Pointer,
    ) => {
      pointerStartX = pointer.x;
      pointerStartY = pointer.y;

      stopPulse();
      clearHideTimer();
    },
  );

  interactionZone.on(
    "pointerup",
    (
      pointer:
        Phaser.Input.Pointer,
    ) => {
      const movementX =
        pointer.x - pointerStartX;

      const movementY =
        pointer.y - pointerStartY;

      const distance =
        Math.sqrt(
          movementX * movementX +
            movementY * movementY,
        );

      if (
        distance >
        CLICK_DISTANCE_LIMIT
      ) {
        hideLabel();
        return;
      }

      scene.events.emit(
        HOTSPOT_HOVER_EVENT,
        destination.id,
      );

      showHotspotLabel(
        scene,
        visuals,
      );

      callbacks.onSelectDestination(
        destination,
      );
    },
  );

  scene.events.on(
    HOTSPOT_HOVER_EVENT,
    handleAnotherHotspotHover,
  );

  scene.events.once(
    "shutdown",
    () => {
      clearHideTimer();
      clearRestartTimer();

      pulseTween?.stop();

      scene.events.off(
        HOTSPOT_HOVER_EVENT,
        handleAnotherHotspotHover,
      );
    },
  );

  return container;
}

function createHalo(
  scene: Phaser.Scene,
  destination: WorldDestination,
) {
  const isMobile =
    scene.scale.width < 768;

  const haloWidth = isMobile
    ? destination.width * 0.95
    : destination.width * 0.78;

  const haloHeight = isMobile
    ? destination.height * 0.72
    : destination.height * 0.58;

  return scene.add
    .ellipse(
      0,
      destination.height * 0.12,
      haloWidth,
      haloHeight,
      destination.accent,
      0.14,
    )
    .setStrokeStyle(
      isMobile ? 4 : 3,
      destination.accent,
      0.65,
    );
}

function createInteractionZone(
  scene: Phaser.Scene,
  destination: WorldDestination,
) {
  const isMobile =
    scene.scale.width < 768;

  const width = isMobile
    ? destination.width * 1.2
    : destination.width;

  const height = isMobile
    ? destination.height * 1.2
    : destination.height;

  return scene.add
    .zone(
      0,
      0,
      width,
      height,
    )
    .setInteractive({
      useHandCursor: true,
    });
}