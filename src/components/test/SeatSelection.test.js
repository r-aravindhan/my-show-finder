import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SeatSelection from "../SeatSelection";

describe("SeatSelection Component", () => {
  const mockOnSeatSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the seat selection grid", () => {
    render(<SeatSelection onSeatSelect={mockOnSeatSelect} />);

    const seats = screen.getAllByText(/^[A-Z]\d+$/);
    expect(seats).toHaveLength(140);
  });

  test("selects and deselects a seat", () => {
    render(<SeatSelection onSeatSelect={mockOnSeatSelect} />);

    const seat = screen.getByText("A1");
    fireEvent.click(seat);

    expect(seat).toHaveClass("selected");
    expect(mockOnSeatSelect).toHaveBeenCalledWith(["A1"]);

    fireEvent.click(seat);
    expect(seat).not.toHaveClass("selected");
    expect(mockOnSeatSelect).toHaveBeenCalledWith([]);
  });

  test("does not select an occupied seat", () => {
    render(
      <SeatSelection onSeatSelect={mockOnSeatSelect} occupiedSeats={["A1"]} />,
    );

    const occupiedSeat = screen.getByText("A1");
    fireEvent.click(occupiedSeat);

    expect(occupiedSeat).not.toHaveClass("selected");
    expect(mockOnSeatSelect).not.toHaveBeenCalled();
  });

  test("updates selected seats correctly with multiple selections", () => {
    render(<SeatSelection onSeatSelect={mockOnSeatSelect} />);

    const seatA1 = screen.getByText("A1");
    const seatA2 = screen.getByText("A2");

    fireEvent.click(seatA1);
    expect(seatA1).toHaveClass("selected");
    expect(mockOnSeatSelect).toHaveBeenCalledWith(["A1"]);

    fireEvent.click(seatA2);
    expect(seatA2).toHaveClass("selected");
    expect(mockOnSeatSelect).toHaveBeenCalledWith(["A1", "A2"]);

    fireEvent.click(seatA1);
    expect(seatA1).not.toHaveClass("selected");
    expect(mockOnSeatSelect).toHaveBeenCalledWith(["A2"]);
  });
});
