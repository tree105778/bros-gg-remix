import type { Champion, DataState } from '~/types';
import { getChoseong } from './getChoseong';
import type React from 'react';

export const processingChampions = (
  criteria: string,
  champions: Champion[]
) => {
  let sortedChampions = [...champions];
  switch (criteria) {
    case 'name':
      sortedChampions = sortedChampions.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    case 'price':
      sortedChampions = sortedChampions.sort((a, b) => a.cost - b.cost);
      break;
    default:
      sortedChampions = [...champions];
  }
  return sortedChampions;
};

export const updateProcessedChampions = (
  criteria: string,
  searchText: string,
  data: Champion[]
) => {
  let newChampions = [...data];
  switch (criteria) {
    case 'name':
      newChampions = newChampions.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price':
      newChampions = newChampions.sort((a, b) => a.cost - b.cost);
      break;
    default:
      newChampions = [...data];
  }

  if (searchText !== '') {
    newChampions = newChampions.filter(
      (champ) =>
        champ.name.includes(searchText) ||
        getChoseong(champ.name).includes(searchText)
    );
  }
  return newChampions;
};

export const fetchData = async <T>(
  url: string,
  setState: React.Dispatch<React.SetStateAction<DataState<T>>>
) => {
  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Data fetching error! stats: {response.status}`);
    const data = await response.json();
    setState({ data, loading: false, error: null });
  } catch (error) {
    setState((prev) => ({
      ...prev,
      loading: false,
      error: error instanceof Error ? error.message : 'Unknown Error occurred',
    }));
  }
};
