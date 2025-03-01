import { create } from "zustand";
import type { ChampionIndexInfo, TraitsState, TraitsStateStore } from "./types";
import { immer } from "zustand/middleware/immer";

export const useChampionAndIndexStore = create<ChampionIndexInfo>()(
  immer((set) => ({
    championAndIndex: {},
    setChampionIndex: (x, y, champion) =>
      set((state) => {
        state.championAndIndex[`${x},${y}`] = champion;
      }),
    removeChampionIndex: (x, y) =>
      set((state) => {
        const key = `${x},${y}`;
        if (!(key in state.championAndIndex)) return;
        delete state.championAndIndex[key];
      }),
    resetAllChampionIndex: () =>
      set({
        championAndIndex: {},
      }),
  }))
);

const initialTraitsState: TraitsState = {
  droppedItems: [],
  traits: {},
};

export const useTraitsStateStore = create<TraitsStateStore>((set) => ({
  ...initialTraitsState,
  addTraitsState: (champion) =>
    set((state) => {
      const newTraits = { ...state.traits };
      if (!state.droppedItems.includes(champion.name)) {
        champion.traits.forEach((trait) => {
          newTraits[trait] = (newTraits[trait] || 0) + 1;
        });
      }
      return {
        ...state,
        droppedItems: [...state.droppedItems, champion.name],
        traits: newTraits,
      };
    }),
  removeTraitsState: (champion) =>
    set((state) => {
      const { droppedItems, traits } = state;
      const newDroppedItems = [...droppedItems];
      const newTriats = { ...traits };
      const firstIndex = newDroppedItems.findIndex(
        (item) => item === champion.name
      );
      if (firstIndex !== -1) {
        newDroppedItems.splice(firstIndex, 1);
      }
      if (!newDroppedItems.includes(champion.name)) {
        champion.traits.forEach((trait) => {
          if (newTriats[trait] > 1) {
            newTriats[trait] -= 1;
          } else delete newTriats[trait];
        });
      }
      return {
        ...state,
        droppedItems: newDroppedItems,
        traits: newTriats,
      };
    }),
  removeAllTraitsState: () =>
    set({
      ...initialTraitsState,
    }),
}));
