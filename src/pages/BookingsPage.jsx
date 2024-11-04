import { useSelector, useDispatch } from "react-redux";
import "../styles/BookingsPage.css";
import { cancelBooking } from "../redux/actions";
import MovieCard from "../components/MovieCard";

function BookingsPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);

  const moviesWithBookings = movies.filter(
    (movie) => movie.bookings && movie.bookings.length > 0,
  );

  const handleCancelBooking = (movieId, bookingId) => {
    dispatch(cancelBooking(movieId, bookingId));
  };

  return (
    <div className="bookings-page">
      <h2>Your Bookings</h2>
      <div className="booking-list">
        {moviesWithBookings.length === 0 ? (
          <p>No bookings found!</p>
        ) : (
          moviesWithBookings.map((movie) =>
            movie.bookings.map((booking) => (
              <MovieCard
                key={booking.id}
                movie={movie}
                bookingDetails={{
                  date: booking.date,
                  showtime: booking.showtime,
                  seats: booking.selectedSeats,
                  onCancel: () => handleCancelBooking(movie.id, booking.id),
                }}
              />
            )),
          )
        )}
      </div>
    </div>
  );
}

export default BookingsPage;
