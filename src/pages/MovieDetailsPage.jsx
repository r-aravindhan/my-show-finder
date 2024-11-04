import React, { useState } from "react";
import { useParams } from "react-router-dom";
import moviesData from "../mocks/movies.json";
import "../styles/MovieDetailsPage.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const movie = moviesData.movies.find((m) => m.id === parseInt(movieId));

  const [tickets, setTickets] = useState(1);
  const [date, setDate] = useState("");
  const [showtime, setShowtime] = useState("");

  const handleBooking = () => {
    // Implement booking logic
    alert(
      `Booking ${tickets} tickets for ${movie.title} at ${showtime} on ${date}`,
    );
  };

  return (
    <div className="movie-view-details">
      <img
        className="movie-timeline"
        src={require(`../${movie.timelineUrl}`)}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      <p>
        <strong>Cast:</strong> {movie.cast}
      </p>
      <p>
        <strong>Music:</strong> {movie.music}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Duration:</strong> {movie.duration}
      </p>

      <div className="booking-section">
        <label htmlFor="tickets">Number of Tickets:</label>
        <select
          id="tickets"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="showtime">Showtime:</label>
        <select
          id="showtime"
          value={showtime}
          onChange={(e) => setShowtime(e.target.value)}
        >
          {movie.showtimes.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>

        <button onClick={handleBooking}>Book Now</button>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
