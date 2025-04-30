// src/components/ArchivioPartite.jsx
import React, { useState } from 'react';

const mockData = {
  'Volley Club': {
    'U17 Femminile': {
      '2024/2025': {
        andata: ['Travesio vs Prata 25/03/2025', 'Fiume vs Maniago 01/04/2025'],
        ritorno: [],
        'play off': [],
        'play out': [],
        'da finire': ['Partita da completare.mp4'],
      },
    },
  },
};

const ArchivioPartite = ({ ruolo = 'coach' }) => {
  const [aperta, setAperta] = useState({});

  const toggle = (livello) => {
    setAperta((prev) => ({ ...prev, [livello]: !prev[livello] }));
  };

  const renderPartite = (dati, path = []) => {
    return Object.entries(dati).map(([chiave, valore]) => {
      const id = path.concat(chiave).join('/');
      const visibile = aperta[id];

      if (Array.isArray(valore)) {
        if (chiave === 'da finire' && ruolo === 'giocatore') return null;
        return (
          <div key={id} className="ml-4 mt-1">
            <div
              className="cursor-pointer text-pink-400 hover:underline"
              onClick={() => toggle(id)}
            >
              {chiave}
            </div>
            {visibile && (
              <ul className="ml-4 list-disc">
                {valore.map((file, i) => (
                  <li
                    key={i}
                    className="text-white hover:text-pink-300 cursor-pointer"
                  >
                    {file}
                    {ruolo === 'admin' && (
                      <span className="ml-2 text-sm text-yellow-400">
                        [✏️ sposta] [❌ elimina]
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      } else {
        return (
          <div key={id} className="ml-2 mt-1">
            <div
              className="cursor-pointer text-pink-300 hover:underline"
              onClick={() => toggle(id)}
            >
              {chiave}
            </div>
            {visibile && renderPartite(valore, path.concat(chiave))}
          </div>
        );
      }
    });
  };

  return (
    <div className="text-white">
      <h3 className="text-lg font-bold mb-3">Archivio Partite</h3>
      <div className="bg-gray-800 p-4 rounded overflow-y-auto max-h-[70vh]">
        {renderPartite(mockData)}
      </div>
    </div>
  );
};

export default ArchivioPartite;
