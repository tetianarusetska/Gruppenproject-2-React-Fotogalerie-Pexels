import { usePhoto } from '../providers/ModalProvider.jsx'

export default function PhotoModal() {

  // selectedPhoto → aktuell ausgewähltes Foto
  // closePhoto → Funktion zum Schließen des Modals
  // Beide Werte kommen aus dem Context (ModalProvider)
  const { selectedPhoto, closePhoto } = usePhoto()

  // Wenn kein Foto ausgewählt wurde,
  // soll nichts angezeigt werden
  if (!selectedPhoto) return null

  // Funktion zum Schließen des Modals
  // wenn auf den Hintergrund geklickt wird
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closePhoto()
  }

  return (

    // Hintergrund des Modals
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >

      {/* Modal-Container */}
      <div className="relative bg-[var(--bgColor)] shadow-2xl max-w-3xl w-full mx-4 overflow-hidden max-h-[100vh] flex flex-col">

        {/* Schließen-Button oben rechts */}
        <button
          onClick={closePhoto}
          className="absolute top-0 right-0 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 flex items-center justify-center text-lg transition"
        >
          X
        </button>

        {/* Großes Bild */}
        <img
          src={selectedPhoto.src.large2x}
          alt={selectedPhoto.alt}
          className="w-full max-h-[75vh] object-contain p-[12px]"
        />

        {/* Informationsbereich unter dem Bild */}
        <div className="p-5">

          {/* Name des Fotografen */}
          <p className="text-lg font-[Montserrat]">
            Photography by {selectedPhoto.photographer}
          </p>

          {/* Beschreibung des Bildes */}
          <p className="text-md mt-1 font-[Montserrat]">
            {selectedPhoto.alt}
          </p>

          {/* Link zum Pexels-Profil des Fotografen */}
          <a
            href={selectedPhoto.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[Montserrat] inline-block mt-1 text-md text-blue-900 mr-[12px]"
          >
            View profile on Pexels
          </a>

          |

          {/* Link zum Originalbild in voller Größe */}
          <a
            href={selectedPhoto.src.original}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[Montserrat] inline-block mt-1 text-md text-blue-900 ml-[12px]"
          >
            View full-size photo
          </a>

        </div>
      </div>
    </div>
  )
}