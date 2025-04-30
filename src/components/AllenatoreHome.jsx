// src/components/AllenatoreHome.jsx
import React, { useState } from 'react';
import GestioneSquadra from './GestioneSquadra';
import TeamStats from './TeamStats';

const AllenatoreHome = ({ squadra }) => {
  const [pagina, setPagina] = useState('home');

  return (
    <div className="p-4 text-white">
      <div className="flex justify-between mb-4">
        <div className="bg-gray-800 px-4 py-2 rounded">Ruolo: Allenatore</div>
        <select className="bg-gray-800 px-4 py-2 rounded" defaultValue={squadra}>
          <option>Squadra A</option>
          <option>Squadra B</option>
        </select>
      </div>

      {pagina !== 'home' && (
        <button
          onClick={() => setPagina('home')}
          className="mb-4 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
        >
          ⬅ Torna indietro
        </button>
      )}

      {pagina === 'home' && (
        <div className="grid gap-4">
          <button
            onClick={() => setPagina('gestione')}
            className="bg-pink-600 hover:bg-pink-500 p-6 rounded-xl text-xl flex items-center justify-center"
          >
            📋 Gestione squadra
          </button>

          <button
            onClick={() => setPagina('statistiche')}
            className="bg-pink-600 hover:bg-pink-500 p-6 rounded-xl text-xl flex items-center justify-center"
          >
            📊 Team Stats
          </button>
        </div>
      )}

      {pagina === 'gestione' && <GestioneSquadra />}

      {pagina === 'statistiche' && <TeamStats />}
    </div>
  );
};

export default AllenatoreHome;