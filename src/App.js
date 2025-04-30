// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import AllenatoreHome from './components/AllenatoreHome';
import ScoutHome from './components/ScoutHome';
import ScoutPlayerHome from './components/ScoutPlayerHome';
import ArchivioPartite from './components/ArchivioPartite';
import VideoUploader from './components/VideoUploader';
import LayoutDueColonne from './components/LayoutDueColonne';
import LayoutTreColonne from './components/LayoutTreColonne';

function App() {
  const [user, setUser] = useState(null);
  const [squadra, setSquadra] = useState('Squadra A');
  const [paginaAttiva, setPaginaAttiva] = useState('centro');

  const isGiocatore = user?.includes('player');

  useEffect(() => {
    const savedUser = localStorage.getItem('scout_user');
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('scout_user');
    setUser(null);
  };

  // 🧠 MOCK DATI SCOUTING REALI (simulazione partite)
  const partiteSquadraA = [
    {
      data: '2025-03-25',
      avversario: 'Squadra B',
      eventi: [
        { numero: '#1', azione: 'attacco', esito: '+' },
        { numero: '#1', azione: 'muro', esito: '++' },
        { numero: '#2', azione: 'ricezione', esito: '/' },
      ],
    },
    {
      data: '2025-03-27',
      avversario: 'Squadra C',
      eventi: [
        { numero: '#1', azione: 'servizio', esito: '-' },
        { numero: '#3', azione: 'attacco', esito: '+' },
      ],
    },
  ];

  const renderTreColonne = () => {
    const contenutoSinistra =
      paginaAttiva === 'sinistra' ? (
        <ArchivioPartite
          ruolo={
            isGiocatore
              ? 'coach'
              : user.startsWith('admin')
              ? 'admin'
              : user.startsWith('coach')
              ? 'coach'
              : 'scout'
          }
          squadra={squadra}
        />
      ) : null;

    const contenutoCentro =
      paginaAttiva === 'centro' ? (
        user.startsWith('coach') ? (
          <AllenatoreHome squadra={squadra} />
        ) : (
          <ScoutHome />
        )
      ) : null;

    const contenutoDestra =
      paginaAttiva === 'destra' && !isGiocatore ? (
        <VideoUploader squadra={squadra} setPaginaAttiva={setPaginaAttiva} />
      ) : null;

    return (
      <LayoutTreColonne
        sinistra={contenutoSinistra}
        centro={contenutoCentro}
        destra={contenutoDestra}
      />
    );
  };

  const renderDueColonneGiocatore = () => {
    if (paginaAttiva === 'sinistra') {
      return (
        <div className="p-2">
          <ArchivioPartite ruolo="coach" squadra={squadra} />
        </div>
      );
    }

    return (
      <LayoutDueColonne
        left={
          <div className="text-gray-500 italic">
          </div>
        }
        right={
          <ScoutPlayerHome user={user} partite={partiteSquadraA} />
        }
      />
    );
  };

  const getNavbar = () => (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-3 flex justify-around border-t border-gray-700">
      <button
        onClick={() => setPaginaAttiva('sinistra')}
        className={`text-white ${paginaAttiva === 'sinistra' ? 'text-pink-400' : ''}`}
      >
        📂
      </button>
      <button
        onClick={() => setPaginaAttiva('centro')}
        className={`text-white ${paginaAttiva === 'centro' ? 'text-pink-400' : ''}`}
      >
        🏠
      </button>
      {!isGiocatore && (
  <button
    onClick={() => setPaginaAttiva('destra')}
    className={`text-white ${paginaAttiva === 'destra' ? 'text-pink-400' : ''}`}
  >
    🎥
  </button>
)}

    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="pb-16">
          <div className="p-4">
            <div className="flex justify-between mb-4 items-center">
              <div className="bg-gray-700 px-4 py-2 rounded">
                Ruolo:{' '}
                {user.startsWith('coach')
                  ? 'Allenatore'
                  : user.startsWith('scout')
                  ? 'Scout'
                  : 'Giocatore'}
              </div>
              <div className="flex items-center gap-2">
                {!isGiocatore && (
                  <select
                    className="bg-gray-700 px-4 py-2 rounded"
                    value={squadra}
                    onChange={(e) => setSquadra(e.target.value)}
                  >
                    <option>Squadra A</option>
                    <option>Squadra B</option>
                  </select>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
                >
                  Logout
                </button>
              </div>
            </div>
            {isGiocatore ? renderDueColonneGiocatore() : renderTreColonne()}
          </div>
          {getNavbar()}
        </div>
      )}
    </div>
  );
}

export default App;
