import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../NavBar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Navbar Component", () => {
  const mockUsername = "John Doe";
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockImplementation(() => mockNavigate);
  });

  test("renders Navbar with username", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ username: mockUsername }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText(`Welcome ${mockUsername}`)).toBeInTheDocument();
  });

  test("toggles the menu dropdown", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ username: mockUsername }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Movies")).not.toBeInTheDocument();

    const menuIcon = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(menuIcon);

    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("Bookings")).toBeInTheDocument();
  });

  test("toggles the profile dropdown and logs out", () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ username: mockUsername }}>
          <Navbar />
        </UserContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Logout")).not.toBeInTheDocument();

    const profileIcon = screen.getByRole("button", { name: /profile/i });
    fireEvent.click(profileIcon);

    expect(screen.getByText("Logout")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Logout"));
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
