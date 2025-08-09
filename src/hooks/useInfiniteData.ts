import { useState, useEffect } from "react";
import APIClient, { FetchResponse } from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

const useInfiniteData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isLoadingMore, setLoadingMore] = useState(false);
    const [count, setCount] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [nextUrl, setNextUrl] = useState<string | null>(null);

    const loadInitialData = () => {
        const controller = new AbortController();
        const client = new APIClient<T>(endpoint);

        setLoading(true);
        setData([]); // Reset data when loading initial page
        
        client.getAll({ signal: controller.signal, ...requestConfig })
            .then((res) => {
                setData(res.results);
                setCount(res.count);
                setNextUrl(res.next);
                setHasNextPage(!!res.next);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });
        
        return () => controller.abort();
    };

    const loadMoreData = () => {
        if (!nextUrl || isLoadingMore) return;

        setLoadingMore(true);
        setError('');

        // Extract page number from nextUrl
        const urlParams = new URLSearchParams(nextUrl.split('?')[1]);
        const page = urlParams.get('page');
        
        const client = new APIClient<T>(endpoint);
        const loadMoreConfig = {
            ...requestConfig,
            params: {
                ...requestConfig?.params,
                page: page
            }
        };

        client.getAll(loadMoreConfig)
            .then((res) => {
                setData(prevData => [...prevData, ...res.results]);
                setNextUrl(res.next);
                setHasNextPage(!!res.next);
                setLoadingMore(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoadingMore(false);
            });
    };

    useEffect(() => {
        const cleanup = loadInitialData();
        return cleanup;
    }, deps ? [...deps] : []);

    return { 
        data, 
        error, 
        isLoading, 
        isLoadingMore,
        count, 
        hasNextPage,
        loadMoreData
    };
};

export default useInfiniteData;
