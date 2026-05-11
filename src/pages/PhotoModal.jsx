import { usePhoto } from '../providers/ModalProvider.jsx'

export default function PhotoModal() {
  // Ausgewähltes Foto und Schließ-Funktion aus dem Kontext holen
  const { selectedPhoto, closePhoto } = usePhoto()

  // Nichts rendern, wenn kein Foto ausgewählt ist
  if (!selectedPhoto) return null

  // Modal schließen, wenn der Hintergrund angeklickt wird
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closePhoto()
  }

  return (
    // Halbtransparenter Hintergrund mit Weichzeichner-Effekt
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal-Fenster: Schatten, begrenzte Höhe */}
      <div className="relative bg-[var(--bgColor)] shadow-2xl max-w-3xl w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col">

        {/* Schließen-Schaltfläche oben rechts */}
        <button
          onClick={closePhoto}
          className="absolute top-0 right-0 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 flex items-center justify-center text-lg transition"
        >
          X
        </button>

        {/* Foto in voller Breite, Höhe begrenzt auf 65% des Bildschirms */}

        <img
          src={selectedPhoto.src.large2x}
          alt={selectedPhoto.alt}
          className="max-h-[65vh] w-full object-contain p-[18px]"
        />


        {/* Informationsbereich unterhalb des Fotos */}
        <div className="p-5">
          {/* Name des Fotografen */}
          <p className="text-lg font-[Montserrat]">{selectedPhoto.photographer}</p>

          {/* Externer Link zum Pexels-Profil des Fotografen */}

          <a href={selectedPhoto.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[Montserrat] inline-block mt-3 text-sm text-blue-900"
          >
            Profil auf Pexels anzeigen
          </a>
        </div>
      </div>
    </div>
  )
}