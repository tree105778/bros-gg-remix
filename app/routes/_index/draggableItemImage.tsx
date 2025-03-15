import { useDrag } from "react-dnd";
import type { Item, ItemData } from "~/types";

export default function DraggableItemImage({ item }: { item: ItemData }) {
  const { name, image } = item;
  const [, drag] = useDrag<Item>(() => ({
    type: "ITEM",
    item: {
      name,
      image,
    },
  }));
  return (
    <>
      <div
        ref={(node) => {
          if (node) drag(node);
        }}
      >
        <img
          className="object-contain"
          alt={name}
          src={image}
          width={40}
          height={40}
        />
      </div>
    </>
  );
}
