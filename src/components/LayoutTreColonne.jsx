// src/components/LayoutTreColonne.jsx
import React from 'react';

const LayoutTreColonne = ({ ruolo, squadra, centro, sinistra, destra }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Colonna sinistra */}
      <div className="hidden md:block w-1/5 bg-gray-800 p-4 border-r border-gray-700 overflow-y-auto">
        {sinistra}
      </div>

      {/* Colonna centrale */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-gray-700 px-4 py-2 rounded">Ruolo: {ruolo}</div>
          <div className="bg-gray-700 px-4 py-2 rounded">
            Squadra: {squadra}
          </div>
        </div>
        {centro}
      </div>

      {/* Colonna destra */}
      {destra && (
        <div className="hidden lg:block w-1/4 bg-gray-800 p-4 border-l border-gray-700 overflow-y-auto">
          {destra}
        </div>
      )}
    </div>
  );
};

export default LayoutTreColonne;
