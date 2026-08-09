import Phaser from "phaser";

import { createHotspot } from "./hotspots/create-hotspot";
import { WORLD_DESTINATIONS } from "./world-destinations";

import type {
  HotspotCallbacks,
  WorldChapterId,
} from "./world-types";

export function createWorldHotspots(
  scene: Phaser.Scene,
  callbacks: HotspotCallbacks,
) {
  const hotspots = new Map<
    WorldChapterId,
    Phaser.GameObjects.Container
  >();

  WORLD_DESTINATIONS.forEach((destination) => {
    const hotspot = createHotspot(
      scene,
      destination,
      callbacks,
    );

    hotspot.setDepth(20);

    hotspots.set(destination.id, hotspot);
  });

  return hotspots;
}