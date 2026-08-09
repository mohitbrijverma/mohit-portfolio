import type Phaser from "phaser";

export type WildlifeController = {
  setPaused: (
    paused: boolean,
  ) => void;

  destroy: () => void;
};

type WildlifeUpdate = (
  time: number,
  delta: number,
) => void;

export function getWildlifeAmount(
  scene: Phaser.Scene,
  desktopAmount: number,
  mobileAmount: number,
) {
  return scene.scale.width < 768
    ? mobileAmount
    : desktopAmount;
}

export function createWildlifeLoop(
  scene: Phaser.Scene,
  update: WildlifeUpdate,
): WildlifeController {
  const motionPreference =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

  let manuallyPaused = false;
  let reducedMotion =
    motionPreference.matches;

  function shouldAnimate() {
    return (
      !manuallyPaused &&
      !reducedMotion &&
      !document.hidden
    );
  }

  function handleUpdate(
    time: number,
    delta: number,
  ) {
    if (!shouldAnimate()) {
      return;
    }

    update(
      time,
      Math.min(delta, 40),
    );
  }

  function handleMotionChange(
    event:
      MediaQueryListEvent,
  ) {
    reducedMotion = event.matches;
  }

  function handleVisibilityChange() {
    /*
     * The update loop checks document.hidden.
     * This listener helps browsers refresh state
     * immediately after returning to the page.
     */
  }

  scene.events.on(
    "update",
    handleUpdate,
  );

  motionPreference.addEventListener(
    "change",
    handleMotionChange,
  );

  document.addEventListener(
    "visibilitychange",
    handleVisibilityChange,
  );

  function destroy() {
    scene.events.off(
      "update",
      handleUpdate,
    );

    motionPreference.removeEventListener(
      "change",
      handleMotionChange,
    );

    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );
  }

  scene.events.once(
    "shutdown",
    destroy,
  );

  return {
    setPaused(paused: boolean) {
      manuallyPaused = paused;
    },

    destroy,
  };
}

export function randomBetween(
  minimum: number,
  maximum: number,
) {
  return (
    minimum +
    Math.random() *
      (maximum - minimum)
  );
}

export function wrapValue(
  value: number,
  minimum: number,
  maximum: number,
) {
  const range =
    maximum - minimum;

  if (value < minimum) {
    return maximum;
  }

  if (value > maximum) {
    return minimum;
  }

  return (
    minimum +
    ((value - minimum) % range)
  );
}