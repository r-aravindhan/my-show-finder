import { useState } from "react";
import "../styles/MovieListingPage.css";
import MovieCard from "../components/MovieCard";
import { useSelector } from "react-redux";

function MovieListingPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const movies = useSelector((state) => state.movies);

  const filteredMovies = movies.filter(movie => {
    const matchesTitle = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
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
