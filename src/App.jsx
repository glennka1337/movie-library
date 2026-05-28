import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import { searchMovies } from "./api";
import TutorialView from "./views/TutorialView";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [showTutorial, setShowTutorial] = useState(false);

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
      <div className="nav" style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button onClick={() => setShowTutorial(false)}>App</button>
        <button onClick={() => setShowTutorial(true)}>Tutorial</button>
      </div>
      {showTutorial ? (
        <TutorialView />
      ) : (
      <>
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
     </>
     )}
     </div>
   );
 }
