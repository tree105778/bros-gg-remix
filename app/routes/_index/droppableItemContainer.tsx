import type { Champion } from "~/types";
import DraggableContainerItem from "./draggableContainerItem";

export default function DroppableItemContainer({
  champion,
}: {
  champion: Champion | undefined;
}) {
  if (champion == undefined || champion.item == undefined) return null;
  return (
    <div className="absolute left-0 right-0 bottom-0">
      <div className="flex justify-center">
        {champion.item.map((item, idx) => (
          <DraggableContainerItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
