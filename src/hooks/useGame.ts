import { useEffect, useState } from "react";
import { GameDetails } from "../types";
import APIClient from "../services/api-client";
import { CanceledError } from "axios";

const useGame = (id: string | undefined) => {
  const [game, setGame] = useState<GameDetails | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const controller = new AbortController();
    const client = new APIClient<GameDetails>("/games");

    client
      .get(id)
      .then((res) => {
        setGame(res);
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
