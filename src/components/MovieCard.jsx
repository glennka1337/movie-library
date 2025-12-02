export default function MovieCard({ movie, onSelect, onFavorite, isFavorite }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://cdn.discordapp.com/attachments/315892732667232258/1430313222787043472/placeholder.png?ex=68f9527e&is=68f800fe&hm=bd355173c4abb552cde98173485e498a0ca7d9c2a6c513a180c520f2b01e2228&"}
        alt={movie.Title}
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      <div className="buttons">
        <button onClick={() => onSelect(movie.imdbID)}>Detaljer</button>
        <button onClick={() => onFavorite(movie)}>
          {isFavorite ? "★ Favorit" : "☆ Lägg till"}
        </button>
      </div>
    </div>
  );
}
