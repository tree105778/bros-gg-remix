import { useDrag } from 'react-dnd';
import type { FetchItems } from '~/types';
import { useState } from 'react';

export default function DraggableItemImage({ item }: { item: FetchItems }) {
  const { id, name, image, type, effects } = item;
  const [hoverState, setHoverState] = useState(false);
  const [{ isDragging }, drag] = useDrag<
    FetchItems,
    unknown,
    { isDragging: boolean }
  >(() => ({
    type: 'ITEM',
    item: {
      id,
      name,
      image,
      type,
      effects,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      setHoverState(false);
    },
  }));
  return (
    <>
      <div
        onMouseEnter={() => {
          setHoverState(true);
        }}
        onMouseOut={() => {
          setHoverState(false);
        }}
        className="relative"
      >
        <img
          ref={(node) => {
            if (node) drag(node);
          }}
          className="object-contain"
          loading="lazy"
          alt={name}
          src={image}
          width={40}
          height={40}
        />
        {hoverState && !isDragging && (
          <div className="absolute top-0 left-1/2 translate-y-[-100%] translate-x-[-50%] bg-black  max-w-[200px] w-max p-2">
            <h1 className="text-yellow-500 text-[20px]">{item.name}</h1>
            <p className="text-white text-[12px]">{item.effects}</p>
          </div>
        )}
      </div>
    </>
  );
}
