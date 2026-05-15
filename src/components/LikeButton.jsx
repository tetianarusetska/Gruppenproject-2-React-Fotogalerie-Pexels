import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../providers/FavoritesProvider.jsx" // Custom Hook importieren, um auf Favoriten-Funktionen zuzugreifen



// bekommt ein Bild als Prop
const LikeButton = ({ bild }) => {

    // Werte und Funktionen aus dem Context holen
    const {
        favorites,
        addToFavorites,
        removeFromFavorites
    } = useFavorites();


    // Prüfen, ob das aktuelle Bild bereits, in den Favoriten vorhanden ist
    const isLiked = favorites.some(f => f.id === bild.id);

    // Funktion zum Umschalten des Like-Status
    function toggleLike() {

        if (isLiked) {
            removeFromFavorites(bild.id);

        } else {
            addToFavorites(bild);
        }
    }

    return (

        <button
            onClick={toggleLike}
            className="w-10 h-10 rounded-full bg-black backdrop-blur-sm backdrop-filter bg-opacity-20 flex items-center justify-center"
        >
            {isLiked ? (
                <FaHeart
                    size={18}
                    className="text-white"
                />

            ) : (
                <FaRegHeart
                    size={18}
                    className="text-white"
                />
            )}
        </button>
    );
};

export default LikeButton;