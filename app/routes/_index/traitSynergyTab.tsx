import { useChampionAndIndexStore, useTraitsStateStore } from '~/store';
import SynergyInfo from './synergyInfo';

export default function TraitSynergyTab() {
  const { traits, removeAllTraitsState } = useTraitsStateStore();
  const resetAllChampionIndex = useChampionAndIndexStore(
    (state) => state.resetAllChampionIndex
  );

  return (
    <div className="flex flex-col justify-center">
      <div className="flex gap-0.5 flex-wrap border-black">
        {traits.map((trait, idx) => (
          <div key={idx} className="flex gap-1 m-1">
            <SynergyInfo trait={trait} />
          </div>
        ))}
      </div>
      <hr />
      <button
        onClick={() => {
          resetAllChampionIndex();
          removeAllTraitsState();
        }}
        className="mx-auto w-[50px] h-full border border-black rounded"
      >
        초기화
      </button>
    </div>
  );
}
