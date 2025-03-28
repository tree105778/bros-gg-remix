import { createClient } from '@supabase/supabase-js';
import type { Database } from '~/types/database.types';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export async function fetchChampionsData() {
  const { data: champions } = await supabase.from('champions_s13').select();
  return champions;
}

export async function fetchItemData() {
  const { data: items } = await supabase.from('items').select();
  return items;
}

export async function fetchItemRecipes() {
  const { data: itemRecipes } = await supabase.from('item_recipes').select();

  return itemRecipes;
}
