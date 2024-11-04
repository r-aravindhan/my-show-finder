import { useEffect, useState } from "react";
import "../styles/MovieListingPage.css";
import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";

function MovieListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = () => {
      fetch("http://localhost:3001/movies")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMovies();
  }, [dispatch]);

  const movies = useSelector((state) => state.movies);

  if (loading) return <p className="loading-message">Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = movie.genre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTitle || matchesGenre;
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search for a movie by title or genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="not-found">No matching movies found!</p>
        )}
      </div>
    </>
  );
}

export default MovieListingPage;
