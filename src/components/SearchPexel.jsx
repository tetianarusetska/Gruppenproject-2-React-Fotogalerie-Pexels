 import { useEffect, useState, useRef } from "react";
import { usePhoto } from "../providers/ModalProvider.jsx";
import { usePexelsSearch } from "../hooks/usePexelsSearch";

function SearchPexel() {
  const { openPhoto } = usePhoto();

  const [bilder, setBilder] = useState([]);
  const [seite, setSeite] = useState(1);

  const [query, setQuery] = useState("Ozean");
  const [suchEingabe, setSuchEingabe] = useState("");
  const [farbe, setFarbe] = useState("");
  const [land, setLand] = useState("");

  const [daten, error, laedt] = usePexelsSearch(query, seite, "", "", farbe, land);

  const laedtRef = useRef(laedt);

  const kategorien = ["Natur", "Tiere", "Gebäude", "Meer", "Menschen", "Reisen"];
  const farben = ["red", "orange", "yellow", "green", "turquoise", "blue", "violet", "pink", "brown", "black", "gray", "white"];
  const laenderOptionen = [
    { code: "en-US", name: "United States"}, { code: "pt-BR", name: "Brazil"}, { code: "es-ES", name: "Spain"}, 
    { code: "ca-ES", name: "Catalonia"}, { code: "de-DE", name: "Germany"}, { code: "it-IT", name: "Italy"}, 
    { code: "fr-FR", name: "France"}, { code: "sv-SE", name: "Sweden"}, { code: "id-ID", name: "Indonesia"}, 
    { code: "pl-PL", name: "Poland"}, { code: "ja-JP", name: "Japan"}, { code: "zh-TW", name: "Taiwan"}, 
    { code: "zh-CN", name: "China"}, { code: "ko-KR", name: "South Korea"}, { code: "th-TH", name: "Thailand"}, 
    { code: "nl-NL", name: "Netherlands"}, { code: "hu-HU", name: "Hungary"}, { code: "vi-VN", name: "Vietnam"}, 
    { code: "cs-CZ", name: "Czech Republic"}, { code: "da-DK", name: "Denmark"}, { code: "fi-FI", name: "Finland"}, 
    { code: "uk-UA", name: "Ukraine"}, { code: "el-GR", name: "Greece"}, { code: "ro-RO", name: "Romania"}, 
    { code: "nb-NO", name: "Norway"}, { code: "sk-SK", name: "Slovakia"}, { code: "tr-TR", name: "Turkey"}, 
    { code: "ru-RU", name: "Russia"}
  ];

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

  function neueSucheStarten(neuerSuchbegriff, neueFarbe = farbe, neuesLand = land) {
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
          <div className="flex flex-wrap justify-center gap-3">
            <select
              className="rounded-full border border-gray-300 px-4 py-2 bg-white outline-none focus:border-black text-sm"
              value={farbe}
              onChange={(e) => neueSucheStarten(query, e.target.value, land)}
            >
              <option value="">All Colors</option>
              {farben.map((f) => (
                <option key={f} value={f}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </option>
              ))}
            </select>

            <select
              className="rounded-full border border-gray-300 px-4 py-2 bg-white outline-none focus:border-black text-sm"
              value={land}
              onChange={(e) => neueSucheStarten(query, farbe, e.target.value)}
            >
              <option value="">All Regions</option>
              {laenderOptionen.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
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