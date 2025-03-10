import React, { useState } from "react";
import MarcinkowiceImage from "./Marcinkowice.png";
import StanowiceImage from "./Stanowice.png";
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
            <img src={MarcinkowiceImage} alt="Marcinkowice" className="page-image" />
          </div>
        ) : (
          <div>
            <h1 className="page-title">Stanowice</h1>
            <img src={StanowiceImage} alt="Stanowice" className="page-image" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
