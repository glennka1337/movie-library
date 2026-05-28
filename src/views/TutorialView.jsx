import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";
import Favorites from "../components/Favorites";
import { searchMovies } from "../api";

const sampleMovies = [
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster: "N/A",
  },
  {
    imdbID: "tt3896198",
    Title: "Guardians of the Galaxy Vol. 2",
    Year: "2017",
    Poster: "https://upload.wikimedia.org/wikipedia/en/3/32/Guardians_of_the_Galaxy_Vol._2_poster.jpg",
  },
  {
    imdbID: "tt0816692",
    Title: "Interstellar",
    Year: "2014",
    Poster: "N/A",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "N/A",
  },
  {
    imdbID: "tt0120737",
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Year: "2001",
    Poster: "N/A",
  },
];

export default function TutorialView() {
  const [moviesDemo, setMoviesDemo] = useState([]);
  const [favoritesDemo, setFavoritesDemo] = useState([sampleMovies[0]]);
  const [selectedDemo, setSelectedDemo] = useState(null);

  const getVisibleMovies = (movies) =>
    movies.filter((movie) => movie.Poster && movie.Poster !== "N/A").slice(0, 3);

  useEffect(() => {
    const loadDefaultMovies = async () => {
      const results = await searchMovies("star");
      setMoviesDemo(getVisibleMovies(results));
    };

    void loadDefaultMovies();
  }, []);

  const handleSearchDemo = async (query) => {
    const q = query.trim();
    if (!q) return;

    const results = await searchMovies(q);
    setMoviesDemo(getVisibleMovies(results));
  };

  const handleFavoriteDemo = (movie) => {
    const isFav = favoritesDemo.some((f) => f.imdbID === movie.imdbID);
    setFavoritesDemo(
      isFav
        ? favoritesDemo.filter((f) => f.imdbID !== movie.imdbID)
        : [...favoritesDemo, movie]
    );
  };

  const codeSearchBar = `
import SearchBar from "./components/SearchBar";

function Example() {
  const onSearch = (query) => {
    // Anropa API eller filtrera lokalt
    console.log("Sök:", query);
  };
  return <SearchBar onSearch={onSearch} />;
}
`.trim();

  const codeMovieCard = `
import MovieCard from "./components/MovieCard";

<MovieCard
  movie={{ imdbID: "tt0133093", Title: "The Matrix", Year: "1999", Poster: "N/A" }}
  onSelect={(id) => console.log("Vald:", id)}
  onFavorite={(movie) => console.log("Favorit:", movie)}
  isFavorite={false}
/>
`.trim();

  const codeMovieList = `
import MovieList from "./components/MovieList";

<MovieList
  movies={movies}
  onSelect={(id) => console.log("Vald:", id)}
  onFavorite={(movie) => console.log("Favorit:", movie)}
  favorites={favorites}
/>
`.trim();

  const codeMovieDetails = `
import MovieDetails from "./components/MovieDetails";

// Kräver OMDb API-nyckel i \`.env\` som \`VITE_OMDB_API_KEY\`
<MovieDetails
  movieId={"tt3896198"}
  onClose={() => setSelected(null)}
/>
`.trim();

  const codeFavorites = `
import Favorites from "./components/Favorites";

<Favorites
  favorites={favorites}
  onSelect={(id) => console.log("Vald:", id)}
  onFavorite={(movie) => console.log("Favorit:", movie)}
/>
`.trim();

  return (
    <div className="tutorial-view" style={{ padding: "1rem" }}>
      <h1>Komponent-bibliotekets Tutorial</h1>
      <p>Här ser du en kort beskrivning, kodexempel, och live-rendering av varje komponent.</p>

      <hr />

      <section>
        <h2>SearchBar</h2>
        <p>En enkel sökkomponent som anropar <code>onSearch(query)</code> vid submit.</p>
        <h3>Kodexempel</h3>
        <pre><code>{codeSearchBar}</code></pre>
        <h3>Live</h3>
        <SearchBar onSearch={handleSearchDemo} />
      </section>

      <hr />

      <section>
        <h2>MovieCard</h2>
        <p>Kort för en film med bild, titel, år, och knappar för detaljer/favorit.</p>
        <h3>Kodexempel</h3>
        <pre><code>{codeMovieCard}</code></pre>
        <h3>Live</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <MovieCard
            movie={sampleMovies[0]}
            onSelect={setSelectedDemo}
            onFavorite={handleFavoriteDemo}
            isFavorite={favoritesDemo.some((f) => f.imdbID === sampleMovies[0].imdbID)}
          />
          <MovieCard
            movie={sampleMovies[1]}
            onSelect={setSelectedDemo}
            onFavorite={handleFavoriteDemo}
            isFavorite={favoritesDemo.some((f) => f.imdbID === sampleMovies[1].imdbID)}
          />
        </div>
      </section>

      <hr />

      <section>
        <h2>MovieList</h2>
        <p>Renderar en lista av <code>MovieCard</code> med favoritstatus markerad.</p>
        <h3>Kodexempel</h3>
        <pre><code>{codeMovieList}</code></pre>
        <h3>Live</h3>
        <MovieList
          movies={moviesDemo}
          onSelect={setSelectedDemo}
          onFavorite={handleFavoriteDemo}
          favorites={favoritesDemo}
        />
      </section>

      <hr />

      <section>
        <h2>MovieDetails</h2>
        <p>Hämtar detaljer via OMDb baserat på <code>movieId</code>. Kräver <code>VITE_OMDB_API_KEY</code> i <code>.env</code>.</p>
        <h3>Kodexempel</h3>
        <pre><code>{codeMovieDetails}</code></pre>
        <h3>Live</h3>
        {!selectedDemo && (
          <div style={{ marginBottom: "0.5rem" }}>
            <button onClick={() => setSelectedDemo("tt3896198")}>
              Visa detaljer (exempel-ID)
            </button>
          </div>
        )}
        {selectedDemo ? (
          <MovieDetails movieId={selectedDemo} onClose={() => setSelectedDemo(null)} />
        ) : (
          <p>Välj en film ovan eller klicka på knappen för exempel.</p>
        )}
      </section>

      <hr />

      <section>
        <h2>Favorites</h2>
        <p>Visar användarens favoritfilmer med möjlighet att öppna detaljer.</p>
        <h3>Kodexempel</h3>
        <pre><code>{codeFavorites}</code></pre>
        <h3>Live</h3>
        <Favorites
          favorites={favoritesDemo}
          onSelect={setSelectedDemo}
          onFavorite={handleFavoriteDemo}
        />
      </section>
    </div>
  );
}