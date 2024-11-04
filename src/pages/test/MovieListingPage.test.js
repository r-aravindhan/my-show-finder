import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MovieListingPage from "../MovieListingPage";

const mockStore = configureStore();

describe("MovieListingPage Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      movies: [],
    });
  });

  test("renders loading message", () => {
    render(
      <Provider store={store}>
        <MovieListingPage />
      </Provider>,
    );

    expect(screen.getByTestId("loading-message")).toBeInTheDocument();
  });

  test("renders error message", () => {
    render(
      <Provider store={store}>
        <MovieListingPage />
      </Provider>,
    );
  });

  test("renders movie cards when movies are present", () => {
    const movies = [
      {
        id: 1,
        title: "Test Movie 1",
        genre: "Action",
      },
      {
        id: 2,
        title: "Test Movie 2",
        genre: "Comedy",
      },
    ];

    store = mockStore({
      movies,
    });

    render(
      <Provider store={store}>
        <MovieListingPage />
      </Provider>,
    );
  });
});
