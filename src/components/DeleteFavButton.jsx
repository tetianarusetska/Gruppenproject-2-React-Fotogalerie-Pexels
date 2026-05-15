import { useFavorites } from "../providers/FavoritesProvider.jsx" // Custom Hook importieren, um auf den FavoritesContext zuzugreifen


export default function DeleteFavButton() {

    // clearFavorites aus dem Context holen
    // Diese Funktion leert die komplette Favoritenliste
    const { clearFavorites } = useFavorites();

    return (

        <button
            onClick={clearFavorites}
            className="
                  bg-black text-white
                  text-[18px]
                  px-4 py-2 rounded-md
                  hover:bg-gray-800
                  transition-colors
                  ml-[22px]
                "
        >
            Delete All

        </button>
    );
}