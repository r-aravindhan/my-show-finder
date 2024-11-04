export const SET_BOOKING = "SET_BOOKING";
export const ADD_BOOKING = "ADD_BOOKING";
export const CANCEL_BOOKING = "CANCEL_BOOKING";

export const setMovies = (movies) => ({
  type: SET_BOOKING,
  payload: { movies },
});

export const addBooking = (movieId, booking) => ({
  type: ADD_BOOKING,
  payload: { movieId, booking },
});

export const cancelBooking = (movieId, bookingId) => ({
  type: CANCEL_BOOKING,
  payload: { movieId, bookingId },
});
