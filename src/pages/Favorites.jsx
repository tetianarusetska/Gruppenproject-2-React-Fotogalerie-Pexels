import PhotoCard from "../components/PhotoCard";
import Header from "../components/Header";

export default function Favorites() {

    const favorites = [
        {
            id: 1,
            alt: "Ocean",
            photographer: "Pexels",
            src: {
                large:
                    "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg",
            },
        },

        {
            id: 2,
            alt: "Mountains",
            photographer: "Pexels",
            src: {
                large:
                    "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
            },
        },
    ];

    function openPhoto(bild) {
        console.log(bild);
    }

    return (
        <>
        <Header />
        <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-6 space-y-6">

            {favorites.map((bild) => (
                <PhotoCard
                    key={bild.id}
                    bild={bild}
                    openPhoto={openPhoto}
                />
            ))}

        </section>
        </>
    );
}