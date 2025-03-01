import championsData from "~/data/S13/champions.json";
import type { Champion, State } from "./types";

export async function getChampionsData() {
  try {
    return championsData;
  } catch (error) {
    console.error("Error ");
  }
}

const itemsAndTraits: State = {
  droppedItems: [],
  traits: {},
};

export async function getItemsAndTratis() {
  return itemsAndTraits;
}

export async function addItemsAndTraits(newChampion: Champion) {
  const { droppedItems, traits } = itemsAndTraits;
  if (!droppedItems.includes(newChampion.name)) {
    newChampion.traits.forEach((trait) => {
      traits[trait] = (traits[trait] || 0) + 1;
    });
  }
  droppedItems.push(newChampion.name);
  return itemsAndTraits;
}

export async function removeItemsAndTraits(newChampion: Champion) {
  const { droppedItems, traits } = itemsAndTraits;
  const firstIdx = droppedItems.findIndex((item) => newChampion.name === item);
  if (firstIdx !== -1) {
    droppedItems.splice(firstIdx, 1);
  }
  if (!droppedItems.includes(newChampion.name)) {
    newChampion.traits.forEach((trait) => {
      if (traits[trait] > 1) {
        traits[trait] -= 1;
      } else delete traits[trait];
    });
  }
  return itemsAndTraits;
}

export async function removeAllItemsAndTraits() {
  const itemsAndTraits = {
    droppedItems: [],
    traits: {},
  };
  return itemsAndTraits;
}
