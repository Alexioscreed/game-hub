import { Game } from "../types";
import useLocalStorage from "./useLocalStorage";

const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<Game[]>("favoriteGames", []);

  const addToFavorites = (game: Game) => {
    if (!favorites.find((g) => g.id === game.id)) {
      setFavorites([...favorites, game]);
    }
  };

  const removeFromFavorites = (gameId: number) => {
    setFavorites(favorites.filter((g) => g.id !== gameId));
  };

  const isFavorite = (gameId: number) => {
    return favorites.some((g) => g.id === gameId);
  };

  const toggleFavorite = (game: Game) => {
    if (isFavorite(game.id)) {
      removeFromFavorites(game.id);
    } else {
      addToFavorites(game);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
};

export default useFavorites;
