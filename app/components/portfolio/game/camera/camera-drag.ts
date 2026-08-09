import Phaser from "phaser";

import { clampCameraPosition } from "./camera-layout";

import type { WorldChapterId, WorldDimensions } from "../world-types";

type CameraDragOptions = {
  scene: Phaser.Scene;
  world: WorldDimensions;

  getSelectedDestination: () => WorldChapterId | null;
};

export type CameraDragController = {
  destroy: () => void;
};

const DRAG_FRICTION = 0.9;
const MINIMUM_VELOCITY = 0.08;

export function createCameraDrag({
  scene,
  world,
  getSelectedDestination,
}: CameraDragOptions): CameraDragController {
  const camera = scene.cameras.main;

  let isDragging = false;

  let previousX = 0;
  let previousY = 0;

  let velocityX = 0;
  let velocityY = 0;

  function handlePointerDown(pointer: Phaser.Input.Pointer) {
    if (getSelectedDestination()) {
      return;
    }

    isDragging = true;

    previousX = pointer.x;
    previousY = pointer.y;

    velocityX = 0;
    velocityY = 0;
  }

  function handlePointerMove(pointer: Phaser.Input.Pointer) {
    if (!isDragging || !pointer.isDown) {
      return;
    }

    if (getSelectedDestination()) {
      stopDragging();
      return;
    }

    const movementX = pointer.x - previousX;

    const movementY = pointer.y - previousY;

    previousX = pointer.x;
    previousY = pointer.y;

    velocityX = -movementX / camera.zoom;

    velocityY = -movementY / camera.zoom;

    moveCamera(velocityX, velocityY);
  }

  function handlePointerUp() {
    isDragging = false;
  }

  function handleUpdate(_time: number, delta: number) {
    if (isDragging || getSelectedDestination()) {
      return;
    }

    if (
      Math.abs(velocityX) < MINIMUM_VELOCITY &&
      Math.abs(velocityY) < MINIMUM_VELOCITY
    ) {
      velocityX = 0;
      velocityY = 0;
      return;
    }

    const frameMultiplier = delta / 16.67;

    moveCamera(velocityX * frameMultiplier, velocityY * frameMultiplier);

    velocityX *= DRAG_FRICTION;
    velocityY *= DRAG_FRICTION;
  }

  function moveCamera(movementX: number, movementY: number) {
    const nextPosition = clampCameraPosition(
      camera,
      world,
      camera.midPoint.x + movementX,
      camera.midPoint.y + movementY,
    );

    camera.centerOn(nextPosition.x, nextPosition.y);
  }

  function stopDragging() {
    isDragging = false;
    velocityX = 0;
    velocityY = 0;
  }

  scene.input.on("pointerdown", handlePointerDown);

  scene.input.on("pointermove", handlePointerMove);

  scene.input.on("pointerup", handlePointerUp);

  scene.input.on("pointerupoutside", handlePointerUp);

  scene.events.on("update", handleUpdate);

  return {
    destroy() {
      stopDragging();

      scene.input.off("pointerdown", handlePointerDown);

      scene.input.off("pointermove", handlePointerMove);

      scene.input.off("pointerup", handlePointerUp);

      scene.input.off("pointerupoutside", handlePointerUp);

      scene.events.off("update", handleUpdate);
    },
  };
}
