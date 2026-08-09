import Phaser from "phaser";

import type {
  HotspotLabel,
} from "./hotspot-label";

export type HotspotVisuals = {
  container:
    Phaser.GameObjects.Container;

  halo:
    Phaser.GameObjects.Ellipse;

  label:
    HotspotLabel;
};

export function startHotspotPulse(
  scene: Phaser.Scene,
  halo: Phaser.GameObjects.Ellipse,
) {
  return scene.tweens.add({
    targets: halo,

    alpha: {
      from: 0.12,
      to: 0.32,
    },

    scaleX: {
      from: 0.9,
      to: 1.08,
    },

    scaleY: {
      from: 0.9,
      to: 1.08,
    },

    duration: 1300,

    ease:
      Phaser.Math.Easing.Sine.InOut,

    yoyo: true,
    repeat: -1,
  });
}

export function showHotspotLabel(
  scene: Phaser.Scene,
  visuals: HotspotVisuals,
) {
  const {
    container,
    halo,
    label,
  } = visuals;

  scene.tweens.killTweensOf([
    container,
    halo,
    label.text,
    label.background,
  ]);

  label.text
    .setVisible(true)
    .setAlpha(0)
    .setY(
      label.baseY + 10,
    );

  label.background
    .setVisible(true)
    .setAlpha(0)
    .setY(
      label.baseY + 10,
    );

  scene.tweens.add({
    targets: container,

    scaleX: 1.04,
    scaleY: 1.04,

    duration: 180,

    ease:
      Phaser.Math.Easing.Quadratic.Out,
  });

  scene.tweens.add({
    targets: halo,

    alpha: 0.42,
    scaleX: 1.14,
    scaleY: 1.14,

    duration: 220,

    ease:
      Phaser.Math.Easing.Quadratic.Out,
  });

  scene.tweens.add({
    targets: [
      label.text,
      label.background,
    ],

    alpha: 1,
    y: label.baseY,

    duration: 200,

    ease:
      Phaser.Math.Easing.Back.Out,
  });
}

export function hideHotspotLabel(
  scene: Phaser.Scene,
  visuals: HotspotVisuals,
) {
  const {
    container,
    halo,
    label,
  } = visuals;

  scene.tweens.killTweensOf([
    container,
    halo,
    label.text,
    label.background,
  ]);

  scene.tweens.add({
    targets: container,

    scaleX: 1,
    scaleY: 1,

    duration: 180,

    ease:
      Phaser.Math.Easing.Quadratic.Out,
  });

  scene.tweens.add({
    targets: halo,

    alpha: 0.16,
    scaleX: 1,
    scaleY: 1,

    duration: 180,

    ease:
      Phaser.Math.Easing.Quadratic.Out,
  });

  scene.tweens.add({
    targets: [
      label.text,
      label.background,
    ],

    alpha: 0,
    y: label.baseY + 8,

    duration: 140,

    ease:
      Phaser.Math.Easing.Quadratic.In,

    onComplete: () => {
      label.text.setVisible(false);

      label.background.setVisible(
        false,
      );
    },
  });
}