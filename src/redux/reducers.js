import moviesData from "../mocks/movies.json";
import { ADD_BOOKING } from "./actions";

const initialState = moviesData.movies;

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return state.map((movie) => {
        if (movie.id === action.payload.movieId) {
          const newBooking = {
            ...action.payload.booking,
            id: movie.bookings.length + 1,
          };
          return { ...movie, bookings: [...movie.bookings, newBooking] };
        }
        return movie;
      });
    default:
      return state;
  }
};

export default moviesReducer;
