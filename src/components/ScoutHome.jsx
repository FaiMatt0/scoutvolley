// src/components/ScoutHome.jsx
import React, { useState } from 'react';
import ScoutLive from './ScoutLive';
import ScoutVideo from './ScoutVideo';

const ScoutHome = () => {
  const [modalita, setModalita] = useState(null);

  return (
    <div className="text-white">
      {!modalita && (
        <div className="grid gap-4">
          <button
            onClick={() => setModalita('live')}
            className="bg-pink-600 hover:bg-pink-500 p-6 rounded-xl text-xl w-full"
          >
            🟢 Scout Live (senza video)
          </button>

          <button
            onClick={() => setModalita('video')}
            className="bg-pink-600 hover:bg-pink-500 p-6 rounded-xl text-xl w-full"
          >
            🔵 Scout con video
          </button>
        </div>
      )}

      {modalita === 'live' && (
        <div>
          <button onClick={() => setModalita(null)} className="mb-4 bg-gray-700 px-4 py-2 rounded">
            ⬅ Torna indietro
          </button>
          <ScoutLive />
        </div>
      )}

      {modalita === 'video' && (
        <div>
          <button onClick={() => setModalita(null)} className="mb-4 bg-gray-700 px-4 py-2 rounded">
            ⬅ Torna indietro
          </button>
          <ScoutVideo />
        </div>
      )}
    </div>
  );
};

export default ScoutHome;
