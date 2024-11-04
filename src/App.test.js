import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the LoginPage component", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Email Id/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Continue/i)).toBeInTheDocument();
});

test("renders the main layout and app structure", () => {
  render(<App />);
  expect(screen.getByText(/My Show Finder/i)).toBeInTheDocument();
});
