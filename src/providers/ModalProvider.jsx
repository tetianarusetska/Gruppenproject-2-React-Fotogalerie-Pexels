import { useContext, useState } from 'react'
import ModalContext from '../contexts/ModalContext.js'


export function ModalProvider({ children }) {

  // Zustand für das aktuell ausgewählte Foto (null = kein Foto geöffnet)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Foto öffnen: setzt das ausgewählte Foto im Zustand
  const openPhoto = (photo) => setSelectedPhoto(photo)

  // Foto schließen: setzt den Zustand auf null zurück
  const closePhoto = () => setSelectedPhoto(null)

  return (
    // Kontext wird mit den Werten und Funktionen an alle Kinder weitergegeben
    <ModalContext.Provider value={{ selectedPhoto, openPhoto, closePhoto }}>
      {children}
    </ModalContext.Provider>
  )
}

// Benutzerdefinierter Hook für den einfachen Zugriff auf den Foto-Kontext
export function usePhoto() {
  return useContext(ModalContext)
}