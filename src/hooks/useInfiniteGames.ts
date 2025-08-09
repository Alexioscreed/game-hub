import { useState, useEffect } from "react";
import { GameQuery, Game } from "../types";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface UseInfiniteGamesResult {
  data: Game[];
  error: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  count: number;
  hasNextPage: boolean;
  loadMore: () => void;
}

const useInfiniteGames = (gameQuery: GameQuery): UseInfiniteGamesResult => {
  const [data, setData] = useState<Game[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const pageSize = 20; // RAWG API default page size

  const fetchGames = async (page: number, isLoadMore: boolean = false) => {
    const controller = new AbortController();
    const client = new APIClient<Game>('/games');

    if (isLoadMore) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
      setData([]); // Clear existing data for new searches
    }

    try {
      const requestConfig: AxiosRequestConfig = {
        signal: controller.signal,
        params: {
          genres: gameQuery.genre?.id,
          platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: page,
          page_size: pageSize
        },
      };

      const response: FetchResponse<Game> = await client.getAll(requestConfig);
      
      if (isLoadMore) {
        // Append new games to existing data
        setData(prevData => [...prevData, ...response.results]);
      } else {
        // Replace data for new search
        setData(response.results);
      }
      
      setCount(response.count);
      setHasNextPage(response.next !== null);
      setError('');
    } catch (err) {
      if (err instanceof CanceledError) return;
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }

    return () => controller.abort();
  };

  // Reset pagination when gameQuery changes
  useEffect(() => {
    setCurrentPage(1);
    setHasNextPage(true);
    fetchGames(1, false);
  }, [gameQuery.genre?.id, gameQuery.platform?.id, gameQuery.sortOrder, gameQuery.searchText]);

  const loadMore = () => {
    if (!hasNextPage || isLoadingMore) return;
    
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchGames(nextPage, true);
  };

  return {
    data,
    error,
    isLoading,
    isLoadingMore,
    count,
    hasNextPage,
    loadMore
  };
};

export default useInfiniteGames;
