import type { WorldChapterId } from "./world-types";

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

/*
 * Calibrated for the 1672 × 941 world map.
 */
export const WORLD_DESTINATIONS: WorldDestination[] = [
  {
    id: "starting-point",
    title: "Starting Point",

    x: 310,
    y: 690,

    width: 270,
    height: 230,

    accent: 0x4fd096,
    cameraZoom: 1.14,
  },

  {
    id: "physics-observatory",
    title: "Physics Observatory",

    x: 525,
    y: 375,

    /*
     * Enlarged around the observatory
     * entrance and lower building.
     */
    width: 235,
    height: 185,

    accent: 0x2ec7ef,
    cameraZoom: 1.14,
  },

  {
    id: "ai-health-lab",
    title: "AI Health Lab",

    x: 805,
    y: 555,

    /*
     * Enlarged around the AI Lab
     * entrance and front wall.
     */
    width: 260,
    height: 205,

    accent: 0xb25cff,
    cameraZoom: 1.14,
  },

  {
    id: "teaching-academy",
    title: "Teaching Academy",

    x: 1002,
    y: 288,

    /*
     * Enlarged around the Academy
     * entrance and front stairs.
     */
    width: 275,
    height: 195,

    accent: 0xf7b344,
    cameraZoom: 1.12,
  },

  {
    id: "product-workshop",
    title: "Product Workshop",

    x: 1288,
    y: 457,

    /*
     * Enlarged around the open workshop,
     * entrance and front steps.
     */
    width: 265,
    height: 200,

    accent: 0x347dff,
    cameraZoom: 1.1,
  },

  {
    id: "next-territory",
    title: "Next Territory",

    x: 1452,
    y: 176,

    /*
     * Intentionally kept small to avoid
     * colliding with the navigation bar.
     */
    width: 120,
    height: 82,

    accent: 0x7d66ff,
    cameraZoom: 1.06,
  },
];

export function getWorldDestination(
  chapterId: WorldChapterId,
): WorldDestination | undefined {
  return WORLD_DESTINATIONS.find((destination) => destination.id === chapterId);
}
