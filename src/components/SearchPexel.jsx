 import { useEffect, useState } from "react";

function SearchPexel() {
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
      setBilder((alteBilder) => [
        ...alteBilder,
        ...daten.photos,
      ]);
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
    <section className="galerie">
      {bilder.map((bild) => (
        <article className="bild-karte" key={bild.id}>
          <img
            src={bild.src.medium}
            alt={bild.alt}
          />

          <p>{bild.photographer}</p>
        </article>
      ))}

      {laedt && <p>Lade Bilder...</p>}
    </section>
  );
}

export default SearchPexel;