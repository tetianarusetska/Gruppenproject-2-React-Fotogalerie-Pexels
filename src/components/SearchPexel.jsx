import { useEffect, useState, useRef } from "react"
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
  const [daten, error, laedt] = usePexelsSearch('Ozean', seite);

  const laedtRef = useRef(laedt);

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

  useEffect(() => {
    laedtRef.current = laedt;
  }, [laedt]);

  useEffect(() => {
  const scrollErkennen = () => {
    // 1. Aktuelle Position und Gesamthöhe berechnen
    const scrollHoehe = document.documentElement.scrollHeight;
    const scrollOben = window.innerHeight + window.scrollY;
    
    // 2. Schwellenwert: 300px vor dem Ende
    const istUnten = scrollOben >= scrollHoehe - 300;

    // 3. Nur triggern, wenn wir unten sind UND nicht gerade laden
    if (istUnten && !laedtRef.current) {
      console.log("Lade nächste Seite..."); // Zum Debuggen im Browser-Log
      setSeite((prev) => prev + 1);
    }
  };

  // Passive Listener sind besser für die Performance beim Scrollen
  window.addEventListener("scroll", scrollErkennen, { passive: true });

  return () => {
    window.removeEventListener("scroll", scrollErkennen);
  };
}, []);

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