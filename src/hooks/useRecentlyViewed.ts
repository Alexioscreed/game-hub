import { Game } from "./useGames";
import useLocalStorage from "./useLocalStorage";

const useRecentlyViewed = () => {
  const [recentGames, setRecentGames] = useLocalStorage<Game[]>("recentlyViewedGames", []);

  const addToRecentlyViewed = (game: Game) => {
    const filteredGames = recentGames.filter((g) => g.id !== game.id);
    const updatedGames = [game, ...filteredGames].slice(0, 10); // Keep only 10 recent games
    setRecentGames(updatedGames);
  };

  const clearRecentlyViewed = () => {
    setRecentGames([]);
  };

  return {
    recentGames,
    addToRecentlyViewed,
    clearRecentlyViewed,
  };
};

export default useRecentlyViewed;
