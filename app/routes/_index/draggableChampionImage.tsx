import { useDrag } from 'react-dnd';
import type { Champion, FetchChampions } from '~/types';

export default function DraggableChampionImage({
  champion,
}: {
  champion: FetchChampions;
}) {
  const { id, name, cost, traits, image } = champion;
  const [, drag] = useDrag<Champion>(() => ({
    type: 'CHAMPION',
    item: {
      id,
      name,
      cost,
      traits,
      image,
    },
  }));

  return (
    <>
      <div
        ref={(node) => {
          if (node) {
            drag(node);
          }
        }}
      >
        <img src={champion.image} alt={champion.name} width={70} height={70} />
      </div>
    </>
  );
}
