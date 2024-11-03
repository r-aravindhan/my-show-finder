export const fetchMovies = () => {
  return {
    type: "FETCH_MOVIES",
    payload: [
      // Mock movies data
      {
        id: 1,
        title: "Inception",
        genre: "Science Fiction",
        rating: 8.8,
        poster: "/path/to/inception.jpg",
      },
      // More movie objects
    ],
  };
};

export const bookTicket = (bookingDetails) => ({
  type: "BOOK_TICKET",
  payload: bookingDetails,
});

export const cancelBooking = (bookingId) => ({
  type: "CANCEL_BOOKING",
  payload: bookingId,
});
