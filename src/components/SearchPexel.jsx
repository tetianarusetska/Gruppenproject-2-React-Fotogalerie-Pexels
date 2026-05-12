 import { useEffect, useState, useRef } from "react";
import { usePhoto } from "../providers/ModalProvider.jsx";
import { usePexelsSearch } from "../hooks/usePexelsSearch";

function SearchPexel() {
  const { openPhoto } = usePhoto();

  const [bilder, setBilder] = useState([]);
  const [seite, setSeite] = useState(1);

  const [query, setQuery] = useState("Ozean");
  const [suchEingabe, setSuchEingabe] = useState("");

  const [daten, error, laedt] = usePexelsSearch(query, seite);

  const laedtRef = useRef(laedt);

  const kategorien = ["Natur", "Tiere", "Gebäude", "Meer", "Menschen", "Reisen"];

  useEffect(() => {
    if (daten && daten.photos) {
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

  function neueSucheStarten(neuerSuchbegriff) {
    setBilder([]);
    setSeite(1);
    setQuery(neuerSuchbegriff);
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
      const scrollHoehe = document.documentElement.scrollHeight;
      const scrollOben = window.innerHeight + window.scrollY;
      const istUnten = scrollOben >= scrollHoehe - 300;

      if (istUnten && !laedtRef.current) {
        setSeite((alteSeite) => alteSeite + 1);
      }
    };

    window.addEventListener("scroll", scrollErkennen, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollErkennen);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-6">
        <form onSubmit={sucheAbsenden} className="flex w-full max-w-xl gap-2">
          <input
            type="text"
            value={suchEingabe}
            onChange={(event) => setSuchEingabe(event.target.value)}
            placeholder="Suche nach Bildern..."
            className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none focus:border-black"
          />

          <button
            type="submit"
            className="rounded-full bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Suchen
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-3">
          {kategorien.map((kategorie) => (
            <button
              key={kategorie}
              type="button"
              onClick={() => neueSucheStarten(kategorie)}
              className={
                query === kategorie
                  ? "px-4 py-2 rounded-full bg-black text-white"
                  : "px-4 py-2 rounded-full bg-gray-200 text-black hover:bg-gray-300"
              }
            >
              {kategorie}
            </button>
          ))}
        </div>
      </div>

      <section className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-6 space-y-6">
        {bilder.map((bild) => (
          <article className="break-inside-avoid overflow-hidden" key={bild.id}>
            <img
              src={bild.src.large}
              alt={bild.alt || "Pexels Bild"}
              className="w-full cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              onClick={() => openPhoto(bild)}
            />
            <p>{bild.photographer}</p>
          </article>
        ))}

        {laedt && <p>Lade Bilder...</p>}
        {error && <p>Fehler: {error}</p>}
      </section>
    </>
  );
}

export default SearchPexel;