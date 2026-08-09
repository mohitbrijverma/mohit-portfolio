import Phaser from "phaser";

import type { WorldDimensions } from "../world-types";

import type {
  WorldTimeEventPayload,
  WorldTimeMode,
} from "../day-night/day-night-types";

import { WORLD_TIME_CHANGE_EVENT } from "../day-night/world-day-night";

import {
  createWildlifeLoop,
  getWildlifeAmount,
  randomBetween,
} from "./wildlife-common";

import type { WildlifeController } from "./wildlife-common";

type Butterfly = {
  container: Phaser.GameObjects.Container;

  leftWing: Phaser.GameObjects.Ellipse;

  rightWing: Phaser.GameObjects.Ellipse;

  anchorX: number;
  anchorY: number;

  x: number;
  y: number;

  velocityX: number;
  velocityY: number;

  phase: number;
  range: number;
};

type ButterflyArea = {
  x: number;
  y: number;
};

const BUTTERFLY_COLOURS = [
  0xf7b344, 0xb25cff, 0x2ec7ef, 0x4fd096, 0xff7a59, 0xff77c8, 0x8deaff,
];

function getInitialMode(): WorldTimeMode {
  if (typeof window === "undefined") {
    return "day";
  }

  return window.localStorage.getItem("portfolio-world-time") === "night"
    ? "night"
    : "day";
}

/*
 * Some positions intentionally extend beyond
 * 0 and world.width. The enlarged background
 * reaches those areas on wide screens.
 */
function getButterflyAreas(world: WorldDimensions): ButterflyArea[] {
  return [
    // Extended left background
    {
      x: -world.width * 0.28,
      y: world.height * 0.38,
    },
    {
      x: -world.width * 0.2,
      y: world.height * 0.62,
    },
    {
      x: -world.width * 0.1,
      y: world.height * 0.82,
    },

    // Main world
    {
      x: world.width * 0.07,
      y: world.height * 0.7,
    },
    {
      x: world.width * 0.16,
      y: world.height * 0.48,
    },
    {
      x: world.width * 0.26,
      y: world.height * 0.72,
    },
    {
      x: world.width * 0.37,
      y: world.height * 0.55,
    },
    {
      x: world.width * 0.47,
      y: world.height * 0.8,
    },
    {
      x: world.width * 0.58,
      y: world.height * 0.48,
    },
    {
      x: world.width * 0.68,
      y: world.height * 0.72,
    },
    {
      x: world.width * 0.78,
      y: world.height * 0.5,
    },
    {
      x: world.width * 0.9,
      y: world.height * 0.72,
    },

    // Extended right background
    {
      x: world.width * 1.08,
      y: world.height * 0.42,
    },
    {
      x: world.width * 1.18,
      y: world.height * 0.62,
    },
    {
      x: world.width * 1.29,
      y: world.height * 0.82,
    },
  ];
}

export function createWorldButterflies(
  scene: Phaser.Scene,
  world: WorldDimensions,
): WildlifeController {
  const layer = scene.add.container(0, 0);

  layer.setDepth(9);

  /*
   * Increased population:
   * 38 desktop and 16 mobile.
   */
  const amount = getWildlifeAmount(scene, 38, 16);

  const areas = getButterflyAreas(world);

  const butterflies = Array.from(
    {
      length: amount,
    },

    (_, index) => createButterfly(scene, layer, world, areas, index),
  );

  const loop = createWildlifeLoop(scene, (time, delta) => {
    butterflies.forEach((butterfly, index) => {
      updateButterfly(scene, butterfly, world, time, delta, index);
    });
  });

  let mode = getInitialMode();

  let paused = false;
  let destroyed = false;

  function updateVisibility() {
    const visible = !paused && mode === "day";

    layer.setVisible(visible);

    loop.setPaused(!visible);

    butterflies.forEach((butterfly) => {
      butterfly.container.setVisible(visible);

      butterfly.container.setAlpha(0.9);
    });
  }

  function handleTimeChange(payload: WorldTimeEventPayload) {
    mode = payload.mode;

    updateVisibility();
  }

  function setPaused(nextPaused: boolean) {
    paused = nextPaused;

    updateVisibility();
  }

  function destroy() {
    if (destroyed) {
      return;
    }

    destroyed = true;

    scene.game.events.off(WORLD_TIME_CHANGE_EVENT, handleTimeChange);

    scene.events.off("shutdown", destroy);

    loop.destroy();
    layer.destroy(true);
  }

  scene.game.events.on(WORLD_TIME_CHANGE_EVENT, handleTimeChange);

  scene.events.once("shutdown", destroy);

  updateVisibility();

  return {
    setPaused,
    destroy,
  };
}

