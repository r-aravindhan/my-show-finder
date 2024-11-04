import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/MovieDetailsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../redux/actions";
import SeatSelection from "../components/SeatSelection";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === parseInt(movieId));

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [date, setDate] = useState(getTodayDate());
  const [showtime, setShowtime] = useState(movie.showtimes[0] || "");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (movie) {
      const occupied = movie.bookings
        .filter(
          (booking) => booking.date === date && booking.showtime === showtime,
        )
        .flatMap((booking) => booking.selectedSeats);
      setOccupiedSeats(occupied);
    }
  }, [date, showtime, movie]);

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBooking = () => {
    if (selectedSeats.length !== parseInt(numberOfTickets)) {
      setError(
        "Number of selected seats does not match the number of tickets!",
      );
      return;
    }

    const booking = {
      date,
      showtime,
      selectedSeats,
    };
    dispatch(addBooking(movie.id, booking));
    alert("Booking confirmed!");
    navigate("/my-show-finder/bookings");
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

      <SeatSelection
        onSeatSelect={handleSeatSelect}
        occupiedSeats={occupiedSeats}
      />

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

        <label htmlFor="numberOfTickets">Number of Tickets:</label>
        <input
          type="number"
          id="numberOfTickets"
          min="1"
          value={numberOfTickets}
          onChange={(e) => setNumberOfTickets(e.target.value)}
        />

        <button onClick={handleBooking}>Book Now</button>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default MovieDetailsPage;
