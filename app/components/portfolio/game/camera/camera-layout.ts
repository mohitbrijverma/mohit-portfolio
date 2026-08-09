import Phaser from "phaser";

import type {
  WorldDestination,
  WorldDimensions,
} from "../world-types";

const COMPACT_DEVICE_WIDTH = 900;
const PORTRAIT_ASPECT_RATIO = 1.15;

export function isMobileCamera(
  scene: Phaser.Scene,
) {
  return (
    scene.scale.width <
    COMPACT_DEVICE_WIDTH
  );
}

export function getWorldOverviewZoom(
  scene: Phaser.Scene,
  world: WorldDimensions,
) {
  const viewportWidth =
    scene.scale.width;

  const viewportHeight =
    scene.scale.height;

  const widthScale =
    viewportWidth / world.width;

  const heightScale =
    viewportHeight / world.height;

  const viewportAspect =
    viewportWidth / viewportHeight;

  const isCompact =
    viewportWidth <
    COMPACT_DEVICE_WIDTH;

  const isPortrait =
    viewportAspect <
    PORTRAIT_ASPECT_RATIO;

  /*
   * Portrait phones cannot display a detailed landscape
   * map completely without making everything extremely
   * small. Fit its height and allow horizontal dragging.
   */
  if (isCompact && isPortrait) {
    return Math.max(
      heightScale,
      0.56,
    );
  }

  /*
   * Desktop, laptop, tablet landscape and mobile
   * landscape display the complete world image.
   */
  return Math.min(
    widthScale,
    heightScale,
  );
}

export function getDestinationZoom(
  scene: Phaser.Scene,
  destination: WorldDestination,
  overviewZoom: number,
) {
  const mobileMultiplier =
    isMobileCamera(scene)
      ? 1.08
      : 1;

  return Math.max(
    overviewZoom,
    destination.cameraZoom *
      mobileMultiplier,
  );
}

export function getInitialCameraPosition(
  _scene: Phaser.Scene,
  world: WorldDimensions,
) {
  return {
    x: world.width / 2,
    y: world.height / 2,
  };
}

export function clampCameraPosition(
  camera: Phaser.Cameras.Scene2D.Camera,
  world: WorldDimensions,
  x: number,
  y: number,
) {
  const visibleWidth =
    camera.width / camera.zoom;

  const visibleHeight =
    camera.height / camera.zoom;

  const halfWidth =
    visibleWidth / 2;

  const halfHeight =
    visibleHeight / 2;

  const minimumX =
    visibleWidth >= world.width
      ? world.width / 2
      : halfWidth;

  const maximumX =
    visibleWidth >= world.width
      ? world.width / 2
      : world.width - halfWidth;

  const minimumY =
    visibleHeight >= world.height
      ? world.height / 2
      : halfHeight;

  const maximumY =
    visibleHeight >= world.height
      ? world.height / 2
      : world.height - halfHeight;

  return {
    x: Phaser.Math.Clamp(
      x,
      minimumX,
      maximumX,
    ),

    y: Phaser.Math.Clamp(
      y,
      minimumY,
      maximumY,
    ),
  };
}