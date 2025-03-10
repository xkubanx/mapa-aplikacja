import React, { useState } from "react";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("Marcinkowice");

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
          <div>
            <h1 className="page-title">Marcinkowice</h1>
            {/* Zmieniamy ścieżkę do zdjęcia */}
            <img src="/Marcinkowice.png" alt="Marcinkowice" className="page-image" />
          </div>
        ) : (
          <div>
            <h1 className="page-title">Stanowice</h1>
            {/* Zmieniamy ścieżkę do zdjęcia */}
            <img src="/Stanowice.png" alt="Stanowice" className="page-image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
