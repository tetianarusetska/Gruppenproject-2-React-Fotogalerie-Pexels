import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import ModeProvider from './providers/ModeProvider.jsx'
import { ModalProvider } from './providers/ModalProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <ModalProvider>
        <App />
        </ModalProvider>
      </ModeProvider>
    </BrowserRouter>
  </StrictMode>
)
