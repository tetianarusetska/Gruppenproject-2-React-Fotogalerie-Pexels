import SearchPexel from "../components/SearchPexel"
import ThemedButton from "../components/ThemedButton.jsx"
import Header from "../components/Header.jsx"
import Hero from "../components/Hero.jsx"
import PhotoModal from "./PhotoModal.jsx"

function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ThemedButton />
      <SearchPexel />
      <PhotoModal />
    </main>
  );
}

export default Home