import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import BookingsPage from "../BookingsPage";
import rootReducer from "../../redux/reducers";

const renderWithStore = (initialState) => {
  const store = createStore(rootReducer, initialState);
  return render(
    <Provider store={store}>
      <BookingsPage />
    </Provider>,
  );
};

describe("BookingsPage Component", () => {
  const initialState = {
    movies: [
      {
        id: 1,
        title: "Mounam Pesiyathe",
        posterUrl: "images/poster/mounam_pesiyathe.jpg",
        bookings: [
          {
            id: 1,
            date: "2024-11-10",
            showtime: "7:00 PM",
            selectedSeats: ["A1", "A2"],
          },
        ],
      },
    ],
  };

  test("renders booking details correctly", () => {
    renderWithStore(initialState);

    expect(screen.getByText("Your Bookings")).toBeInTheDocument();
    expect(screen.getByText("Mounam Pesiyathe")).toBeInTheDocument();
    expect(screen.getByText("Date: 2024-11-10")).toBeInTheDocument();
    expect(screen.getByText("Showtime: 7:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Seats: A1, A2")).toBeInTheDocument();
  });

  test("shows no bookings message when there are no bookings", () => {
    const emptyState = {
      movies: [],
    };

    renderWithStore(emptyState);

    expect(screen.getByText("No bookings found!")).toBeInTheDocument();
  });
});
