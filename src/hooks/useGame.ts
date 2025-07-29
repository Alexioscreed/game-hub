import { useEffect, useState } from "react";
import { GameDetails } from "../types";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

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
