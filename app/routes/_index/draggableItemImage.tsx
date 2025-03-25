import { useDrag } from "react-dnd";
import type { Item } from "~/types";

export default function DraggableItemImage({ item }: { item: Item }) {
  const { id, name, image, type } = item;
  const [, drag] = useDrag<Item>(() => ({
    type: "ITEM",
    item: {
      id,
      name,
      image,
      type,
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
