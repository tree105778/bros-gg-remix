export type Champion = {
  id: number;
  name: string;
  cost: number;
  traits: string[];
  image: string;
  star?: number;
  item?: string[];
};

export type TraitsState = {
  droppedItems: string[];
  traits: { [key: string]: number };
};

export type TraitsStateStore = {
  droppedItems: string[];
  traits: { [key: string]: number };
  addTraitsState: (champion: Champion) => void;
  removeTraitsState: (champion: Champion) => void;
  removeAllTraitsState: () => void;
};

export type State = {
  droppedItems: string[];
  traits: { [key: string]: number };
};

export interface ChampionIndexInfo {
  championAndIndex: Record<string, Champion>;
  setChampionIndex: (x: number, y: number, champion: Champion) => void;
  removeChampionIndex: (x: number, y: number, champion?: Champion) => void;
  resetAllChampionIndex: () => void;
}
