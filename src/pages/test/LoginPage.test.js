import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import LoginPage from "../LoginPage";
import users from "../../mocks/users.json";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("LoginPage Component", () => {
  const setUsername = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockImplementation(() => mockNavigate);
  });

  test("renders login form", () => {
    render(
      <UserContext.Provider value={{ setUsername }}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    expect(screen.getByPlaceholderText("Email Id")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  test("shows error message for invalid email", async () => {
    render(
      <UserContext.Provider value={{ setUsername }}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    fireEvent.click(screen.getByText("Continue"));

    expect(await screen.findByText("Email is required!")).toBeInTheDocument();
  });

  test("shows error message for invalid password", async () => {
    render(
      <UserContext.Provider value={{ setUsername }}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText("Email Id"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByText("Continue"));

    expect(
      await screen.findByText("Password is required!"),
    ).toBeInTheDocument();
  });

  test("successful login navigates to movies page", async () => {
    render(
      <UserContext.Provider value={{ setUsername }}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText("Email Id"), {
      target: { value: users[0].emailId },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: users[0].password },
    });

    fireEvent.click(screen.getByText("Continue"));
  });

  test("shows error message for invalid credentials", async () => {
    render(
      <UserContext.Provider value={{ setUsername }}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </UserContext.Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText("Email Id"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Continue"));
  });
});
