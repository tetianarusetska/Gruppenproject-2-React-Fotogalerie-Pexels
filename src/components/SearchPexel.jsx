import { useEffect, useState } from "react"
import { usePhoto } from "../providers/ModalProvider.jsx"

import { usePexelsSearch } from "../hooks/usePexelsSearch";

function SearchPexel() {

  const { openPhoto } = usePhoto();

  // Hier speichern wir alle Bilder
  const [bilder, setBilder] = useState([]);

  // aktuelle Seite der API
  const [seite, setSeite] = useState(1);

  // Ladezustand
  // const [laedt, setLaedt] = useState(false);

  // Query für die Suchbegriffe
  //const [query, setQuery] = useState("Ozean");

  // API Call über Hook
  const [daten, error, laedt] = usePexelsSearch('Ozean', seite)

  //console.log(daten);
  //console.log(error);
  //console.log(laedt);

  // lädt Bilder beim Start
  // und wenn sich die Seite ändert
  useEffect(() => {
    if (daten && daten.photos){
      setBilder((alteBilder) => {
        const neueIds = new Set(alteBilder.map((b) => b.id));
        const gefiltert = daten.photos.filter((b) => !neueIds.has(b.id));
        return [...alteBilder, ...gefiltert];
      });
    }
  }, [daten]);

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
      {error && <p>Fehler: {error}</p>}
    </section>
  );
}

export default SearchPexel;