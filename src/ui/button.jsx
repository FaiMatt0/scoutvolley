// src/ui/button.jsx
import React from 'react';

export function Button({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`bg-pink-600 hover:bg-pink-500 text-white font-semibold px-4 py-2 rounded-xl transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
