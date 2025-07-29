import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/useGames";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
