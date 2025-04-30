// src/components/VideoUploader.jsx
import React, { useState } from 'react';

const VideoUploader = ({ squadra }) => {
  const [file, setFile] = useState(null);
  const [caricato, setCaricato] = useState(false);

  const handleUpload = () => {
    if (!file) return alert('Seleziona un file video prima di caricare.');
    // Simulazione caricamento video nella cartella "da finire" della squadra selezionata
    console.log(`📁 Video caricato in: ${squadra}/da finire/${file.name}`);
    setCaricato(true);
    setTimeout(() => setCaricato(false), 3000);
    setFile(null);
  };

  return (
    <div className="text-white">
      <h3 className="text-lg font-semibold mb-4">Carica un video nella cartella "da finire"</h3>
      <input
        type="file"
        accept="video/*"
        className="mb-4 block"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded"
      >
        Carica Video
      </button>

      {caricato && (
        <p className="text-green-400 mt-3">✅ Video caricato con successo!</p>
      )}
    </div>
  );
};

export default VideoUploader;
