import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../Layout";
import { UserProvider } from "../../context/UserContext";

describe("Layout Component", () => {
  test("renders Navbar and Outlet", () => {
    render(
      <UserProvider>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </UserProvider>,
    );

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();
  });
});
