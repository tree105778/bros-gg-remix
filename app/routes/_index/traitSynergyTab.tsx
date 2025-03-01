import { useChampionAndIndexStore, useTraitsStateStore } from "~/store";

export default function TraitSynergyTab() {
  const { traits, removeAllTraitsState } = useTraitsStateStore();
  const resetAllChampionIndex = useChampionAndIndexStore(
    (state) => state.resetAllChampionIndex
  );

  return (
    <div className="flex flex-col justify-center">
      <div className="flex bg-[#27282e] gap-1 flex-wrap">
        {Object.entries(traits).map(([trait, count]) => (
          <div
            key={trait}
            className="border-[1px] rounded-[4px] border-[#323232] text-white"
          >
            {trait}: {count}
          </div>
        ))}
      </div>
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
