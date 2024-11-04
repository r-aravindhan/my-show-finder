import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MovieDetailsPage from "../MovieDetailsPage";

const mockStore = configureStore();
const store = mockStore({
  movies: [
    {
      id: 1,
      title: "Mounam Pesiyathe",
      description:
        "A man's attitude towards women and love starts to change after he develops feelings for a woman.",
      genre: "Romance",
      rating: "7.8",
      posterUrl: "images/poster/mounam_pesiyathe.jpg",
      timelineUrl: "images/timeline/mounam_pesiyathe_timeline.jpg",
      cast: "Suriya, Trisha, Nandha, Laila",
      music: "Yuvan shankar raja",
      director: "Ameer sultan",
      duration: "2h 28m",
      showtimes: ["10:00 AM", "02:00 PM", "06:35 PM", "10:20 PM"],
      bookings: [],
    },
  ],
});

jest.mock("../../redux/actions", () => ({
  addBooking: jest.fn(),
}));

describe("MovieDetailsPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders movie details", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movies/1"]}>
          <Routes>
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Mounam Pesiyathe")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A man's attitude towards women and love starts to change after he develops feelings for a woman.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Romance")).toBeInTheDocument();
    expect(screen.getByText("7.8")).toBeInTheDocument();
  });

  test("selects seats and validates booking", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movies/1"]}>
          <Routes>
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText("Number of Tickets:"), {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByText("Book Now"));
  });

  test("shows error for mismatched tickets and seats", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/movies/1"]}>
          <Routes>
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText("Number of Tickets:"), {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByText("Book Now"));

    expect(
      await screen.findByText(
        "Number of selected seats does not match the number of tickets!",
      ),
    ).toBeInTheDocument();
  });
});
