// Reducer — Funktion zur Verwaltung des Favoriten-Status
// Die Funktion bekommt:
// 1. state  → aktueller Zustand (Array mit Lieblingsfotos)
// 2. action → Objekt mit Information darüber, WAS gemacht werden soll

export function favoritesReducer(state, action) {

    // switch überprüft den Typ der Aktion
    switch (action.type) {

        case "added":
            // ...state → kopiert alle alten Fotos
            // action.photo → fügt neues Foto am Ende hinzu
            return [...state, action.photo];

        case "deleted":
            // filter geht durch jedes Foto im Array
            // p = ein einzelnes Foto
            // Behalten werden nur Fotos,
            // deren id NICHT gleich action.id ist
            return state.filter(p => p.id !== action.id);

        case "clear":
            // Leeres Array zurückgeben
            return [];

        default:
            // Aktuellen Zustand unverändert zurückgeben
            return state;
    }

}

// Anfangszustand der Favoriten
export const initialFavorites = [];