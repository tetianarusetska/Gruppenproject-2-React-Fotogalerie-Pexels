import { useReducer, useContext } from "react"
import { favoritesReducer, initialFavorites } from "../reducers/favoritesReducer.js"
import FavoritesContext from "../contexts/FavoritesContext.js"

export default function FavoritesProvider({ children }) {
    const [favorites, dispatch] = useReducer(
        favoritesReducer,
        initialFavorites
    );

    function addToFavorites(photo) {
        dispatch({
            type: "added",
            photo,
        });
    }

    function removeFromFavorites(id) {
        dispatch({
            type: "deleted",
            id,
        });
    }

    function clearFavorites() {
        dispatch({
            type: "clear",
        });
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                clearFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}


export function useFavorites() {
    return useContext(FavoritesContext);
}