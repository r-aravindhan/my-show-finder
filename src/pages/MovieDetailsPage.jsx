import React, { useState } from "react";
import { useParams } from "react-router-dom";
import moviesData from "../mocks/movies.json";
import "../styles/MovieDetailsPage.css";
import { useDispatch } from "react-redux";
import { addBooking } from "../redux/actions";
import SeatSelection from "../components/SeatSelection";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const movie = moviesData.movies.find((m) => m.id === parseInt(movieId));

  const [date, setDate] = useState("");
  const [showtime, setShowtime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBooking = () => {
    const booking = {
      date,
      showtime,
      selectedSeats,
    };
    dispatch(addBooking(movie.id, booking));
    alert("Booking confirmed!");
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

      <SeatSelection onSeatSelect={handleSeatSelect} />

      <div className="booking-section">
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
