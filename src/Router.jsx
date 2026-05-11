import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import PhotoDetail from "./pages/PhotoDetail.jsx"

export default function Router() {

  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/foto" element={<PhotoDetail />} />

      </Routes>
    </>
  )
}