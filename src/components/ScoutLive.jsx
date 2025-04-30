// src/components/ScoutLive.jsx
import React, { useState, useEffect } from 'react';

const ScoutLive = () => {
  const [giocatore, setGiocatore] = useState('');
  const [azione, setAzione] = useState('');
  const [voto, setVoto] = useState('');
  const [azioni, setAzioni] = useState(() => {
    const salvate = localStorage.getItem('scout_azioni');
    return salvate ? JSON.parse(salvate) : [];
  });
  const [lastTime, setLastTime] = useState(null);
  const [commento, setCommento] = useState('');
  const [puntiNostra, setPuntiNostra] = useState(() => parseInt(localStorage.getItem('punti_nostra') || '0'));
  const [puntiAvversari, setPuntiAvversari] = useState(() => parseInt(localStorage.getItem('punti_avversari') || '0'));

  useEffect(() => {
    if (voto === '++') {
      setCommento('Punto: ottima esecuzione.');
    } else if (voto === '=') {
      setCommento('Errore grave, valutare la scelta.');
    } else {
      setCommento('');
    }
  }, [voto]);

  useEffect(() => {
    localStorage.setItem('scout_azioni', JSON.stringify(azioni));
  }, [azioni]);

  useEffect(() => {
    localStorage.setItem('punti_nostra', puntiNostra.toString());
    localStorage.setItem('punti_avversari', puntiAvversari.toString());
  }, [puntiNostra, puntiAvversari]);

  const handleRegistra = () => {
    if (!giocatore || !azione || !voto) return alert('Compila tutti i campi');

    const now = Date.now();
    const tempo = lastTime ? (now - lastTime) / 1000 : 0;
    setLastTime(now);

    if (voto === '++') setPuntiNostra((p) => p + 1);
    if (voto === '=') setPuntiAvversari((p) => p + 1);

    const nuova = {
      id: Date.now(),
      giocatore,
      azione,
      voto,
      commento: voto === '++' || voto === '=' ? commento : '',
      timestamp: now,
      tempoTraAzioni: tempo.toFixed(2) + 's',
      punteggio: `${puntiNostra + (voto === '++' ? 1 : 0)} - ${puntiAvversari + (voto === '=' ? 1 : 0)}`
    };
    setAzioni((prev) => [...prev, nuova]);
    setGiocatore('');
    setAzione('');
    setVoto('');
    setCommento('');
  };

  const handleModificaPunteggio = (team, delta) => {
    if (team === 'noi') setPuntiNostra((p) => Math.max(0, p + delta));
    else setPuntiAvversari((p) => Math.max(0, p + delta));
  };

  const handleElimina = (id) => {
    if (confirm('Eliminare questa azione?')) {
      setAzioni((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Scout Live</h2>

      <div className="mb-4">
        <div className="text-lg mb-1">Punteggio:</div>
        <div className="flex items-center gap-4 text-2xl">
          <div>
            <button onClick={() => handleModificaPunteggio('noi', -1)} className="px-2">➖</button>
            <span className="font-bold">{puntiNostra}</span>
            <button onClick={() => handleModificaPunteggio('noi', 1)} className="px-2">➕</button>
          </div>
          <span>-</span>
          <div>
            <button onClick={() => handleModificaPunteggio('loro', -1)} className="px-2">➖</button>
            <span className="font-bold">{puntiAvversari}</span>
            <button onClick={() => handleModificaPunteggio('loro', 1)} className="px-2">➕</button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 mb-6">
        <select
          value={giocatore}
          onChange={(e) => setGiocatore(e.target.value)}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          <option value="">Seleziona Giocatore</option>
          <option value="#1">#1</option>
          <option value="#2">#2</option>
          <option value="#3">#3</option>
          <option value="#4">#4</option>
        </select>

        <select
          value={azione}
          onChange={(e) => setAzione(e.target.value)}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          <option value="">Tipo Azione</option>
          <option value="servizio">Servizio</option>
          <option value="ricezione">Ricezione</option>
          <option value="attacco">Attacco</option>
          <option value="muro">Muro</option>
          <option value="alzata">Alzata</option>
          <option value="difesa">Difesa</option>
        </select>

        <div className="flex gap-2 flex-wrap">
          {['++', '+', '/', '-', '='].map((v) => (
            <button
              key={v}
              onClick={() => setVoto(v)}
              className={`px-4 py-2 rounded ${voto === v ? 'bg-pink-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              {v}
            </button>
          ))}
        </div>

        {voto === '++' || voto === '=' ? (
          <input
            type="text"
            value={commento}
            onChange={(e) => setCommento(e.target.value)}
            className="bg-gray-800 p-2 rounded w-full"
            placeholder="Aggiungi un commento..."
          />
        ) : null}

        <button onClick={handleRegistra} className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded">
          ✅ Registra Azione
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Azioni Registrate:</h3>
      <ul className="text-sm space-y-1 max-h-64 overflow-y-auto">
        {azioni.map((a) => (
          <li key={a.id} className="border-b border-gray-700 pb-1 flex justify-between items-start">
            <div>
              {a.giocatore} → {a.azione} → {a.voto} {a.commento && `→ 📝 ${a.commento}`} <span className="text-gray-400">({a.tempoTraAzioni}) • {a.punteggio}</span>
            </div>
            <button onClick={() => handleElimina(a.id)} className="text-red-400 text-xs ml-2 hover:text-red-200">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoutLive;
