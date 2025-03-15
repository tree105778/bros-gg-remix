export type Champion = {
  id: number;
  name: string;
  cost: number;
  traits: string[];
  image: string;
  star?: number;
  item?: Item[];
};

export type ActivationType = {
  unit_count: number;
  effect: string;
  image: string;
};

export type SynergyTraits = {
  name: string;
  description: string;
  default_image: string;
  activation: ActivationType[];
};

export interface SynergyData {
  set: string;
  traits: SynergyTraits[];
}

export interface Item {
  name: string;
  image: string;
}

export interface ItemData extends Item {
  effects: string;
  composite_items?: string[];
  combinable_items?: string[];
}

export type Traits = { trait: string; count: number };

export type TraitsState = {
  droppedItems: string[];
  traits: Traits[];
};

export type TraitsStateStore = {
  droppedItems: TraitsState["droppedItems"];
  traits: TraitsState["traits"];
  addTraitsState: (champion: Champion) => void;
  removeTraitsState: (champion: Champion) => void;
  removeAllTraitsState: () => void;
};

export interface ChampionIndexInfo {
  championAndIndex: Record<string, Champion>;
  setChampionIndex: (x: number, y: number, champion: Champion) => void;
  removeChampionIndex: (x: number, y: number, champion?: Champion) => void;
  resetAllChampionIndex: () => void;
}

export type DataState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
