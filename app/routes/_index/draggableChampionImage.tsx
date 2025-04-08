import { useDrag } from 'react-dnd';
import type { Champion, FetchChampions } from '~/types';
import { useState } from 'react';

export default function DraggableChampionImage({
  champion,
}: {
  champion: FetchChampions;
}) {
  const { id, name, cost, traits, image } = champion;
  const [hoverState, setHoverState] = useState(false);
  const [{ isDragging }, drag] = useDrag<
    Champion,
    unknown,
    { isDragging: boolean }
  >(() => ({
    type: 'CHAMPION',
    item: {
      id,
      name,
      cost,
      traits,
      image,
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
            if (node) {
              drag(node);
            }
          }}
          loading="lazy"
          src={champion.image}
          alt={champion.name}
          width={70}
          height={70}
        />
        {hoverState && !isDragging && (
          <div className="absolute top-0 left-1/2 translate-y-[-100%] translate-x-[-50%] bg-black text-white w-max">
            <div className="flex justify-center items-center">
              <h1 className="text-[20px] font-bold shrink-0 basis-auto">
                {champion.name}
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c8d331"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-coins-icon lucide-coins shrink-0 basis-auto"
              >
                <circle cx="8" cy="8" r="6" />
                <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                <path d="M7 6h1v4" />
                <path d="m16.71 13.88.7.71-2.82 2.82" />
              </svg>
              <p className="shrink-0 basis-auto">{cost}</p>
            </div>
            <div></div>
          </div>
        )}
      </div>
    </>
  );
}
