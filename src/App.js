import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentSquare, setCurrentSquare] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ address: '', items: '' });
  const [map, setMap] = useState('Marcinkowice');
  const [showMessage, setShowMessage] = useState(true);

  const imageDimensions = {
    Marcinkowice: { width: 840, height: 794 },
    Stanowice: { width: 787, height: 386 },
  };

  const imageWidth = imageDimensions[map].width;
  const imageHeight = imageDimensions[map].height;
  const rows = map === 'Stanowice' ? 5 : 10;
  const cols = 10;

  const handleSquareClick = (row, col) => {
    setCurrentSquare({ row, col });
    setShowModal(true);
  };

  const handleCancel = () => {
    setFormData({ address: '', items: '' });
    setShowModal(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormData({ address: '', items: '' });
    setShowModal(false);
  };

  const mapSrc = map === 'Marcinkowice' ? '/Marcinkowice.png' : '/Stanowice.png';

  const handleMessageClose = () => setShowMessage(false);

  const changeMap = (mapName) => setMap(mapName);

  return (
    <div className="App">
      {showMessage && (
        <div className="welcome-message">
          <p>
            Odnajdź pole z śmieciami -> Kliknij -> Wprowadź adres i rzeczy
            <br />
            <strong>Nie używaj polskich znaków!</strong>
          </p>
          <button onClick={handleMessageClose}>OK</button>
        </div>
      )}

      <div className="map-select">
        <button onClick={() => changeMap('Marcinkowice')}>Marcinkowice</button>
        <button onClick={() => changeMap('Stanowice')}>Stanowice</button>
      </div>

      <div className="map-container">
        <div className="grid-overlay">
          {Array.from({ length: rows * cols }).map((_, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            return (
              <div
                key={index}
                className="grid-square"
                onClick={() => handleSquareClick(row, col)}
              ></div>
            );
          })}
        </div>

        <img
          src={mapSrc}
          alt="Map"
          className="map-image"
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        <div className="column-headers">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={`col-${colIndex}`} className="column-header">
              {String.fromCharCode(65 + colIndex)}
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              Dane dla pola{' '}
              {`${String.fromCharCode(65 + currentSquare.col)}${currentSquare.row + 1}`}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Adres"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="Rzeczy do zabrania"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
              />
              <button type="submit">Zapisz</button>
              <button type="button" onClick={handleCancel}>
                Anuluj
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
