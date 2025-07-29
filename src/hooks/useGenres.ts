
import { Genre } from "../types";
import genres from "../constants/genres";

const useGenres = () => ({data: genres, isLoading: false, error: null});

export default useGenres; 