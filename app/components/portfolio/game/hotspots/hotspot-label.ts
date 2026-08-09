import Phaser from "phaser";

import type { WorldDestination } from "../world-types";

export type HotspotLabel = {
  text: Phaser.GameObjects.Text;
  background: Phaser.GameObjects.Graphics;
  baseY: number;
};

const LABEL_HEIGHT = 44;
const LABEL_MINIMUM_WIDTH = 180;
const LABEL_HORIZONTAL_PADDING = 36;

function getLabelY(destination: WorldDestination): number {
  /*
   * Next Territory is positioned near the top of the map.
   * Its label must appear below the bridge so that it does
   * not overlap the fixed navigation bar.
   */
  if (destination.id === "next-territory") {
    return destination.height * 0.5 + 34;
  }

  return -destination.height * 0.5 - 30;
}

function getLabelWidth(destination: WorldDestination): number {
  const estimatedTextWidth = destination.title.length * 9.5;

  return Math.max(
    LABEL_MINIMUM_WIDTH,
    estimatedTextWidth + LABEL_HORIZONTAL_PADDING,
  );
}

export function createHotspotLabel(
  scene: Phaser.Scene,
  destination: WorldDestination,
): HotspotLabel {
  const baseY = getLabelY(destination);
  const width = getLabelWidth(destination);

  const background = createLabelBackground(scene, destination, width, baseY);

  const text = createLabelText(scene, destination, baseY);

  background.setVisible(false);
  text.setVisible(false);

  return {
    text,
    background,
    baseY,
  };
}

function createLabelBackground(
  scene: Phaser.Scene,
  destination: WorldDestination,
  width: number,
  y: number,
): Phaser.GameObjects.Graphics {
  const background = scene.add.graphics();

  background.fillStyle(0x07111f, 0.92);

  background.lineStyle(1.5, destination.accent, 0.8);

  background.fillRoundedRect(
    -width / 2,
    -LABEL_HEIGHT / 2,
    width,
    LABEL_HEIGHT,
    18,
  );

  background.strokeRoundedRect(
    -width / 2,
    -LABEL_HEIGHT / 2,
    width,
    LABEL_HEIGHT,
    18,
  );

  background.setPosition(0, y);

  return background;
}

function createLabelText(
  scene: Phaser.Scene,
  destination: WorldDestination,
  y: number,
): Phaser.GameObjects.Text {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  return scene.add
    .text(0, y, destination.title, {
      color: "#ffffff",
      fontFamily: "Inter, Arial, sans-serif",
      fontSize: "16px",
      fontStyle: "bold",
      resolution: pixelRatio * 2,
      padding: {
        left: 8,
        right: 8,
        top: 5,
        bottom: 5,
      },
    })
    .setOrigin(0.5)
    .setShadow(0, 2, "#000000", 4, false, true);
}
