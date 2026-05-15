import PhotoCard from "../components/PhotoCard.jsx"
import Header from "../components/Header.jsx"
import DeleteFavButton from "../components/DeleteFavButton.jsx"
import { useFavorites } from "../providers/FavoritesProvider.jsx" // Custom Hook importieren, um auf Favoriten zuzugreifen


export default function Favorites() {

    // favorites aus dem Context holen
    // enthält alle gespeicherten Lieblingsfotos
    const { favorites } = useFavorites();

    function openPhoto(bild) {
        console.log(bild);
    }

    return (
        <>
            <Header />
            <DeleteFavButton />
            {favorites.length === 0 ? (
                <p className="p-6 text-center">
                    No favorites yet
                </p>

            ) : (
                <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-6 space-y-6">
                    {/* Durch alle Favoriten iterieren */}
                    {favorites.map((bild) => (
                        // Für jedes Bild eine PhotoCard rendern
                        <PhotoCard
                            key={bild.id}
                            // Bilddaten an die Komponente übergeben
                            bild={bild}
                            // Funktion zum Öffnen des Bildes übergeben
                            openPhoto={openPhoto}
                        />
                    ))}
                </section>
            )}
        </>
    );
}