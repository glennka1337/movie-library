import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import { searchMovies } from "./api";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const handleSearch = async (query) => {
    const results = await searchMovies(query);
    setMovies(results);
  };

  const handleFavorite = (movie) => {
    const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);
    const updated = isFav
      ? favorites.filter((f) => f.imdbID !== movie.imdbID)
      : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="app-container">
      <h1>Movie Library</h1>
      <SearchBar onSearch={handleSearch} />

      {selectedMovieId ? (
        <MovieDetails
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      ) : (
        <>
          <MovieList
            movies={movies}
            onSelect={setSelectedMovieId}
            onFavorite={handleFavorite}
            favorites={favorites}
          />
          <Favorites
            favorites={favorites}
            onSelect={setSelectedMovieId}
            onFavorite={handleFavorite}
          />
        </>
      )}
    </div>
  );
}
