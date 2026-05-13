import { FaHeart } from "react-icons/fa"
import { useFavorites } from "../providers/FavoritesProvider.jsx"

const LikeButton = ({ bild }) => {
    const {
        favorites,
        addToFavorites,
        removeFromFavorites
    } = useFavorites();

    const isLiked = favorites.some(f => f.id === bild.id);

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
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
            <FaHeart
                size={18}
                className={isLiked ? "text-red-500" : "text-black"}
            />
        </button>
    );
};

export default LikeButton;