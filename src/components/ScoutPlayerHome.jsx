import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ScoutPlayerHome = ({ user, partite }) => {
  const numeroGiocatore = `#${user.split('_')[1]}`;
  const [statsType, setStatsType] = useState(null);

  const calcolaStatistichePersonali = () => {
    const stats = { attacco: 0, muro: 0, servizio: 0, punti: 0 };
    partite.forEach((p) => {
      p.eventi
        .filter((e) => e.numero === numeroGiocatore)
        .forEach((e) => {
          if (e.azione === 'attacco') stats.attacco++;
          if (e.azione === 'muro') stats.muro++;
          if (e.azione === 'servizio') stats.servizio++;
          if (e.esito === '+' || e.esito === '++') stats.punti++;
        });
    });
    return stats;
  };

  const calcolaStatisticheSquadra = () => {
    const stats = {
      attacco: 0,
      muro: 0,
      servizio: 0,
      ricezione: 0,
      difesa: 0,
      errori: 0,
      punti: 0,
    };
    partite.forEach((p) => {
      p.eventi.forEach((e) => {
        if (e.azione === 'attacco') stats.attacco++;
        if (e.azione === 'muro') stats.muro++;
        if (e.azione === 'servizio') stats.servizio++;
        if (e.azione === 'ricezione') stats.ricezione++;
        if (e.azione === 'difesa') stats.difesa++;
        if (e.esito === '+' || e.esito === '++') stats.punti++;
        if (e.esito === '-') stats.errori++;
      });
    });
    return stats;
  };

  const dati =
    statsType === 'personali'
      ? calcolaStatistichePersonali()
      : statsType === 'squadra'
      ? calcolaStatisticheSquadra()
      : null;

  const datiGrafico = dati
    ? Object.entries(dati).map(([chiave, valore]) => ({ nome: chiave, valore }))
    : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-start gap-6 relative overflow-hidden">
      {/* Background stilizzato */}
      <div className="absolute inset-0 opacity-10 bg-[url('/volley-diagram.png')] bg-no-repeat bg-center bg-contain pointer-events-none" />

      <h2 className="text-3xl font-extrabold text-pink-500 text-center z-10">
        🏐 Benvenuto, {numeroGiocatore}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 z-10 w-full max-w-3xl">
        <button
          onClick={() => setStatsType('personali')}
          className="bg-pink-700/80 hover:bg-pink-600/90 rounded-2xl p-6 text-xl font-semibold flex flex-col items-center justify-center gap-3 shadow-lg backdrop-blur-md transition"
        >
          <span className="text-5xl">👤</span>
          Statistiche Personali
        </button>

        <button
          onClick={() => setStatsType('squadra')}
          className="bg-pink-700/80 hover:bg-pink-600/90 rounded-2xl p-6 text-xl font-semibold flex flex-col items-center justify-center gap-3 shadow-lg backdrop-blur-md transition"
        >
          <span className="text-5xl">👥</span>
          Statistiche Squadra
        </button>
      </div>

      {dati && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl w-full max-w-3xl z-10">
          <h3 className="text-xl font-semibold mb-4 text-center">
            {statsType === 'personali'
              ? 'Statistiche Personali'
              : 'Statistiche Squadra'}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={datiGrafico} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="nome" width={120} />
              <Tooltip />
              <Bar dataKey="valore" fill="#FF00CC" radius={[0, 10, 10, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ScoutPlayerHome;
