import type { Traits, SynergyData } from "~/types";
import synergyData from "~/data/S13/synergy.json";

export default function SynergyInfo({ trait }: { trait: Traits }) {
  const { traits } = synergyData as SynergyData;
  const traitInfo = traits.find((t) => t.name === trait.trait);
  if (!traitInfo) return null;
  const activate_level = traitInfo.activation.map((t) => t.unit_count);
  const levelIndex = activate_level.findIndex((level, idx) =>
    idx === activate_level.length - 1
      ? trait.count >= level
      : trait.count >= level && trait.count < activate_level[idx + 1]
  );
  if (levelIndex === -1) {
    return (
      <div className="flex items-center min-h-[40px] px-[4.5px] py-2 border-[#323232] text-white rounded bg-[#27282e] gap-1.5">
        <div className="size-6 relative">
          <img
            className="absolute top-0 left-0 w-full h-full object-fill"
            src={traitInfo.default_image}
            alt={trait.trait}
          />
        </div>
        <div className="text-[12px] leading-3">
          <div className="mb-0.5">{trait.trait}</div>
          <div className="flex items-center gap-0.5 text-[12px] text-[#808080]">
            {trait.count}
            <span>/</span>
            {activate_level[0]}
          </div>
        </div>
      </div>
    );
  }
  // const synergyImage =
  //   levelIndex === -1
  //     ? traitInfo.default_image
  //     : traitInfo.activation[levelIndex].image;
  const displaySynergyInfo = {
    synergyImage: traitInfo.activation[levelIndex].image,
    currentLevel: activate_level[levelIndex],
    nextLevel: activate_level[levelIndex + 1] || null,
  };

  return (
    <div className="flex items-center min-h-[40px] px-[4.5px] py-2 border-[#323232] text-white rounded bg-[#27282e] gap-1.5">
      <div className="size-6 relative">
        <img
          className="absolute top-0 left-0 w-full h-full object-fill"
          src={displaySynergyInfo.synergyImage}
          alt={trait.trait}
        />
      </div>
      <div className="w-[16px] h-6 text-[12px] rounded-[2px] bg-[#363944] leading-6">
        {trait.count}
      </div>
      <div className="text-[12px] leading-3">
        <div className="mb-0.5">{trait.trait}</div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-white font-bold">
            {displaySynergyInfo.currentLevel}
          </span>
          {displaySynergyInfo.nextLevel !== null ? (
            <>
              <span className="w-[10px] h-1 bg-[#4f4f67] rotate-[-90deg] block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 9 5"
                  fill="currentColor"
                  width="100%"
                  height="100%"
                >
                  <path d="M.848 0C.355 0 .109.602.465.957l3.5 3.5a.561.561 0 0 0 .793 0l3.5-3.5C8.613.602 8.368 0 7.875 0H.848Z"></path>
                </svg>
              </span>
              <span className="text-[#808080]">
                {displaySynergyInfo.nextLevel}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
