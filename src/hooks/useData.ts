import { useState } from "react";
import { useEffect } from "react";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    
    const [data, SetData] = useState<T[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        const client = new APIClient<T>(endpoint);

        setLoading(true);
        client.getAll({ signal: controller.signal, ...requestConfig })
            .then((res) => {
                SetData(res.results);
                setCount(res.count);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message)
                setLoading(false);
            });
        
        return () => controller.abort();
    }, deps? [...deps] : []);

    return { data, error, isLoading, count };
};


    export default useData; 