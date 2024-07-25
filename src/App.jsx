import React, { useState } from 'react';
import './App.css';
import RandomTable from './components/RandomTable';

//fonts
import "./fonts/caslon-antique.regular.ttf";

function App() {
  const [tables, setTables] = useState([]);

  const handleButtonClick = () => {
    const diceAmount = parseInt(prompt('Enter dice amount:'), 10);
    const dieValue = parseInt(prompt('Enter die value:'), 10);
    const enteredTableLabel = prompt('Enter the name for your table:');

    if (!isNaN(diceAmount) && !isNaN(dieValue)) {
      setTables([...tables, { diceAmount, dieValue, tableLabel: enteredTableLabel }]);
    } else {
      alert('Please enter valid numbers.');
    }
  };

  const handleRemoveTable = (index) => {
    setTables(tables.filter((_, i) => i !== index));
  };

  return (
    <div className="App flex flex-col min-h-screen">
      <main className="flex-grow p-4">
        {tables.map((table, index) => (
          <RandomTable
            key={index}
            diceAmount={table.diceAmount}
            dieValue={table.dieValue}
            onRemove={() => handleRemoveTable(index)}
            tableLabel={table.tableLabel}
          />
        ))}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 text-center">
        <button
          onClick={handleButtonClick}
          className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        >
          Generate Table
        </button>
      </footer>
    </div>
  );
}

export default App;
