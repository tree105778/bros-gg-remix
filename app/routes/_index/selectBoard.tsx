import clsx from "clsx";
import { useEffect, useState } from "react";
import ChampionSelectBoard from "./championSelectBoard";
import ItemSelectBoard from "./itemSelectBoard";
import type { Champion, ItemData } from "~/types";
import { fetchData } from "~/lib";

type DataState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export default function SelectBoard() {
  const [champOrItemState, setChampOrItemState] = useState("champion");

  const [champions, setChampions] = useState<DataState<Champion[]>>({
    data: null,
    loading: true,
    error: null,
  });

  const [items, setItems] = useState<DataState<ItemData[]>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchData<Champion[]>("/data/S13/champions.json", setChampions);
    fetchData<ItemData[]>("/data/items/item.json", setItems);
  }, []);

  const switchToggle: (index: string) => void = (index) => {
    setChampOrItemState(index);
  };

  const setClsxButton: (state: string) => string = (state) =>
    clsx(
      "h-[36px] text-xs px-[12px]",
      champOrItemState === state
        ? "text-white bg-[#ca9372] font-[600] border-[1px]"
        : "text-[#ca9372] border-[#ca9372]"
    );
  return (
    <div>
      <nav className="flex gap-1 bg-black">
        <button
          onClick={() => switchToggle("champion")}
          className={setClsxButton("champion")}
        >
          챔피언
        </button>
        <button
          onClick={() => switchToggle("item")}
          className={setClsxButton("item")}
        >
          아이템
        </button>
      </nav>

      {champOrItemState === "champion" ? (
        <ChampionSelectBoard data={champions} />
      ) : (
        <ItemSelectBoard data={items} />
      )}
    </div>
  );
}