function createButterfly(
  scene: Phaser.Scene,
  layer: Phaser.GameObjects.Container,
  world: WorldDimensions,
  areas: ButterflyArea[],
  index: number,
): Butterfly {
  const area = areas[index % areas.length];

  const minimumX = -world.width * 0.34;

  const maximumX = world.width * 1.34;

  const anchorX = Phaser.Math.Clamp(
    area.x + randomBetween(-55, 55),

    minimumX,
    maximumX,
  );

  const anchorY = Phaser.Math.Clamp(
    area.y + randomBetween(-38, 38),

    world.height * 0.18,
    world.height * 0.94,
  );

  const colour = BUTTERFLY_COLOURS[index % BUTTERFLY_COLOURS.length];

  const size = randomBetween(5, 8.5);

  const leftWing = scene.add.ellipse(
    -size * 0.52,
    0,
    size,
    size * 1.25,
    colour,
    0.82,
  );

  const rightWing = scene.add.ellipse(
    size * 0.52,
    0,
    size,
    size * 1.25,
    colour,
    0.82,
  );

  leftWing.setStrokeStyle(0.7, 0xffffff, 0.38);

  rightWing.setStrokeStyle(0.7, 0xffffff, 0.38);

  const body = scene.add.ellipse(0, 0, size * 0.28, size * 1.2, 0x17243b, 0.9);

  const container = scene.add.container(
    anchorX + randomBetween(-36, 36),

    anchorY + randomBetween(-24, 24),

    [leftWing, rightWing, body],
  );

  layer.add(container);

  return {
    container,
    leftWing,
    rightWing,

    anchorX,
    anchorY,

    x: container.x,
    y: container.y,

    velocityX: randomBetween(-0.018, 0.018),

    velocityY: randomBetween(-0.014, 0.014),

    phase: index * 0.9 + randomBetween(0, Math.PI),

    range: randomBetween(32, 68),
  };
}

function updateButterfly(
  scene: Phaser.Scene,
  butterfly: Butterfly,
  world: WorldDimensions,
  time: number,
  delta: number,
  index: number,
) {
  if (!butterfly.container.visible) {
    return;
  }

  const targetX =
    butterfly.anchorX +
    Math.sin(time * 0.00075 + butterfly.phase) * butterfly.range;

  const targetY =
    butterfly.anchorY +
    Math.cos(time * 0.0011 + butterfly.phase) * butterfly.range * 0.48;

  butterfly.velocityX += (targetX - butterfly.x) * 0.00008 * delta;

  butterfly.velocityY += (targetY - butterfly.y) * 0.00008 * delta;

  butterfly.velocityX += Math.sin(time * 0.002 + index) * 0.00025 * delta;

  butterfly.velocityY += Math.cos(time * 0.0024 + index) * 0.0002 * delta;

  applyPointerReaction(scene.input.activePointer, butterfly, delta);

  butterfly.velocityX *= 0.96;
  butterfly.velocityY *= 0.96;

  butterfly.x += butterfly.velocityX * delta;

  butterfly.y += butterfly.velocityY * delta;

  butterfly.x = Phaser.Math.Clamp(
    butterfly.x,
    -world.width * 0.34,
    world.width * 1.34,
  );

  butterfly.y = Phaser.Math.Clamp(
    butterfly.y,
    world.height * 0.16,
    world.height * 0.96,
  );

  butterfly.container.setPosition(butterfly.x, butterfly.y);

  butterfly.container.setRotation(
    Math.atan2(butterfly.velocityY, butterfly.velocityX) * 0.18,
  );

  animateWings(butterfly, time);
}

function applyPointerReaction(
  pointer: Phaser.Input.Pointer,
  butterfly: Butterfly,
  delta: number,
) {
  const differenceX = butterfly.x - pointer.worldX;

  const differenceY = butterfly.y - pointer.worldY;

  const distance = Math.hypot(differenceX, differenceY);

  const reactionRadius = 90;

  if (distance <= 0 || distance >= reactionRadius) {
    return;
  }

  const strength = (reactionRadius - distance) / reactionRadius;

  butterfly.velocityX += (differenceX / distance) * strength * 0.0024 * delta;

  butterfly.velocityY += (differenceY / distance) * strength * 0.0024 * delta;
}

function animateWings(butterfly: Butterfly, time: number) {
  const flap = 0.28 + Math.abs(Math.sin(time * 0.014 + butterfly.phase)) * 0.9;

  butterfly.leftWing.setScale(flap, 1);

  butterfly.rightWing.setScale(flap, 1);
}
