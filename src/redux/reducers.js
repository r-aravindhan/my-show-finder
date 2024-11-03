const initialState = {
  movies: [],
  bookings: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIES":
      return { ...state, movies: action.payload };
    case "BOOK_TICKET":
      return { ...state, bookings: [...state.bookings, action.payload] };
    case "CANCEL_BOOKING":
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;
