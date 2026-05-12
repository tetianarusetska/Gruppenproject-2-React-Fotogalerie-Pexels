import { useEffect, useState } from "react";

function ScrollToTop() {
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    function scrollPruefen() {
      if (window.scrollY > 400) {
        setSichtbar(true);
      } else {
        setSichtbar(false);
      }
    }

    window.addEventListener("scroll", scrollPruefen);

    return () => {
      window.removeEventListener("scroll", scrollPruefen);
    };
  }, []);

  function nachObenScrollen() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!sichtbar) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={nachObenScrollen}
      aria-label="Zurück zum Seitenanfang"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white text-2xl shadow-lg transition hover:scale-110 hover:bg-gray-800 animate-bounce"
    >
      ↑
    </button>
  );
}

export default ScrollToTop;