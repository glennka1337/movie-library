export default function MovieCard({ movie, onSelect, onFavorite, isFavorite }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://cdn.discordapp.com/attachments/315892732667232258/1430313222787043472/placeholder.png?ex=6a19623e&is=6a1810be&hm=756ede7a3164b2e3622f1aa41d47798fabbe42cc973da210edc2fc7c52666bbb&"}
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
