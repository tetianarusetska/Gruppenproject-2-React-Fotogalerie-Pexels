import { useEffect, useState } from "react";
import { search } from "../js/pexels";

export function usePexelsSearch(query) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            if (query === "") {
                setResults([]);
                return;
            }

            try {
                setIsLoading(true);
                await new Promise(r => setTimeout(() => r(), 1000)); // simulatesd 1s server response time
                const data = await search(query);

                console.log(data);
                setResults(data.results);
                setError(null)
            } catch (error) {
                setError(error)
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }
        load();
    }, [query])

    return [results, error, isLoading];
}