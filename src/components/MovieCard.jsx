import React from "react";
import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={require(`../${movie.posterUrl}`)}
        alt={movie.title}
      />
      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">Genre: {movie.genre}</p>
        <p className="movie-rating">Rating: {movie.rating}</p>
        <Link
          to={`/my-show-finder/movies/${movie.id}`}
          className="view-details-button"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
