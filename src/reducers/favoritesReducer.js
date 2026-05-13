export function favoritesReducer(state, action) {

    switch (action.type) {
        case "added":
            return [...state, action.photo];

        case "deleted":
            return state.filter(p => p.id !== action.id);

        case "clear":
            return [];

        default:
            return state;
    }

}

export const initialFavorites = [];