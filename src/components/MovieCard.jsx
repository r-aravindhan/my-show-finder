import React from "react";
import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

function MovieCard({ movie, bookingDetails }) {
  return (
    <div className="movie-card">
      <img
        className="movie-poster"
        src={require(`../${movie.posterUrl}`)}
        alt={movie.title}
      />
      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        {bookingDetails ? (
          <>
            <p>Date: {bookingDetails.date}</p>
            <p>Showtime: {bookingDetails.showtime}</p>
            <p>Seats: {bookingDetails.seats?.join(", ")}</p>
            <button
              className="view-cancel-button"
              onClick={bookingDetails.onCancel}
            >
              Cancel Booking
            </button>
          </>
        ) : (
          <>
            <p>Genre: {movie.genre}</p>
            <p>Rating: {movie.rating}</p>
            <Link
              to={`/my-show-finder/movies/${movie.id}`}
              className="view-cancel-button"
            >
              View Details
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
