import moviesData from "../mocks/movies.json";
import { ADD_BOOKING, CANCEL_BOOKING } from "./actions";

const initialState = { movies: moviesData.movies };

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return {
        ...state,
        movies: state.movies.map((movie) => {
          if (movie.id === action.payload.movieId) {
            const newBooking = {
              ...action.payload.booking,
              id: movie.bookings.length + 1,
            };
            return { ...movie, bookings: [...movie.bookings, newBooking] };
          }
          return movie;
        }),
      };
    case CANCEL_BOOKING:
      const { movieId, bookingId } = action.payload;
      return {
        ...state,
        movies: state.movies.map((movie) => {
          if (movie.id === movieId) {
            return {
              ...movie,
              bookings: movie.bookings.filter(
                (booking) => booking.id !== bookingId,
              ),
            };
          }
          return movie;
        }),
      };
    default:
      return state;
  }
};

export default moviesReducer;
