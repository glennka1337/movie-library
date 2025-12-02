import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function Favorites({ favorites, onSelect, onFavorite }) {
  return (
    <div className="favorites">
      <h2>Favoriter</h2>
      {favorites.length === 0 ? (
        <p>Inga favoriter ännu.</p>
      ) : (
        <div className="movie-list">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onSelect={onSelect}
              onFavorite={onFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
