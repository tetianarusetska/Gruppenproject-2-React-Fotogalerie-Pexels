import SearchPexel from "../components/SearchPexel";
import ThemedButton from "../components/ThemedButton.jsx"
import Header from "../components/Header.jsx";

function Home() {
  return (
    <main>
      <Header />
      <h1>Pexels Galerie</h1>
      <ThemedButton />
      <SearchPexel />
    </main>
  );
}

export default Home