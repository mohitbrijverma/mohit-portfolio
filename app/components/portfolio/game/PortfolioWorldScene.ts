import Phaser from "phaser";

import { createWorldDayNight } from "./day-night/world-day-night";

import type { WorldTimeController } from "./day-night/day-night-types";

import { createWorldAtmosphere } from "./world-atmosphere";

import { createWorldCamera } from "./world-camera";

import type { WorldCameraController } from "./world-camera";

import { createWorldHotspots } from "./world-hotspots";

import { createWorldWildlife } from "./wildlife/world-wildlife";

import type {
  WorldChapterId,
  WorldDestination,
  WorldDimensions,
} from "./world-types";

export type { WorldChapterId } from "./world-types";

export default class PortfolioWorldScene extends Phaser.Scene {
  private selectedDestination: WorldChapterId | null = null;

  private world: WorldDimensions = {
    width: 1678,
    height: 941,
  };

  private cameraController: WorldCameraController | null = null;

  private dayNightController: WorldTimeController | null = null;

  private focusRequest = 0;

  constructor() {
    super({
      key: "PortfolioWorldScene",
    });
  }

  preload() {
    this.load.image("portfolio-world", "/journey/world-map.png");
  }

  create() {
    this.readWorldDimensions();

    this.createWorldImage();

    /*
     * Create the lighting before atmospheric wildlife.
     * The lighting layer stays behind fireflies, mushrooms,
     * butterflies, birds and hotspot labels.
     */
    this.dayNightController = createWorldDayNight(this, this.world);

    createWorldAtmosphere(this, this.world);

    createWorldWildlife(this, this.world);

    this.cameraController = createWorldCamera({
      scene: this,
      world: this.world,

      getSelectedDestination: () => this.selectedDestination,
    });

    createWorldHotspots(this, {
      getSelectedDestination: () => this.selectedDestination,

      onSelectDestination: (destination) => {
        this.selectDestination(destination);
      },
    });

    this.events.once("shutdown", this.handleShutdown, this);
  }

  public returnToWorld() {
    this.focusRequest += 1;

    this.selectedDestination = null;

    this.cameraController?.returnToWorld();

    this.game.events.emit("portfolio:close-chapter");
  }

  public toggleWorldTime() {
    this.dayNightController?.toggleMode();
  }

  private selectDestination(destination: WorldDestination) {
    if (this.selectedDestination === destination.id) {
      this.returnToWorld();
      return;
    }

    this.focusRequest += 1;

    const currentRequest = this.focusRequest;

    this.selectedDestination = destination.id;

    this.cameraController?.focusDestination(destination);

    this.time.delayedCall(650, () => {
      if (
        currentRequest !== this.focusRequest ||
        this.selectedDestination !== destination.id
      ) {
        return;
      }

      this.game.events.emit("portfolio:open-chapter", destination.id);
    });
  }

  private handleShutdown() {
    this.focusRequest += 1;

    this.cameraController?.destroy();
    this.dayNightController?.destroy();

    this.cameraController = null;
    this.dayNightController = null;

    this.events.off("shutdown", this.handleShutdown, this);
  }

  private readWorldDimensions() {
    const texture = this.textures.get("portfolio-world");

    const source = texture.getSourceImage() as HTMLImageElement;

    this.world = {
      width: source.width || 1678,

      height: source.height || 941,
    };
  }

  private createWorldImage() {
    /*
     * Atmospheric background copy for screens
     * wider than the main game world.
     */
    this.add
      .image(this.world.width / 2, this.world.height / 2, "portfolio-world")
      .setOrigin(0.5)
      .setDisplaySize(this.world.width * 1.75, this.world.height * 1.75)
      .setTint(0x78a9bf)
      .setAlpha(0.82)
      .setDepth(-20);

    /*
     * Dark separation layer between the enlarged
     * background and the interactive world.
     */
    this.add
      .rectangle(
        this.world.width / 2,
        this.world.height / 2,
        this.world.width * 2,
        this.world.height * 2,
        0x071827,
        0.2,
      )
      .setDepth(-10);

    /*
     * Main interactive world.
     */
    this.add
      .image(0, 0, "portfolio-world")
      .setOrigin(0)
      .setDisplaySize(this.world.width, this.world.height)
      .setDepth(0);
  }
}
