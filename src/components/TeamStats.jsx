// src/components/TeamStats.jsx
import React from 'react';

const TeamStats = () => {
  const attacchi = [
    { zona: 'Zona 4', percentuale: 40 },
    { zona: 'Zona 2', percentuale: 30 },
    { zona: 'Pipe', percentuale: 20 },
    { zona: 'Altro', percentuale: 10 },
  ];

  const topPlayer = {
    nome: 'Marco Rossi',
    attacchi: '85%',
    ricezioni: '90%',
    battute: '78%',
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Statistiche Squadra</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Distribuzione attacchi</h3>
        <ul className="space-y-1">
          {attacchi.map((a, idx) => (
            <li key={idx} className="bg-gray-800 px-4 py-2 rounded">
              {a.zona}: {a.percentuale}%
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Top Player della partita</h3>
        <div className="bg-pink-600 p-4 rounded-xl">
          <p className="text-white text-lg font-bold">{topPlayer.nome}</p>
          <p>Attacchi positivi: {topPlayer.attacchi}</p>
          <p>Ricezioni positive: {topPlayer.ricezioni}</p>
          <p>Battute efficaci: {topPlayer.battute}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Riepilogo scritto</h3>
        <p className="bg-gray-800 p-3 rounded">
          La squadra ha mostrato un buon equilibrio tra le zone d’attacco.
          Ottima la prestazione di Marco Rossi che si conferma MVP del match.
        </p>
      </div>
    </div>
  );
};

export default TeamStats;
