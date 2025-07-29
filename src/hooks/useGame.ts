import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface GameDetails {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  parent_platforms: { platform: { id: number; name: string; slug: string } }[];
  metacritic: number;
  rating_top: number;
  genres: { id: number; name: string }[];
  publishers: { id: number; name: string }[];
  released: string;
  website: string;
}

const useGame = (id: string | undefined) => {
  const [game, setGame] = useState<GameDetails | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const controller = new AbortController();

    apiClient
      .get<GameDetails>(`/games/${id}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setGame(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  return { game, error, isLoading };
};

export default useGame;
