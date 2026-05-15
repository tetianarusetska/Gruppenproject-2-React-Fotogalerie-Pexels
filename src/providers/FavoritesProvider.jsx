import { useReducer, useContext } from "react"
import { favoritesReducer, initialFavorites } from "../reducers/favoritesReducer.js"
import FavoritesContext from "../contexts/FavoritesContext.js"

export default function FavoritesProvider({ children }) {

    // useReducer verwaltet den State
    // favorites → aktueller Zustand
    // dispatch → Funktion zum Senden von Aktionen
    const [favorites, dispatch] = useReducer(
        favoritesReducer,
        initialFavorites
    );

    function addToFavorites(photo) {

        // dispatch sendet eine Aktion an den Reducer
        dispatch({
            type: "added",
            // Foto, das hinzugefügt werden soll
            photo,
        });
    }

    function removeFromFavorites(id) {
        // Aktion an Reducer senden
        dispatch({
            type: "deleted",
            // ID des Fotos, das gelöscht werden soll
            id,
        });
    }

    function clearFavorites() {
        // Reducer bekommt Aktion "clear"
        dispatch({
            type: "clear",
        });
    }

    // Context Provider
    return (
        // Provider gibt Daten an alle Child-Komponenten weiter
        <FavoritesContext.Provider
            // value enthält alle Werte/Funktionen,
            // die andere Komponenten benutzen können
            value={{
                // Aktuelle Favoritenliste
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

// Custom Hook
export function useFavorites() {
    // Gibt den Context zurück
    return useContext(FavoritesContext);
}