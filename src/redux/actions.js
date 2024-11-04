export const ADD_BOOKING = "ADD_BOOKING";
export const CANCEL_BOOKING = "CANCEL_BOOKING";

export const addBooking = (movieId, booking) => ({
  type: ADD_BOOKING,
  payload: { movieId, booking },
});

export const cancelBooking = (movieId, bookingId) => ({
  type: CANCEL_BOOKING,
  payload: { movieId, bookingId },
});
