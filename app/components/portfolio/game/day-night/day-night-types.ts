export type WorldTimeMode =
  | "day"
  | "night";

export type WorldTimeController = {
  getMode: () => WorldTimeMode;

  setMode: (
    mode: WorldTimeMode,
  ) => void;

  toggleMode: () => void;
  destroy: () => void;
};

export type WorldTimeEventPayload = {
  mode: WorldTimeMode;
};