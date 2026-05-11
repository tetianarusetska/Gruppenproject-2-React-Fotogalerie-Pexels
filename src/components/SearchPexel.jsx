import { useEffect, useState } from "react"
import { usePhoto } from "../providers/ModalProvider.jsx"


function SearchPexel() {

  const { openPhoto } = usePhoto();

  // Hier speichern wir alle Bilder
  const [bilder, setBilder] = useState([]);

  // aktuelle Seite der API
  const [seite, setSeite] = useState(1);

  // Ladezustand
  const [laedt, setLaedt] = useState(false);

  // API Key aus .env holen
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  // Bilder laden
  async function bilderLaden() {
    setLaedt(true);

    try {
      const antwort = await fetch(
        `https://api.pexels.com/v1/curated?page=${seite}&per_page=15`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const daten = await antwort.json();

      // alte + neue Bilder zusammenfügen
      setBilder((alteBilder) => {
        const neueIds = new Set(alteBilder.map((b) => b.id));
        const gefiltert = daten.photos.filter((b) => !neueIds.has(b.id));
        return [...alteBilder, ...gefiltert];
      });
    } catch (fehler) {
      console.error("Fehler:", fehler);
    } finally {
      setLaedt(false);
    }
  }

  // lädt Bilder beim Start
  // und wenn sich die Seite ändert
  useEffect(() => {
    bilderLaden();
  }, [seite]);

  // Infinity Scroll
  useEffect(() => {
    function scrollErkennen() {
      const unten =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (unten && !laedt) {
        setSeite((alteSeite) => alteSeite + 1);
      }
    }

    window.addEventListener("scroll", scrollErkennen);

    return () => {
      window.removeEventListener("scroll", scrollErkennen);
    };
  }, [laedt]);

  return (
    <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-6 space-y-6">
      {bilder.map((bild) => (
        <article className="break-inside-avoid overflow-hidden" key={bild.id}>
          <img
            src={bild.src.large}
            alt={bild.alt}
            className="w-full hover:scale-[1.02] transition-transform duration-300"
            onClick={() => openPhoto(bild)}
          />

          <p>{bild.photographer}</p>
        </article>
      ))}

      {laedt && <p>Lade Bilder...</p>}
    </section>
  );
}

export default SearchPexel;