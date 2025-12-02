import { useEffect, useState } from "react";
import { getMovieDetails } from "../api";

export default function MovieDetails({ movieId, onClose }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movieId) {
      getMovieDetails(movieId).then(setMovie);
    }
  }, [movieId]);

  if (!movie) return <p>Laddar...</p>;

  return (
    <div className="movie-details">
      <button onClick={onClose}>⬅ Tillbaka</button>
      <h2>{movie.Title}</h2>
      <p><strong>År:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
}
