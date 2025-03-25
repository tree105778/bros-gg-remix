// import { useState } from "react";
// import type { FetchItems, Item } from "~/types";
// import DraggableItemImage from "./draggableItemImage";
import { useLoaderData } from "@remix-run/react";
import type { loader } from "./route";
import DraggableItemImage from "./draggableItemImage";
import type { ItemType } from "~/types";

const ItemSelectBoard = function () {
  const { items } = useLoaderData<typeof loader>();

  return (
    <>
      {/* <Suspense fallback={<ItemSkeleton />}>
        <div className="flex gap-2 flex-wrap m-3">
          <Await resolve={items}>
            {(items) => {
              if (items) {
                return items.map((item) => {
                  const newItem = { ...item, type: item.type as ItemType };
                  return <DraggableItemImage key={item.id} item={newItem} />;
                });
              }
            }}
          </Await>
        </div>
      </Suspense> */}

      {items ? (
        <div className="flex gap-2 flex-wrap m-3">
          {items.map((item, idx) => {
            const newItem = { ...item, type: item.type as ItemType };
            return <DraggableItemImage key={idx} item={newItem} />;
          })}
        </div>
      ) : (
        <ItemSkeleton />
      )}
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
