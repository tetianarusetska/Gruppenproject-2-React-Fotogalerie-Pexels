import PhotoCard from "../components/PhotoCard.jsx"
import Header from "../components/Header.jsx"
import DeleteFavButton from "../components/DeleteFavButton.jsx"
import { useFavorites } from "../providers/FavoritesProvider.jsx";

export default function Favorites() {

    const { favorites } = useFavorites();

    function openPhoto(bild) {
        console.log(bild);
    }

    return (
        <>
            <Header />
            
            {favorites.length === 0 ? (
                <p className="p-6 text-center">No favorites yet</p>
            ) : (
                <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-6 space-y-6">
                    {favorites.map((bild) => (
                        <PhotoCard
                            key={bild.id}
                            bild={bild}
                            openPhoto={openPhoto}
                        />
                    ))}
                </section>
            )}
        </>
    );
}