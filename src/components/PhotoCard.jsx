import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../providers/FavoritesProvider.jsx"

export default function PhotoCard({ bild, openPhoto }) {

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
        <article className="relative break-inside-avoid overflow-hidden">

            <img
                src={bild.src.large}
                alt={bild.alt || "Pexels image"}
                className="w-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                onClick={() => openPhoto(bild)}
            />

            <button
                onClick={toggleLike}
                className="absolute top-3 right-3 p-2 w-10 h-10 rounded-full bg-black backdrop-blur-sm backdrop-filter bg-opacity-20 flex items-center justify-center transition-transform hover:scale-110 duration-300 ease-in-out"
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

            <p>{bild.photographer}</p>

        </article>
    );
}