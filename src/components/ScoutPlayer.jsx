// src/components/ScoutPlayer.jsx
import React, { useState } from 'react';

const ScoutPlayer = () => {
  const [giocatore, setGiocatore] = useState('#1');
  const [partita, setPartita] = useState('');
  const [azioni, setAzioni] = useState([]);

  const handleSelezionaGiocatore = (e) => {
    setGiocatore(e.target.value);
  };

  const handleSelezionaPartita = (e) => {
    setPartita(e.target.value);
  };

  const handleAggiungiAzione = () => {
    if (!giocatore || !partita) return alert('Seleziona giocatore e partita');
    setAzioni((prev) => [...prev, { giocatore, partita, azione: 'Servizio', punteggio: '++' }]);
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Statistiche Giocatore</h2>

      <div className="mb-4">
        <select
          value={giocatore}
          onChange={handleSelezionaGiocatore}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          <option value="#">#1</option>
          <option value="#">#2</option>
          <option value="#">#3</option>
          <option value="#">#4</option>
        </select>
      </div>

      <div className="mb-4">
        <select
          value={partita}
          onChange={handleSelezionaPartita}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          <option value="Partita 1">Partita 1</option>
          <option value="Partita 2">Partita 2</option>
        </select>
      </div>

      <button onClick={handleAggiungiAzione} className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded">
        Aggiungi Azione
      </button>

      <h3 className="text-lg font-semibold mt-4 mb-2">Azioni Giocatore:</h3>
      <ul className="text-sm space-y-1 max-h-64 overflow-y-auto">
        {azioni.map((a, index) => (
          <li key={index} className="border-b border-gray-700 pb-1">
            {a.giocatore} → {a.azione} → {a.punteggio} (Partita: {a.partita})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoutPlayer;
