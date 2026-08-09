export type WorldChapterId =
  | "starting-point"
  | "physics-observatory"
  | "ai-health-lab"
  | "teaching-academy"
  | "product-workshop"
  | "next-territory";

export type WorldDestination = {
  id: WorldChapterId;
  title: string;

  x: number;
  y: number;

  width: number;
  height: number;

  accent: number;
  cameraZoom: number;
};

export type WorldDimensions = {
  width: number;
  height: number;
};

export type WorldCameraState = {
  selectedDestination:
    | WorldChapterId
    | null;

  isDragging: boolean;

  dragStartX: number;
  dragStartY: number;

  cameraStartX: number;
  cameraStartY: number;
};

export type HotspotCallbacks = {
  getSelectedDestination: () =>
    | WorldChapterId
    | null;

  onSelectDestination: (
    destination: WorldDestination,
  ) => void;
};

export type CameraControllerOptions = {
  scene: Phaser.Scene;

  world: WorldDimensions;

  getSelectedDestination: () =>
    | WorldChapterId
    | null;
};