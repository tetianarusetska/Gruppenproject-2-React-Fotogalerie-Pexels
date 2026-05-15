import { useState, useContext } from "react";
import SearchContext from "../contexts/SearchContext.js";

export default function SearchProvider({ children }) {

    const [query, setQuery] = useState("Nature");

    function neueSucheStarten(neuerSuchbegriff) {
        setQuery(neuerSuchbegriff);
    }

    return (
        <SearchContext.Provider
            value={{
                query,
                neueSucheStarten,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    return useContext(SearchContext);
}