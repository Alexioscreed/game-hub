
import { GameQuery, Game } from "../types";
import useInfiniteData from "./useInfiniteData";

const useGames = (
    gameQuery: GameQuery
) =>
    useInfiniteData<Game>(
        '/games',
        {
             params: {
                genres: gameQuery.genre?.id,
                platforms: gameQuery.platform?.id,
                ordering: gameQuery.sortOrder,
                search: gameQuery.searchText,
                page_size: 20 // Explicitly set page size
            },
        }, 
        [gameQuery]
    );
   
export default useGames;