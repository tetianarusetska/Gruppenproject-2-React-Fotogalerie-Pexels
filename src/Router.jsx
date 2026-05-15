import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import PhotoModal from "./pages/PhotoModal.jsx"
import Favorites from"./pages/Favorites.jsx"

export default function Router() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo/:id" element={<PhotoModal/>} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
    </>
  )
}