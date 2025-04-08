import {
  fetchChampionsData,
  fetchItemData,
  fetchItemRecipes,
} from '~/lib/supabase';
import BoardWithSelect from './boardWithSelect';
import { defer } from '@remix-run/server-runtime';

export async function loader() {
  const champions = await fetchChampionsData();
  const items = fetchItemData();
  const itemRecipes = await fetchItemRecipes();

  return defer({
    champions,
    items,
    itemRecipes,
  });
}

export default function Index() {
  return (
    <div className="mx-auto my-0 border-2 border-black max-w-[768px]">
      <div className="border-2 border-yellow-500">
        <p>BROS.GG</p>
        <p>배치툴</p>
      </div>
      <BoardWithSelect />
    </div>
  );
}
