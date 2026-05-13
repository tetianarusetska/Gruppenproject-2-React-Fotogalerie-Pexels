import { useEffect, useState, useRef } from "react";
import { usePhoto } from "../providers/ModalProvider.jsx";
import { usePexelsSearch } from "../hooks/usePexelsSearch";

import LikeButton from "./LikeButton.jsx";
import SearchBar from "./SearchBar.jsx";

function SearchPexel() {

    const { openPhoto } = usePhoto();

    const [bilder, setBilder] = useState([]);
    const [seite, setSeite] = useState(1);

    const [query, setQuery] = useState("Ozean");
    const [suchEingabe, setSuchEingabe] = useState("");

    const [farbe, setFarbe] = useState("");
    const [land, setLand] = useState("");

    const [daten, error, laedt] =
        usePexelsSearch(query, seite, "", "", farbe, land);

    const laedtRef = useRef(laedt);

    const kategorien = [
        "Nature",
        "Animals",
        "Buildings",
        "Sea",
        "People",
        "Travel"
    ];

    const farben = [
        "red",
        "orange",
        "yellow",
        "green",
        "turquoise",
        "blue",
        "violet",
        "pink",
        "brown",
        "black",
        "gray",
        "white"
    ];

    const laenderOptionen = [
        { code: "en-US", name: "United States" },
        { code: "de-DE", name: "Germany" },
        { code: "fr-FR", name: "France" },
        { code: "ja-JP", name: "Japan" },
    ];

    useEffect(() => {

        if (daten && daten.photos) {

            setBilder((alteBilder) => {

                const neueIds = new Set(
                    alteBilder.map((b) => b.id)
                );

                const gefiltert = daten.photos.filter(
                    (b) => !neueIds.has(b.id)
                );

                return [...alteBilder, ...gefiltert];
            });
        }

    }, [daten]);

    useEffect(() => {
        laedtRef.current = laedt;
    }, [laedt]);

    function neueSucheStarten(
        neuerSuchbegriff,
        neueFarbe = farbe,
        neuesLand = land
    ) {

        setBilder([]);
        setSeite(1);

        setQuery(neuerSuchbegriff);
        setFarbe(neueFarbe);
        setLand(neuesLand);

        setSuchEingabe("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function sucheAbsenden(event) {

        event.preventDefault();

        if (suchEingabe.trim() === "") {
            return;
        }

        neueSucheStarten(suchEingabe.trim());
    }

    useEffect(() => {

        const scrollErkennen = () => {

            const scrollHoehe =
                document.documentElement.scrollHeight;

            const scrollOben =
                window.innerHeight + window.scrollY;

            const istUnten =
                scrollOben >= scrollHoehe - 300;

            if (istUnten && !laedtRef.current) {

                setSeite((alteSeite) =>
                    alteSeite + 1
                );
            }
        };

        window.addEventListener(
            "scroll",
            scrollErkennen,
            { passive: true }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                scrollErkennen
            );
        };

    }, []);

    return (
        <>

            <SearchBar
                suchEingabe={suchEingabe}
                setSuchEingabe={setSuchEingabe}
                sucheAbsenden={sucheAbsenden}

                farbe={farbe}
                land={land}

                farben={farben}
                laenderOptionen={laenderOptionen}

                neueSucheStarten={neueSucheStarten}

                query={query}
                kategorien={kategorien}
            />

            <section
                className="
                    columns-1
                    sm:columns-2
                    md:columns-3
                    lg:columns-4
                    gap-6 p-6 space-y-6
                "
            >

                {bilder.map((bild) => (

                    <article
                        key={bild.id}
                        className="
                            break-inside-avoid
                            overflow-hidden
                            relative
                        "
                    >

                        <img
                            src={bild.src.large}
                            alt={bild.alt || "Pexels Bild"}
                            className="
                                w-full cursor-pointer
                                hover:scale-[1.02]
                                transition-transform
                                duration-300 ease-in-out
                            "
                            onClick={() => openPhoto(bild)}
                        />

                        <div
                            className="
                                absolute top-3 right-3
                                transition-transform
                                hover:scale-110
                                duration-300 ease-in-out
                            "
                        >
                            <LikeButton bild={bild} />
                        </div>

                        <p className="mt-2">
                            {bild.photographer}
                        </p>

                    </article>

                ))}

                {laedt && <p>Loading images...</p>}

                {error && <p>Error: {error}</p>}

            </section>

        </>
    );
}

export default SearchPexel;