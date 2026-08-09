import Phaser from "phaser";

import type { WorldDimensions } from "../world-types";
import type { WildlifeController } from "../wildlife/wildlife-common";

import { WORLD_TIME_CHANGE_EVENT } from "./world-day-night";

import type { WorldTimeEventPayload, WorldTimeMode } from "./day-night-types";

type Mushroom = {
  container: Phaser.GameObjects.Container;
  glow: Phaser.GameObjects.Arc;
  cap: Phaser.GameObjects.Ellipse;
  phase: number;
};

type MushroomPosition = {
  x: number;
  y: number;
  scale: number;
};

const MUSHROOM_COLOURS = [0x79eaff, 0x9b7cff, 0xff77c8, 0x78ffb0];

function getInitialMode(): WorldTimeMode {
  if (typeof window === "undefined") {
    return "day";
  }

  return window.localStorage.getItem("portfolio-world-time") === "night"
    ? "night"
    : "day";
}

function getMushroomPositions(world: WorldDimensions): MushroomPosition[] {
  return [
    {
      x: world.width * 0.055,
      y: world.height * 0.72,
      scale: 1,
    },
    {
      x: world.width * 0.09,
      y: world.height * 0.84,
      scale: 0.82,
    },
    {
      x: world.width * 0.16,
      y: world.height * 0.91,
      scale: 1.08,
    },
    {
      x: world.width * 0.23,
      y: world.height * 0.87,
      scale: 0.76,
    },
    {
      x: world.width * 0.75,
      y: world.height * 0.88,
      scale: 0.86,
    },
    {
      x: world.width * 0.82,
      y: world.height * 0.9,
      scale: 1.05,
    },
    {
      x: world.width * 0.9,
      y: world.height * 0.82,
      scale: 0.82,
    },
    {
      x: world.width * 0.95,
      y: world.height * 0.68,
      scale: 1,
    },
    {
      x: world.width * 0.91,
      y: world.height * 0.52,
      scale: 0.72,
    },
    {
      x: world.width * 0.86,
      y: world.height * 0.35,
      scale: 0.78,
    },
    {
      x: world.width * 0.07,
      y: world.height * 0.46,
      scale: 0.75,
    },
    {
      x: world.width * 0.13,
      y: world.height * 0.57,
      scale: 0.88,
    },
  ];
}

export function createWorldGlowingMushrooms(
  scene: Phaser.Scene,
  world: WorldDimensions,
): WildlifeController {
  const layer = scene.add.container(0, 0);

  layer.setDepth(11);

  const mobile = scene.scale.width < 768;

  const positions = getMushroomPositions(world);

  const amount = mobile ? 7 : positions.length;

  const mushrooms = positions
    .slice(0, amount)
    .map((position, index) => createMushroom(scene, layer, position, index));

  let mode = getInitialMode();
  let paused = false;
  let destroyed = false;

  function update(time: number) {
    if (paused || destroyed) {
      return;
    }

    mushrooms.forEach((mushroom) => {
      animateMushroom(mushroom, time, mode);
    });
  }

  function applyMode(nextMode: WorldTimeMode) {
    mode = nextMode;

    const night = mode === "night";

    mushrooms.forEach((mushroom, index) => {
      scene.tweens.killTweensOf(mushroom.container);

      scene.tweens.add({
        targets: mushroom.container,

        alpha: night ? 1 : 0.22,

        duration: 850,

        delay: (index % 6) * 55,

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

    mushrooms.forEach((mushroom) => {
      scene.tweens.killTweensOf(mushroom.container);
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

function createMushroom(
  scene: Phaser.Scene,
  layer: Phaser.GameObjects.Container,
  position: MushroomPosition,
  index: number,
): Mushroom {
  const colour = MUSHROOM_COLOURS[index % MUSHROOM_COLOURS.length];

  const size = Phaser.Math.FloatBetween(7, 10);

  const glow = scene.add.circle(0, -size * 0.25, size * 2.3, colour, 0.15);

  glow.setBlendMode(Phaser.BlendModes.ADD);

  const stem = scene.add.rectangle(
    0,
    size * 0.35,
    size * 0.62,
    size * 1.25,
    0xe8efff,
    0.9,
  );

  stem.setOrigin(0.5, 0.5);

  const cap = scene.add.ellipse(
    0,
    -size * 0.22,
    size * 2,
    size * 1.05,
    colour,
    0.95,
  );

  cap.setStrokeStyle(1, 0xffffff, 0.6);

  const spotLeft = scene.add.circle(
    -size * 0.38,
    -size * 0.35,
    size * 0.12,
    0xffffff,
    0.82,
  );

  const spotRight = scene.add.circle(
    size * 0.32,
    -size * 0.22,
    size * 0.1,
    0xffffff,
    0.76,
  );

  const groundShadow = scene.add.ellipse(
    0,
    size,
    size * 1.8,
    size * 0.48,
    0x061423,
    0.3,
  );

  const container = scene.add.container(position.x, position.y, [
    glow,
    groundShadow,
    stem,
    cap,
    spotLeft,
    spotRight,
  ]);

  container.setScale(position.scale).setAlpha(0.22);

  layer.add(container);

  return {
    container,
    glow,
    cap,
    phase: index * 0.78 + Phaser.Math.FloatBetween(0, Math.PI * 2),
  };
}

function animateMushroom(
  mushroom: Mushroom,
  time: number,
  mode: WorldTimeMode,
) {
  const pulse = 0.65 + Math.sin(time * 0.0028 + mushroom.phase) * 0.24;

  const nightStrength = mode === "night" ? 1 : 0.16;

  mushroom.glow.setAlpha(
    Phaser.Math.Clamp(pulse * 0.32 * nightStrength, 0.02, 0.38),
  );

  mushroom.cap.setAlpha(mode === "night" ? 0.88 + pulse * 0.1 : 0.48);
}
