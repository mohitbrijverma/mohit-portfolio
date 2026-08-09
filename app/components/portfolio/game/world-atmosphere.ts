import Phaser from "phaser";

import type { WorldDimensions } from "./world-types";

import { createWorldFireflies } from "./day-night/world-fireflies";

import { createWorldGlowingMushrooms } from "./day-night/world-glowing-mushrooms";

const WILDLIFE_PAUSE_EVENT = "portfolio:wildlife-pause";

export function isMobileViewport(scene: Phaser.Scene): boolean {
  return scene.scale.width < 768;
}

export function createWorldAtmosphere(
  scene: Phaser.Scene,
  world: WorldDimensions,
): Phaser.GameObjects.Container {
  const cloudLayer = scene.add.container(0, 0);

  cloudLayer.setDepth(10);

  createClouds(scene, cloudLayer, world);

  createFloatingParticles(scene, cloudLayer, world);

  const fireflies = createWorldFireflies(scene, world);

  const mushrooms = createWorldGlowingMushrooms(scene, world);

  let destroyed = false;

  function handlePause(paused: boolean) {
    fireflies.setPaused(Boolean(paused));

    mushrooms.setPaused(Boolean(paused));
  }

  function destroyAtmosphere() {
    if (destroyed) {
      return;
    }

    destroyed = true;

    scene.game.events.off(WILDLIFE_PAUSE_EVENT, handlePause);

    scene.events.off("shutdown", destroyAtmosphere);

    fireflies.destroy();
    mushrooms.destroy();

    scene.tweens.killTweensOf(cloudLayer.getAll());
  }

  scene.game.events.on(WILDLIFE_PAUSE_EVENT, handlePause);

  scene.events.once("shutdown", destroyAtmosphere);

  return cloudLayer;
}

function createClouds(
  scene: Phaser.Scene,
  cloudLayer: Phaser.GameObjects.Container,
  world: WorldDimensions,
) {
  const cloudPositions = [
    {
      x: world.width * 0.2,
      y: world.height * 0.12,
      scale: 1,
      movement: 28,
      duration: 7000,
    },
    {
      x: world.width * 0.5,
      y: world.height * 0.08,
      scale: 1.25,
      movement: 38,
      duration: 9000,
    },
    {
      x: world.width * 0.78,
      y: world.height * 0.15,
      scale: 0.9,
      movement: 24,
      duration: 7600,
    },
  ];

  cloudPositions.forEach((cloudPosition) => {
    const cloud = createCloudShape(scene);

    cloud
      .setPosition(cloudPosition.x, cloudPosition.y)
      .setScale(cloudPosition.scale)
      .setAlpha(0.1);

    cloudLayer.add(cloud);

    scene.tweens.add({
      targets: cloud,

      x: cloudPosition.x + cloudPosition.movement,

      duration: cloudPosition.duration,

      ease: Phaser.Math.Easing.Sine.InOut,

      yoyo: true,
      repeat: -1,
    });
  });
}

function createCloudShape(scene: Phaser.Scene): Phaser.GameObjects.Container {
  const cloud = scene.add.container(0, 0);

  const cloudColour = 0xffffff;

  const leftCircle = scene.add.circle(-34, 4, 30, cloudColour, 1);

  const middleCircle = scene.add.circle(0, -8, 42, cloudColour, 1);

  const rightCircle = scene.add.circle(38, 5, 28, cloudColour, 1);

  const cloudBase = scene.add.ellipse(2, 18, 122, 42, cloudColour, 1);

  cloud.add([leftCircle, middleCircle, rightCircle, cloudBase]);

  return cloud;
}

function createFloatingParticles(
  scene: Phaser.Scene,
  cloudLayer: Phaser.GameObjects.Container,
  world: WorldDimensions,
) {
  const particleCount = isMobileViewport(scene) ? 14 : 26;

  for (let index = 0; index < particleCount; index += 1) {
    const particle = scene.add.circle(
      Phaser.Math.Between(20, world.width - 20),

      Phaser.Math.Between(80, world.height - 30),

      Phaser.Math.Between(2, 4),

      0xffffff,

      Phaser.Math.FloatBetween(0.14, 0.34),
    );

    cloudLayer.add(particle);

    const originalY = particle.y;

    scene.tweens.add({
      targets: particle,

      y: originalY - Phaser.Math.Between(12, 30),

      alpha: {
        from: particle.alpha,
        to: 0.06,
      },

      duration: Phaser.Math.Between(1800, 3400),

      delay: Phaser.Math.Between(0, 1600),

      ease: Phaser.Math.Easing.Sine.InOut,

      yoyo: true,
      repeat: -1,
    });
  }
}
