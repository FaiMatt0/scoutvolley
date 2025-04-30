// src/components/LayoutDueColonne.jsx
import React from 'react';

const LayoutDueColonne = ({ left, right }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1">{left}</div>
      <div className="col-span-1">{right}</div>
    </div>
  );
};

export default LayoutDueColonne;
