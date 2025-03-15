import { useEffect, useState } from "react";
import type { DataState, ItemData } from "~/types";
import DraggableItemImage from "./draggableItemImage";

const ItemSelectBoard = function ({ data }: { data: DataState<ItemData[]> }) {
  const [items, setItems] = useState<ItemData[]>([]);

  useEffect(() => {
    if (data.data) {
      setItems(data.data);
    }
  }, [data.data]);

  if (data.loading || !data.data) return <ItemSkeleton />;
  return (
    <>
      <div className="flex gap-2 flex-wrap m-3">
        {items.map((item, idx) => (
          <DraggableItemImage key={idx} item={item} />
        ))}
      </div>
    </>
  );
};

const ItemSkeleton = () => (
  <div className="flex gap-2 flex-wrap m-3 animate-pulse">
    {Array(50)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="w-12 h-12 bg-gray-700 rounded"></div>
      ))}
  </div>
);

export default ItemSelectBoard;
