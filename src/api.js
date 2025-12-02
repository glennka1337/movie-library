const API_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query) => {
  const res = await fetch(`${API_URL}?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${query}`);
  const data = await res.json();
  return data.Search || [];
};

export const getMovieDetails = async (id) => {
  const res = await fetch(`${API_URL}?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`);
  const data = await res.json();
  return data;
};
