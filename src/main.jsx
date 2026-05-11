import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Contexts from './components/Contexts.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contexts>
      <App />
    </Contexts>
  </StrictMode>
)
