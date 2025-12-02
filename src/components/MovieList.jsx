import MovieCard from "./MovieCard";

export default function MovieList({ movies, onSelect, onFavorite, favorites }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelect={onSelect}
          onFavorite={onFavorite}
          isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
        />
      ))}
    </div>
  );
}
