import React, { useState } from "react";
import "../styles/SeatSelection.css";

function SeatSelection({ totalRows = 5, seatsPerRow = 28, onSeatSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const generateSeats = () => {
    const seats = [];
    for (let row = 1; row <= totalRows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        seats.push(`${String.fromCharCode(64 + row)}${seat}`);
      }
    }
    return seats;
  };

  const handleSeatClick = (seatNumber) => {
    let updatedSeats;
    if (selectedSeats.includes(seatNumber)) {
      updatedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
    } else {
      updatedSeats = [...selectedSeats, seatNumber];
    }
    setSelectedSeats(updatedSeats);
    onSeatSelect(updatedSeats); // Use the updated array
  };

  return (
    <div className="seat-selection-container">
      <div className="screen">Screen</div>
      <div className="seat-grid">
        {generateSeats().map((seatNumber) => (
          <div
            key={seatNumber}
            className={`seat ${
              selectedSeats.includes(seatNumber) ? "selected" : ""
            }`}
            onClick={() => handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatSelection;
