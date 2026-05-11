import SearchPexel from "../components/SearchPexel";
import ThemedButton from "../components/ThemedButton.jsx"
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";

function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ThemedButton />
      <SearchPexel />
    </main>
  );
}

export default Home