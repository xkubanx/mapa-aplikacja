import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [squares, setSquares] = useState([]);
  const [currentSquare, setCurrentSquare] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ address: '', items: '' });
  const [map, setMap] = useState('Marcinkowice'); // Domyślnie wybrana mapa Marcinkowice
  const [showMessage, setShowMessage] = useState(true); // Stan pokazujący komunikat

  // Funkcja do obliczenia pozycji i stworzenia siatki
  const createGrid = (rows, cols, imageWidth, imageHeight) => {
    const squareWidth = imageWidth / cols;
    const squareHeight = imageHeight / rows;
    const grid = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        grid.push({
          row,
          col,
          x: col * squareWidth,
          y: row * squareHeight,
          width: squareWidth,
          height: squareHeight,
        });
      }
    }

    return grid;
  };

  // Ustalamy wymiary mapy w zależności od wybranej mapy
const imageDimensions = {
  Marcinkowice: { width: 840, height: 794 },
  Stanowice: { width: 787, height: 386 },  // Możesz tu zmienić wymiary dla Stanowic
};

const imageWidth = imageDimensions[map].width;
const imageHeight = imageDimensions[map].height;

  // Określamy liczbę wierszy i kolumn
  const rows = map === 'Stanowice' ? 5 : 10;  // Dla Stanowic 5 rzędów, dla Marcinkowic 15
const cols = map === 'Stanowice' ? 10 : 10; // Dla Stanowic 10 kolumn, dla Marcinkowic 15


  // Tworzymy siatkę na mapie
  const [grid, setGrid] = useState(createGrid(rows, cols, imageWidth, imageHeight));

  useEffect(() => {
    setGrid(createGrid(rows, cols, imageWidth, imageHeight));
  }, [map, imageWidth, imageHeight]);
  

  // Funkcja do obsługi kliknięcia w kwadrat
const handleSquareClick = (row, col) => {
  if (currentSquare && currentSquare.row === row && currentSquare.col === col) {
    setShowModal(false);
    setCurrentSquare(null);
    // Resetujemy dane formularza, gdy modal jest zamykany
    setFormData({ address: '', items: '' });
  } else {
    setCurrentSquare({ row, col });
    setShowModal(true);
  }
};

