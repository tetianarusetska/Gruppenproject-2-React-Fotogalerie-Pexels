import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";

export default function PhotoCard({ bild, openPhoto }) {

    return (
        <article className="relative break-inside-avoid overflow-hidden">

            <img
                src={bild.src.large}
                alt={bild.alt || "Pexels image"}
                className="w-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                onClick={() => openPhoto(bild)}
            />

            <button
                className="absolute top-3 right-3 bg-white/80 p-2 rounded-full"
            >
                <FaHeart size={20} />
            </button>

            <p>{bild.photographer}</p>

        </article>
    );
}

