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

type Bird = {
  container: Phaser.GameObjects.Container;

  drawing: Phaser.GameObjects.Graphics;

  x: number;
  y: number;

  velocityX: number;
  velocityY: number;

  size: number;
  phase: number;

  baseY: number;
  flightRange: number;
};

const BIRD_COLOURS = [0x16243a, 0x223b5f, 0x334e73, 0x513c65, 0x874c62];

function getInitialMode(): WorldTimeMode {
  if (typeof window === "undefined") {
    return "day";
  }

  return window.localStorage.getItem("portfolio-world-time") === "night"
    ? "night"
    : "day";
}

export function createWorldBirds(
  scene: Phaser.Scene,
  world: WorldDimensions,
): WildlifeController {
  const layer = scene.add.container(0, 0);

  layer.setDepth(8);

  const amount = getWildlifeAmount(scene, 12, 6);

  const birds = Array.from(
    {
      length: amount,
    },

    (_, index) => createBird(scene, layer, world, index, amount),
  );

  const loop = createWildlifeLoop(scene, (time, delta) => {
    birds.forEach((bird, index) => {
      updateBird(scene, bird, world, time, delta, index);
    });
  });

  let mode = getInitialMode();

  let paused = false;
  let destroyed = false;

  function updateVisibility() {
    /*
     * All birds disappear at night.
     */
    layer.setVisible(!paused && mode === "day");
  }

  function handleTimeChange(payload: WorldTimeEventPayload) {
    mode = payload.mode;

    updateVisibility();
  }

  function setPaused(nextPaused: boolean) {
    paused = nextPaused;

    loop.setPaused(nextPaused || mode === "night");

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

function createBird(
  scene: Phaser.Scene,
  layer: Phaser.GameObjects.Container,
  world: WorldDimensions,
  index: number,
  amount: number,
): Bird {
  const size = randomBetween(7, 12);

  const colour = BIRD_COLOURS[index % BIRD_COLOURS.length];

  const drawing = scene.add.graphics();

  drawBirdShape(drawing, size, colour, 0);

  const initialX =
    world.width * (0.08 + (index / Math.max(amount - 1, 1)) * 0.84) +
    randomBetween(-45, 45);

  /*
   * Birds remain in the upper sky area.
   */
  const baseY = world.height * randomBetween(0.11, 0.3);

  const container = scene.add.container(initialX, baseY, [drawing]);

  container.setAlpha(randomBetween(0.58, 0.88));

  layer.add(container);

  return {
    container,
    drawing,

    x: initialX,
    y: baseY,

    velocityX: randomBetween(0.018, 0.042),

    velocityY: randomBetween(-0.004, 0.004),

    size,

    phase: index * 0.74 + randomBetween(0, Math.PI * 2),

    baseY,

    flightRange: randomBetween(14, 35),
  };
}

function updateBird(
  scene: Phaser.Scene,
  bird: Bird,
  world: WorldDimensions,
  time: number,
  delta: number,
  index: number,
) {
  const targetY =
    bird.baseY + Math.sin(time * 0.0007 + bird.phase) * bird.flightRange;

  bird.velocityY += (targetY - bird.y) * 0.000015 * delta;

  bird.velocityX += Math.sin(time * 0.00045 + index) * 0.000003 * delta;

  applyPointerReaction(scene.input.activePointer, bird, delta);

  bird.velocityX = Phaser.Math.Clamp(bird.velocityX, 0.016, 0.05);

  bird.velocityY = Phaser.Math.Clamp(bird.velocityY, -0.025, 0.025);

  bird.x += bird.velocityX * delta;

  bird.y += bird.velocityY * delta;

  /*
   * Birds loop around the world instead of
   * travelling over buildings or lower roads.
   */
  if (bird.x > world.width + 40) {
    bird.x = -40;

    bird.baseY = world.height * randomBetween(0.11, 0.3);

    bird.y = bird.baseY;
  }

  bird.y = Phaser.Math.Clamp(bird.y, world.height * 0.07, world.height * 0.34);

  bird.container.setPosition(bird.x, bird.y);

  bird.container.setRotation(
    Phaser.Math.Clamp(bird.velocityY * 3, -0.18, 0.18),
  );

  const flap = Math.sin(time * 0.012 + bird.phase);

  const colour = BIRD_COLOURS[index % BIRD_COLOURS.length];

  drawBirdShape(bird.drawing, bird.size, colour, flap);
}

function applyPointerReaction(
  pointer: Phaser.Input.Pointer,
  bird: Bird,
  delta: number,
) {
  const differenceX = bird.x - pointer.worldX;

  const differenceY = bird.y - pointer.worldY;

  const distance = Math.hypot(differenceX, differenceY);

  const reactionRadius = 120;

  if (distance <= 0 || distance >= reactionRadius) {
    return;
  }

  const strength = (reactionRadius - distance) / reactionRadius;

  bird.velocityX += (differenceX / distance) * strength * 0.00035 * delta;

  bird.velocityY += (differenceY / distance) * strength * 0.00035 * delta;
}

function drawBirdShape(
  drawing: Phaser.GameObjects.Graphics,
  size: number,
  colour: number,
  flap: number,
) {
  drawing.clear();

  drawing.lineStyle(Math.max(1.4, size * 0.2), colour, 0.9);

  drawing.beginPath();

  drawing.moveTo(-size, flap * size * 0.46);

  drawing.lineTo(0, size * 0.18);

  drawing.lineTo(size, flap * size * 0.46);

  drawing.strokePath();
}
