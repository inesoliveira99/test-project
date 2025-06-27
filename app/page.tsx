'use client';

import { useState } from 'react';

const colors = [
  'bg-blue-500 hover:bg-blue-600',
  'bg-red-500 hover:bg-red-600',
  'bg-green-500 hover:bg-green-600',
  'bg-purple-500 hover:bg-purple-600',
  'bg-yellow-500 hover:bg-yellow-600',
  'bg-pink-500 hover:bg-pink-600',
  'bg-indigo-500 hover:bg-indigo-600',
  'bg-teal-500 hover:bg-teal-600'
];

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setColorIndex((prev) => (prev + 1) % colors.length);
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
          Hello World! 👋
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Click the button below to see the magic happen!
        </p>
        
        <button
          onClick={handleClick}
          className={`
            ${colors[colorIndex]} 
            text-white font-bold py-4 px-8 rounded-lg 
            transform transition-all duration-300 ease-in-out
            hover:scale-105 active:scale-95
            shadow-lg hover:shadow-xl
            text-xl
          `}
        >
          Hello World Button
        </button>
        
        <div className="mt-8 space-y-2">
          <p className="text-gray-600">
            Button clicked: <span className="font-bold text-gray-800">{clickCount}</span> times
          </p>
          <p className="text-gray-600">
            Current color: <span className="font-bold text-gray-800">
              {colors[colorIndex].split(' ')[0].replace('bg-', '').replace('-500', '')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}