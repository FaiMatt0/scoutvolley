// src/components/Login.jsx
import React, { useState } from 'react';

const utentiTest = {
  admin_test: 'admin123',
  coach_test: 'coach123',
  scout_test: 'scout123',
  player_test: 'player123',
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (utentiTest[username] && utentiTest[username] === password) {
      localStorage.setItem('scout_user', username);
      onLogin(username);
    } else {
      setErrore('Credenziali non valide');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl mb-6 font-bold">Accedi</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg w-80">
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errore && <p className="text-red-400 mb-4 text-sm">{errore}</p>}
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-500 py-2 rounded"
        >
          Entra
        </button>
      </form>
    </div>
  );
};

export default Login;
