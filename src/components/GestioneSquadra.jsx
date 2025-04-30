// src/components/GestioneSquadra.jsx
import React, { useState } from 'react';

const GestioneSquadra = () => {
  const [giocatori, setGiocatori] = useState([]);
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [ruolo, setRuolo] = useState('');

  const aggiungiGiocatore = () => {
    if (nome && numero && ruolo) {
      const nuovo = { nome, numero, ruolo };
      setGiocatori([...giocatori, nuovo]);
      setNome('');
      setNumero('');
      setRuolo('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestione Squadra</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nome"
          className="p-2 rounded text-black"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Numero"
          className="p-2 rounded text-black"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ruolo"
          className="p-2 rounded text-black"
          value={ruolo}
          onChange={(e) => setRuolo(e.target.value)}
        />
        <button
          onClick={aggiungiGiocatore}
          className="bg-pink-600 px-4 rounded text-white"
        >
          Aggiungi
        </button>
      </div>
      <ul className="space-y-2">
        {giocatori.map((g, idx) => (
          <li key={idx} className="bg-gray-800 p-2 rounded">
            #{g.numero} - {g.nome} ({g.ruolo})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestioneSquadra;
