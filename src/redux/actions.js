export const ADD_BOOKING = "ADD_BOOKING";

export const addBooking = (movieId, booking) => ({
  type: ADD_BOOKING,
  payload: { movieId, booking },
});
