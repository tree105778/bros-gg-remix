import type { Champion } from "~/types";

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
          <div key={idx}>
            <div className="relative">
              <img
                className="object-contain"
                alt={item.name}
                src={item.image}
                width={20}
                height={20}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
