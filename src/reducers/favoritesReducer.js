export function favoritesReducer(state, action) {

    switch (action.type) {
        case "added":
            return [...state, action.photo];

        case "deleted":
            return state.filter(p => p.id !== action.id);

        default:
            return state;
    }
    
}

export const initialFavorites = [];