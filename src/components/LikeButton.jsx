import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa";
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
    className="w-10 h-10 rounded-full bg-black  backdrop-blur-sm backdrop-filter bg-opacity-20 flex items-center justify-center"
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