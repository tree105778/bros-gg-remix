import DraggableChampionImage from "./draggableChampionImage";
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { FetchChampions } from "~/types";
import clsx from "clsx";
import { processingChampions, updateProcessedChampions } from "~/lib";
import { getChoseong } from "~/lib/getChoseong";
import { useLoaderData } from "@remix-run/react";
import type { loader } from "./route";

const ChampionSelectBoard = function () {
  const { champions: initialChampionsData } = useLoaderData<typeof loader>();

  const [champions, setChampions] = useState<FetchChampions[]>(
    initialChampionsData || []
  );
  const [tabNavItem, setTabNabItem] = useState("name");
  const [processedChampions, setProcessedChampions] = useState<
    FetchChampions[]
  >(initialChampionsData || []);
  const [onChangeChampionText, setOnchangeChampionText] = useState("");

  if (initialChampionsData == null) return ChampionSkeleton();

  const searchChampions = (text: string) => {
    if (text === "") setProcessedChampions([...champions]);
    else {
      setProcessedChampions(
        [...champions].filter(
          (champ) =>
            champ.name.includes(text) || getChoseong(champ.name).includes(text)
        )
      );
    }
  };

  const switchToggle = (nav: string) => {
    setTabNabItem(nav);
    setChampions(processingChampions(nav, champions));
    setProcessedChampions(
      updateProcessedChampions(nav, onChangeChampionText, champions)
    );
  };

  const handleChampionSearchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    searchChampions(text);
    setOnchangeChampionText(text);
  };

  const setClsxClass: (state: string) => string = (state) =>
    clsx(
      "w-[52px] h-[44px] text-center leading-[2.5]",
      tabNavItem !== state && "text-[#999999] p-0",
      tabNavItem === state &&
        "text-[#ca9372] font-semibold border-b-2 border-[#ca9372]"
    );

  return (
    <div className="bg-[#2D2F37] border-[#e5e7eb] pt-2">
      <div className="flex items-center">
        <nav className="flex gap-4 px-[14px] flex-1">
          <div
            className={setClsxClass("name")}
            onClick={() => switchToggle("name")}
          >
            이름순
          </div>
          <div
            className={setClsxClass("price")}
            onClick={() => switchToggle("price")}
          >
            가격순
          </div>
        </nav>
        <div className="w-[200px] bg-[#16171B] ml-6 mr-2 rounded">
          <div className="max-w-[349px] rounded flex items-center px-3">
            <input
              required
              type="text"
              className="block h-8 w-full text-white bg-transparent outline-none text-[14px] flex-1"
              placeholder="챔피언 검색"
              onChange={handleChampionSearchOnChange}
              value={onChangeChampionText}
            />
            <button>
              <svg
                viewBox="0 0 15 15"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="100%"
                color="#CA9372"
              >
                <path d="m13.809 12.863-2.735-2.734c-.136-.11-.3-.191-.465-.191h-.437a5.701 5.701 0 0 0 1.203-3.5C11.375 3.32 8.805.75 5.687.75 2.543.75 0 3.32 0 6.438a5.683 5.683 0 0 0 5.688 5.687 5.651 5.651 0 0 0 3.5-1.203v.465a.64.64 0 0 0 .19.465l2.708 2.707c.273.273.684.273.93 0l.765-.766c.274-.246.274-.656.028-.93ZM5.688 9.938a3.49 3.49 0 0 1-3.5-3.5c0-1.915 1.558-3.5 3.5-3.5 1.914 0 3.5 1.585 3.5 3.5 0 1.94-1.586 3.5-3.5 3.5Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap m-3">
        {processedChampions.map((champion) => (
          <DraggableChampionImage key={champion.id} champion={champion} />
        ))}
      </div>
    </div>
  );
};

const ChampionSkeleton = () => (
  <div className="flex gap-2 flex-wrap m-3 animate-pulse">
    {Array(50)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="w-16 h-16 bg-gray-700 rounded"></div>
      ))}
  </div>
);

export default ChampionSelectBoard;
