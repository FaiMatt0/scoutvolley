// src/components/ScoutVideo.jsx
import React, { useState, useRef } from 'react';

const ScoutVideo = () => {
  const [videoURL, setVideoURL] = useState(null);
  const [azioni, setAzioni] = useState([]);
  const [giocatore, setGiocatore] = useState('');
  const [azione, setAzione] = useState('');
  const [voto, setVoto] = useState('');
  const [commento, setCommento] = useState('');

  const videoRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleRegistra = () => {
    if (!giocatore || !azione || !voto) return alert('Completa tutti i campi');
    const current = videoRef.current?.currentTime || 0;
    const nuova = {
      id: Date.now(),
      giocatore,
      azione,
      voto,
      commento,
      time: formatTime(current),
      seconds: current,
    };
    setAzioni((prev) => [...prev, nuova]);
    setGiocatore('');
    setAzione('');
    setVoto('');
    setCommento('');
  };

  const handleJumpToTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  const handleDelete = (id) => {
    if (confirm('Eliminare questa azione?')) {
      setAzioni((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-4">Scout con Video</h2>

      {!videoURL && (
        <div className="mb-6">
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="bg-gray-800 p-2 rounded"
          />
        </div>
      )}

      {videoURL && (
        <>
          <div className="mb-6">
            <video
              ref={videoRef}
              src={videoURL}
              controls
              className="w-full max-w-xl mx-auto rounded shadow-lg"
            />
            <div className="mt-2 text-center">
              <button
                onClick={togglePlay}
                className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded"
              >
                ▶️ Play / Pause
              </button>
            </div>
          </div>

          <div className="grid gap-3 mb-6">
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
                  className={`px-4 py-2 rounded ${
                    voto === v ? 'bg-pink-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={commento}
              onChange={(e) => setCommento(e.target.value)}
              placeholder="Aggiungi un commento (opzionale)"
              className="bg-gray-800 p-2 rounded"
            />

            <button
              onClick={handleRegistra}
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
            >
              ✅ Registra Azione
            </button>
          </div>

          <h3 className="text-lg font-semibold mb-2">Azioni Registrate:</h3>
          <ul className="text-sm space-y-1 max-h-64 overflow-y-auto">
            {azioni.map((a) => (
              <li
                key={a.id}
                className="border-b border-gray-700 pb-1 flex justify-between items-start"
              >
                <div>
                  <button
                    onClick={() => handleJumpToTime(a.seconds)}
                    className="text-pink-400 hover:text-pink-300 mr-2"
                  >
                    ⏱ {a.time}
                  </button>
                  {a.giocatore} → {a.azione} → {a.voto}{' '}
                  {a.commento && `→ 📝 ${a.commento}`}
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-400 text-xs ml-2 hover:text-red-200"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ScoutVideo;
