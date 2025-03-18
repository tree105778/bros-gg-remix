import { useDrag } from "react-dnd";
import { useChampionAndIndexStore } from "~/store";
import type { Item } from "~/types";

export default function DraggableContainerItem({
  idx,
  X,
  Y,
  item,
}: {
  idx: number;
  X: number;
  Y: number;
  item: Item;
}) {
  const { championAndIndex, setChampionIndex } = useChampionAndIndexStore();
  const champion = championAndIndex[`${X},${Y}`];
  const { name, image } = item;
  const [, drag] = useDrag<Item>({
    type: "ITEM",
    item: {
      name,
      image,
    },
    end: (item, monitor) => {
      if (champion.item) {
        const newItems = [...champion.item];
        newItems.splice(idx, 1);
        setChampionIndex(X, Y, { ...champion, item: newItems });
      }
    },
  });
  return (
    <div
      ref={(node) => {
        if (node) drag(node);
      }}
    >
      <div className="relative">
        <img
          className="object-contain"
          alt={name}
          src={image}
          width={20}
          height={20}
        />
      </div>
    </div>
  );
}
