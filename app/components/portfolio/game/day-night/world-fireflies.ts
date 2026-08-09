import Phaser from "phaser";

import type { WorldDimensions } from "../world-types";

import type { WildlifeController } from "../wildlife/wildlife-common";

import { WORLD_TIME_CHANGE_EVENT } from "./world-day-night";

import type { WorldTimeEventPayload, WorldTimeMode } from "./day-night-types";

type Firefly = {
  container: Phaser.GameObjects.Container;

  glow: Phaser.GameObjects.Arc;

  middleGlow: Phaser.GameObjects.Arc;

  core: Phaser.GameObjects.Arc;

  anchorX: number;
  anchorY: number;

  phase: number;
  speed: number;

  rangeX: number;
  rangeY: number;
};

const FIREFLY_COLOURS = [0xffdd67, 0xfff2a6, 0x8dffb3, 0x79eaff];

function getInitialMode(): WorldTimeMode {
  if (typeof window === "undefined") {
    return "day";
  }

  return window.localStorage.getItem("portfolio-world-time") === "night"
    ? "night"
    : "day";
}

export function createWorldFireflies(
  scene: Phaser.Scene,
  world: WorldDimensions,
): WildlifeController {
  const layer = scene.add.container(0, 0);

  layer.setDepth(11);

  const mobile = scene.scale.width < 768;

  /*
   * Increased population across the complete world,
   * including the extended left and right background.
   */
  const amount = mobile ? 36 : 82;

  let mode = getInitialMode();

  let paused = false;
  let destroyed = false;

  const fireflies = Array.from(
    {
      length: amount,
    },

    (_, index) => createFirefly(scene, layer, world, index),
  );

  function update(time: number, delta: number) {
    if (paused || destroyed) {
      return;
    }

    fireflies.forEach((firefly, index) => {
      updateFirefly(firefly, time, delta, index, mode);
    });
  }

  function applyMode(nextMode: WorldTimeMode) {
    mode = nextMode;

    const night = mode === "night";

    fireflies.forEach((firefly, index) => {
      scene.tweens.killTweensOf(firefly.container);

      scene.tweens.add({
        targets: firefly.container,

        alpha: night
          ? Phaser.Math.FloatBetween(0.72, 1)
          : index % 7 === 0
            ? 0.12
            : 0,

        duration: 700,

        delay: (index % 10) * 30,

        ease: Phaser.Math.Easing.Sine.InOut,
      });
    });
  }

  function handleTimeChange(payload: WorldTimeEventPayload) {
    applyMode(payload.mode);
  }

  function setPaused(nextPaused: boolean) {
    paused = nextPaused;

    layer.setVisible(!nextPaused);
  }

  function destroy() {
    if (destroyed) {
      return;
    }

    destroyed = true;

    scene.game.events.off(WORLD_TIME_CHANGE_EVENT, handleTimeChange);

    scene.events.off(Phaser.Scenes.Events.UPDATE, update);

    scene.events.off("shutdown", destroy);

    fireflies.forEach((firefly) => {
      scene.tweens.killTweensOf(firefly.container);
    });

    layer.destroy(true);
  }

  scene.game.events.on(WORLD_TIME_CHANGE_EVENT, handleTimeChange);

  scene.events.on(Phaser.Scenes.Events.UPDATE, update);

  scene.events.once("shutdown", destroy);

  applyMode(mode);

  return {
    setPaused,
    destroy,
  };
}

function createFirefly(
  scene: Phaser.Scene,
  layer: Phaser.GameObjects.Container,
  world: WorldDimensions,
  index: number,
): Firefly {
  /*
   * Extending beyond 0 and world.width allows
   * lights to appear on the enlarged side background.
   */
  const minimumX = -world.width * 0.34;

  const maximumX = world.width * 1.34;

  const anchorX = Phaser.Math.FloatBetween(minimumX, maximumX);

  const anchorY = Phaser.Math.FloatBetween(
    world.height * 0.1,
    world.height * 0.94,
  );

  const colour = FIREFLY_COLOURS[index % FIREFLY_COLOURS.length];

  const size = Phaser.Math.FloatBetween(1.8, 3.3);

  const glow = scene.add.circle(0, 0, size * 3.6, colour, 0.2);

  glow.setBlendMode(Phaser.BlendModes.ADD);

  const middleGlow = scene.add.circle(0, 0, size * 2, colour, 0.36);

  middleGlow.setBlendMode(Phaser.BlendModes.ADD);

  const core = scene.add.circle(0, 0, size, colour, 1);

  core.setBlendMode(Phaser.BlendModes.ADD);

  const container = scene.add.container(anchorX, anchorY, [
    glow,
    middleGlow,
    core,
  ]);

  container.setAlpha(0);

  layer.add(container);

  return {
    container,
    glow,
    middleGlow,
    core,

    anchorX,
    anchorY,

    phase: index * 0.61 + Phaser.Math.FloatBetween(0, Math.PI * 2),

    speed: Phaser.Math.FloatBetween(0.00045, 0.0011),

    rangeX: Phaser.Math.FloatBetween(14, 42),

    rangeY: Phaser.Math.FloatBetween(12, 35),
  };
}

function updateFirefly(
  firefly: Firefly,
  time: number,
  delta: number,
  index: number,
  mode: WorldTimeMode,
) {
  const movementTime = time * firefly.speed;

  const driftX = Math.sin(movementTime + firefly.phase) * firefly.rangeX;

  const driftY = Math.cos(movementTime * 1.37 + firefly.phase) * firefly.rangeY;

  firefly.container.setPosition(
    firefly.anchorX + driftX,

    firefly.anchorY + driftY,
  );

  const pulse = 0.62 + Math.sin(time * 0.0045 + firefly.phase) * 0.3;

  const nightStrength = mode === "night" ? 1 : index % 7 === 0 ? 0.12 : 0;

  firefly.glow.setAlpha(
    Phaser.Math.Clamp(pulse * 0.3 * nightStrength, 0, 0.36),
  );

  firefly.middleGlow.setAlpha(
    Phaser.Math.Clamp(pulse * 0.48 * nightStrength, 0, 0.55),
  );

  firefly.core.setAlpha(Phaser.Math.Clamp(pulse * nightStrength, 0, 1));

  const scale = 0.84 + Math.sin(time * 0.005 + firefly.phase) * 0.17;

  firefly.container.setScale(scale);

  firefly.phase += delta * 0.000001 * (index + 1);
}
