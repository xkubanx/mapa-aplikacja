import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("Marcinkowice");

  // Funkcja do generowania siatki 8x8
  const renderGrid = (size) => {
    const grid = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const isDark = (row + col) % 2 === 0; // Naprzemienne ciemne/jasne pola
        grid.push(
          <div
            key={`${row}-${col}`}
            className={`grid-cell ${isDark ? "dark" : "light"}`}
          />
        );
      }
    }
    return grid;
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <button
          className={`nav-button ${currentPage === "Marcinkowice" ? "active" : ""}`}
          onClick={() => setCurrentPage("Marcinkowice")}
        >
          Marcinkowice
        </button>
        <button
          className={`nav-button ${currentPage === "Stanowice" ? "active" : ""}`}
          onClick={() => setCurrentPage("Stanowice")}
        >
          Stanowice
        </button>
      </nav>

      <div className="content">
        {currentPage === "Marcinkowice" ? (
          <div className="page-container">
            <h1 className="page-title">Marcinkowice</h1>
            <img src="/Marcinkowice.png" alt="Marcinkowice" className="page-image" />
            <div className="grid-container">
              {renderGrid(8)} {/* Siatka 8x8 */}
            </div>
          </div>
        ) : (
          <div className="page-container">
            <h1 className="page-title">Stanowice</h1>
            <img src="/Stanowice.png" alt="Stanowice" className="page-image" />
            <div className="grid-container">
              {renderGrid(8)} {/* Siatka 8x8 */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
