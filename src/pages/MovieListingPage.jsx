import { useEffect, useState } from "react";
import moviesData from "../mocks/movies.json";
import "../styles/MovieListingPage.css";
import MovieCard from "../components/MovieCard";

function MovieListingPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(moviesData.movies);
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieListingPage;
