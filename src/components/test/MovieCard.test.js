import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieCard from "../MovieCard";

describe("MovieCard Component", () => {
  const movie = {
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
  };

  test("renders movie details correctly", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );

    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(`Genre: ${movie.genre}`)).toBeInTheDocument();
    expect(screen.getByText(`Rating: ${movie.rating}`)).toBeInTheDocument();

    const viewDetailsLink = screen.getByText("View Details");
    expect(viewDetailsLink).toBeInTheDocument();
  });

  test("renders booking details correctly", () => {
    const bookingDetails = {
      date: "2024-11-10",
      showtime: "7:00 PM",
      seats: ["A1", "A2"],
      onCancel: jest.fn(),
    };

    render(
      <MemoryRouter>
        <MovieCard movie={movie} bookingDetails={bookingDetails} />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(`Date: ${bookingDetails.date}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Showtime: ${bookingDetails.showtime}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Seats: ${bookingDetails.seats.join(", ")}`),
    ).toBeInTheDocument();

    const cancelButton = screen.getByText("Cancel Booking");
    expect(cancelButton).toBeInTheDocument();

    cancelButton.click();
    expect(bookingDetails.onCancel).toHaveBeenCalled();
  });
});
