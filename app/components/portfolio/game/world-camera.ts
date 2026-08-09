import Phaser from "phaser";

import {
  getDestinationZoom,
  getInitialCameraPosition,
  getWorldOverviewZoom,
} from "./camera/camera-layout";

import {
  createCameraDrag,
  type CameraDragController,
} from "./camera/camera-drag";

import type {
  CameraControllerOptions,
  WorldDestination,
} from "./world-types";

export type WorldCameraController = {
  focusDestination: (
    destination: WorldDestination,
  ) => void;

  returnToWorld: () => void;
  resize: () => void;
  destroy: () => void;
};

export function createWorldCamera({
  scene,
  world,
  getSelectedDestination,
}: CameraControllerOptions): WorldCameraController {
  const camera =
    scene.cameras.main;

  let activeDestination:
    | WorldDestination
    | null = null;

  let dragController:
    | CameraDragController
    | null = null;

  function positionAtWorldOverview(
    animate: boolean,
  ) {
    const zoom =
      getWorldOverviewZoom(
        scene,
        world,
      );

    const position =
      getInitialCameraPosition(
        scene,
        world,
      );

    if (animate) {
      camera.pan(
        position.x,
        position.y,
        650,
        Phaser.Math.Easing.Sine
          .InOut,
      );

      camera.zoomTo(
        zoom,
        650,
        Phaser.Math.Easing.Sine
          .InOut,
      );

      return;
    }

    camera.setZoom(zoom);

    camera.centerOn(
      position.x,
      position.y,
    );
  }

  function positionAtDestination(
    destination:
      WorldDestination,

    animate: boolean,
  ) {
    const overviewZoom =
      getWorldOverviewZoom(
        scene,
        world,
      );

    const destinationZoom =
      getDestinationZoom(
        scene,
        destination,
        overviewZoom,
      );

    if (animate) {
      camera.pan(
        destination.x,
        destination.y,
        650,
        Phaser.Math.Easing.Sine
          .InOut,
      );

      camera.zoomTo(
        destinationZoom,
        650,
        Phaser.Math.Easing.Sine
          .InOut,
      );

      return;
    }

    camera.setZoom(
      destinationZoom,
    );

    camera.centerOn(
      destination.x,
      destination.y,
    );
  }

  function focusDestination(
    destination:
      WorldDestination,
  ) {
    activeDestination =
      destination;

;

    positionAtDestination(
      destination,
      true,
    );
  }

  function returnToWorld() {
    activeDestination = null;

    positionAtWorldOverview(true);
  }

  function resize() {
    camera.setViewport(
      0,
      0,
      scene.scale.width,
      scene.scale.height,
    );

    if (activeDestination) {
      positionAtDestination(
        activeDestination,
        false,
      );

      return;
    }

    positionAtWorldOverview(false);
  }

  function destroy() {
    dragController?.destroy();

    dragController = null;

    scene.scale.off(
      "resize",
      resize,
    );
  }

  resize();

  dragController =
    createCameraDrag({
      scene,
      world,
      getSelectedDestination,
    });

  scene.scale.on(
    "resize",
    resize,
  );

  return {
    focusDestination,
    returnToWorld,
    resize,
    destroy,
  };
}