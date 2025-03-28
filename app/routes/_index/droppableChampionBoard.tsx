import { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useChampionAndIndexStore, useTraitsStateStore } from '~/store';
import type { Champion, Item } from '~/types';
import DraggableContainerItem from './draggableContainerItem';
import { isItemDroppable, itemCombineProcess } from '~/lib/item';
import { useLoaderData } from '@remix-run/react';
import type { loader } from './route';

export default function DroppableChampionBoard({
  X,
  Y,
}: {
  X: number;
  Y: number;
}) {
  const [champion, setChampion] = useState<Champion>();
  const { itemRecipes, items } = useLoaderData<typeof loader>();
  const { championAndIndex, setChampionIndex, removeChampionIndex } =
    useChampionAndIndexStore();
  const { addTraitsState, removeTraitsState } = useTraitsStateStore();

  useEffect(() => {
    if (championAndIndex[`${X},${Y}`])
      setChampion(championAndIndex[`${X},${Y}`]);
    else setChampion(undefined);
  }, [championAndIndex, X, Y]);

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: 'CHAMPION',
      canDrop: () => !champion,
      drop: (item: Champion) => {
        if (!item.star) item.star = 1;
        setChampionIndex(X, Y, item);
        addTraitsState(item);
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
    }),
    [champion]
  );

  const [, dropItem] = useDrop(
    {
      accept: 'ITEM',
      canDrop: () => !!champion && isItemDroppable(champion),
      drop: (item: Item) => {
        if (champion) {
          const newItem = itemCombineProcess(
            champion,
            item,
            items,
            itemRecipes
          );
          const newChampion: Champion = {
            ...champion,
            item: newItem,
          };
          setChampionIndex(X, Y, newChampion);
        }
      },
    },
    [champion]
  );

  const [, drag] = useDrag<Champion, void, { isDragging: boolean }>(
    () => ({
      type: 'CHAMPION',
      item: {
        id: champion?.id || 0,
        name: champion?.name || '',
        cost: champion?.cost || 0,
        traits: champion?.traits || [],
        image: champion?.image || '',
        star: champion?.star,
        item: champion?.item,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (_, monitor) => {
        const diff = monitor.getDifferenceFromInitialOffset();
        const diff_x = Math.abs(diff?.x || 51);
        const diff_y = Math.abs(diff?.y || 51);
        if (champion) {
          if (diff_x > 50 || diff_y > 50) {
            removeChampionIndex(X, Y);
            removeTraitsState(champion);
          }
        }
      },
    }),
    [champion]
  );

  const starHandleClick = () => {
    if (champion) {
      const prev = { ...champion };
      if (prev.star === 3) prev.star = 0;
      setChampionIndex(X, Y, { ...prev, star: (prev?.star || 0) + 1 });
    }
  };

  return (
    <>
      <div
        ref={(node) => {
          if (node && champion) {
            drag(node);
          }
        }}
        className="w-full h-full m-0 relative"
      >
        {champion !== undefined ? (
          <div
            className="absolute top-0 left-[50%] z-[1]"
            style={{
              transform: 'translateX(-50%)',
            }}
            onClick={starHandleClick}
          >
            <div className="flex cursor-pointer gap-x-[2px]">
              {Array.from({ length: champion.star || 1 }).map((_, idx) => (
                <div
                  key={idx}
                  className="size-5 rounded-full border bg-white bg-no-repeat bg-center bg-[length:75%]"
                  style={{ backgroundImage: 'url("/champion-star-1.jpeg")' }}
                ></div>
              ))}
            </div>
          </div>
        ) : null}
        <div
          ref={(node) => {
            if (node) {
              drop(node);
              dropItem(node);
            }
          }}
          onContextMenu={(e) => {
            if (champion) {
              e.preventDefault();
              removeChampionIndex(X, Y);
              removeTraitsState(champion);
            }
          }}
          style={{
            backgroundColor: isOver
              ? canDrop
                ? 'lightgreen'
                : 'transparent'
              : 'rgb(34, 34, 34)',
            width: '100%',
            height: '100%',
            clipPath:
              'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
        >
          {champion !== undefined ? (
            <div>
              <img
                className="absolute top-0 left-0 w-full h-full object-fill"
                src={champion.image}
                alt={champion.name}
              />
            </div>
          ) : null}
        </div>
        {champion != undefined && champion.item != undefined ? (
          <div className="absolute left-0 right-0 bottom-0">
            <div className="flex justify-center">
              {champion.item.map((item, idx) => (
                <DraggableContainerItem
                  key={idx}
                  idx={idx}
                  X={X}
                  Y={Y}
                  item={item}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