// Funkcja do anulowania wprowadzonych danych
const handleCancel = () => {
  // Resetujemy dane formularza przy anulowaniu
  setFormData({ address: '', items: '' });
  setShowModal(false);
};


  // Funkcja do zapisania danych w formie CSV
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const squareLabel = `${map}_${String.fromCharCode(65 + currentSquare.col)}${currentSquare.row + 1}`; // Dodajemy nazwę mapy przed numeracją
    const address = formData.address || '';  // Jeśli adres nie jest podany, ustawiamy pusty ciąg
    const items = formData.items || '';      // Jeśli rzeczy nie są podane, ustawiamy pusty ciąg
    const newData = `${squareLabel},${address},${items}`;

    let csvData = [];
    const existingData = localStorage.getItem('csvData');
    if (existingData) {
      csvData = JSON.parse(existingData);
    }

    csvData.push(newData);
    localStorage.setItem('csvData', JSON.stringify(csvData));

    setFormData({ address: '', items: '' });
    setShowModal(false);
  };

  const handleDownloadCSV = () => {
    const csvData = JSON.parse(localStorage.getItem('csvData') || '[]');
    const csv = csvData.join('\n');
    
    // Tworzenie pliku CSV z poprawnym kodowaniem UTF-8 za pomocą TextEncoder
    const encoder = new TextEncoder();
    const encodedCsv = encoder.encode(csv); // Kodujemy dane jako UTF-8
    const blob = new Blob([encodedCsv], { type: 'text/csv;charset=utf-8;' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Funkcja do przełączania mapy
  const changeMap = (mapName) => {
    setMap(mapName);
    const newRows = mapName === 'Stanowice' ? 5 : 10;
    const newCols = mapName === 'Stanowice' ? 10 : 10;
    setGrid(createGrid(newRows, newCols, imageWidth, imageHeight)); // Odświeżamy siatkę
  };
  

  // Wybór mapy w zależności od wybranego przycisku
  const mapSrc = map === 'Marcinkowice' ? '/Marcinkowice.png' : '/Stanowice.png';

  // Funkcja do wyłączenia komunikatu powitalnego
  const handleMessageClose = () => {
    setShowMessage(false);
  };

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {/* Komunikat powitalny */}
      {showMessage && (
  <div className="welcome-message" style={{
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 10,
    textAlign: 'center',
  }}>
    Odnajdź pole w którym znajdują się śmieci -> Kliknij w wybrany prostokąt -> wprowadź przybliżony adres -> wprowadź rzeczy które są do zabrania oraz ich ilość <strong>PO SPACJI NIE UŻYWAJ PRZECINKÓW.</strong> 
      <br />
      <br />

      <strong>WAŻNE: NIE UŻYWAJ POLSKICH ZNAKÓW!</strong>
    
      <br />  {/* Dodaj ten znacznik, aby przenieść przycisk do nowej linijki */}
<button 
  onClick={handleMessageClose} 
  style={{
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  }}
>
  OK
</button>

  </div>
)}


      {/* Przyciski do przełączania map */}
      <div className="map-select" style={{ marginBottom: '40px' }}>
        <button onClick={() => changeMap('Marcinkowice')} style={{ marginRight: '15px' }}>Marcinkowice</button>
        <button onClick={() => changeMap('Stanowice')}>Stanowice</button>
      </div>

      {/* Kontener na mapę i siatkę */}
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        {/* Kolumna numerów wierszy po lewej stronie */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '10px', height: imageHeight }}>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} style={{ fontSize: '14px', fontWeight: 'bold', height: `${imageHeight / rows}px`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {rowIndex + 1}
            </div>
          ))}
        </div>

        {/* Mapa */}
        <div style={{ position: 'relative' }}>
        <img
  src={mapSrc}
  alt="Map"
  style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
/>


          {/* Siatka */}
          <div
            className="grid-container"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              zIndex: 1,
            }}
          >
            {/* Kwadraty w siatce */}
{grid.map((square, index) => (
  <div
    key={index}
    onClick={() => handleSquareClick(square.row, square.col)}
    style={{
      border: '1px solid rgba(0, 0, 0, 0.3)',
      backgroundColor: 'transparent',
      position: 'absolute',
      top: `${square.y}px`,
      left: `${square.x}px`,
      width: `${square.width}px`,
      height: `${square.height}px`,
      pointerEvents: 'auto',
      transition: 'all 0.3s ease', // Płynna animacja przejścia
    }}
  />
))}

          </div>
        </div>

        {/* Kolumna numerów kolumn po górnej stronie */}
        <div style={{ position: 'absolute', top: '-30px', left: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={`col-${colIndex}`} style={{ fontSize: '14px', fontWeight: 'bold', width: `${imageWidth / cols}px`, textAlign: 'center' }}>
              {String.fromCharCode(65 + colIndex)}
            </div>
          ))}
        </div>
      </div>

      {/* Modal do wprowadzania danych */}
      {showModal && (
        <div className="modal" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          zIndex: 2,
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          }}>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Adres"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input
                type="text"
                placeholder="Rzeczy do zabrania oraz ilość"
                value={formData.items}
                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                style={{ padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button type="submit" style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>Zapisz</button>
              <button
  type="button"
  onClick={handleCancel} // Zmieniamy tutaj funkcję na handleCancel
  style={{
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }}
>
  Anuluj
</button>

            </form>
          </div>
        </div>
      )}

      {/* Przycisk do pobierania pliku CSV */}
      <button onClick={handleDownloadCSV} style={{
        padding: '10px 20px',
        backgroundColor: '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}>Pobierz dane CSV</button>
    </div>
  );
};

export default App;
