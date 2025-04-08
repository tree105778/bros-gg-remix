import { Await, useLoaderData } from '@remix-run/react';
import type { loader } from './route';
import DraggableItemImage from './draggableItemImage';
import type { ItemType } from '~/types';
import { Suspense } from 'react';

const ItemSelectBoard = function () {
  const { items: itemsPromise } = useLoaderData<typeof loader>();

  return (
    <>
      <Suspense fallback={<ItemSkeleton />}>
        <Await resolve={itemsPromise}>
          {(items) => (
            <div className="flex gap-2 flex-wrap m-3">
              {items?.map((item, idx) => {
                const newItem = { ...item, type: item.type as ItemType };
                return <DraggableItemImage key={idx} item={newItem} />;
              })}
            </div>
          )}
        </Await>
      </Suspense>
      )
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
