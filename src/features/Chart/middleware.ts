import type { StateCreator, StoreApi } from "zustand";

export const broadcastSync =
  (name: string) =>
  <T extends object>(
    config: StateCreator<T, [], []>,
  ): StateCreator<T, [], []> =>
  (set, get, api) => {
    if (typeof window === "undefined") return config(set, get, api);

    const channel = new BroadcastChannel(name);

    channel.onmessage = (event: MessageEvent<T>) => {
      api.setState(event.data);
    };

    const newSet: StoreApi<T>["setState"] = (partial, replace) => {
      if (replace) {
        set(partial as T | ((state: T) => T), true);
      } else {
        set(partial as T | Partial<T> | ((state: T) => T | Partial<T>), false);
      }

      const stateToBroadcast = Object.entries(get()).reduce(
        (acc, [key, value]) => {
          if (typeof value === "function") return acc;

          acc[key as keyof T] = value;

          return acc;
        },
        {} as T,
      );

      channel.postMessage(stateToBroadcast);
    };

    return config(newSet, get, api);
  };
