import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import PhotoModal from "./pages/PhotoModal.jsx"

export default function Router() {

  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/photo/:id" element={<PhotoModal/>} />

      </Routes>
    </>
  )
}