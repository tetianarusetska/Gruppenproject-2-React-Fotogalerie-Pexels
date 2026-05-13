import { FaHeart } from "react-icons/fa"
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
                className="absolute top-3 right-3 bg-white/80 p-2 rounded-full"
            >
                <FaHeart
                    size={20}
                    className={isLiked ? "text-red-500" : "text-black"}
                />
            </button>

            <p>{bild.photographer}</p>

        </article>
    );
}