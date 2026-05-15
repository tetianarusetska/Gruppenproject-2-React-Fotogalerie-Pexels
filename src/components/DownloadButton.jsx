import { FiDownload } from "react-icons/fi"

// Erwartet ein "photo"-Objekt als Prop
export default function DownloadButton({ photo }) {

    // Funktion zum Herunterladen des Bildes
    // (funktioniert auch bei externen URLs wie Pexels)
    async function downloadImage(url, filename) {

        // Schutz: wenn keine URL vorhanden ist → Abbruch
        if (!url) return;

        try {
            // Bild von externer Quelle herunterladen
            const response = await fetch(url);

            // Antwort in ein Blob-Objekt umwandeln
            const blob = await response.blob();

            // Temporäre lokale URL für das Blob erstellen
            const blobUrl = window.URL.createObjectURL(blob);

            // Neues <a>-Element erstellen
            const link = document.createElement("a");

            // Blob-URL als Download-Ziel setzen
            link.href = blobUrl;

            // Dateiname für den Download festlegen
            link.download = filename;

            // Element ins DOM einfügen (bessere Kompatibilität)
            document.body.appendChild(link);

            // Klick wird programmgesteuert ausgelöst
            link.click();

            // Element wieder entfernen
            document.body.removeChild(link);

            // Speicher freigeben (Blob-URL löschen)
            window.URL.revokeObjectURL(blobUrl);

        } catch (err) {

            // Fehler beim Download ausgeben
            console.error("Download fehlgeschlagen:", err);
        }
    }

    return (
        <button
            onClick={() =>
                downloadImage(
                    photo?.src?.original,
                    `photo-${photo?.id}.jpg`
                )
            }
            className="w-10 h-10 rounded-full bg-black backdrop-blur-sm backdrop-filter bg-opacity-20 flex hover:scale-110 items-center justify-center"
        >
            <FiDownload size={18} className="text-white" />
        </button>
    )
}