'use client';

import { useState, useEffect } from 'react';

const colors = [
  'bg-red-500 hover:bg-red-600',
  'bg-pink-500 hover:bg-pink-600',
  'bg-purple-500 hover:bg-purple-600',
  'bg-rose-500 hover:bg-rose-600',
  'bg-violet-500 hover:bg-violet-600',
  'bg-fuchsia-500 hover:bg-fuchsia-600',
  'bg-indigo-500 hover:bg-indigo-600',
  'bg-blue-500 hover:bg-blue-600'
];

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [explosions, setExplosions] = useState<{ id: number; x: number; y: number }[]>([]);
  const [daysTogther, setDaysTogether] = useState(0);

  // Calculate days since August 3, 2024
  useEffect(() => {
    const startDate = new Date('2024-08-03');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);
  }, []);

  const handleClick = () => {
    setColorIndex((prev) => (prev + 1) % colors.length);
    setClickCount((prev) => prev + 1);
  };

  const handleExplosion = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newExplosion = {
      id: Date.now() + Math.random(),
      x,
      y
    };
    
    setExplosions(prev => [...prev, newExplosion]);
    
    // Remove explosion after animation
    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300 text-2xl animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            💕
          </div>
        ))}
      </div>

      {/* Explosions */}
      {explosions.map(explosion => (
        <div
          key={explosion.id}
          className="absolute pointer-events-none animate-ping"
          style={{
            left: explosion.x,
            top: explosion.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="text-4xl">💖⚔️🐉💕⚔️💖</div>
        </div>
      ))}

      <div className="text-center relative z-10">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
            🐉⚔️ You Are The Best Boyfriend Ever! ⚔️🐉
          </h1>
          <div className="text-2xl md:text-3xl text-purple-600 font-semibold">
            💕 {daysTogther} magical days together! 💕
          </div>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          🗡️ Click the dragon button to change its magical powers! 🗡️
        </p>
        
        <button
          onClick={handleClick}
          className={`
            ${colors[colorIndex]} 
            text-white font-bold py-6 px-10 rounded-xl 
            transform transition-all duration-300 ease-in-out
            hover:scale-110 active:scale-95
            shadow-xl hover:shadow-2xl
            text-2xl border-4 border-yellow-400
            relative
          `}
        >
          🐉 Dragon Love Button 🐉
          <div className="absolute -top-2 -right-2 text-2xl animate-spin">⚔️</div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce">💖</div>
        </button>

        <div className="mt-8 space-y-4">
          <p className="text-gray-700 text-xl">
            🗡️ Dragon button clicked: <span className="font-bold text-gray-800 text-2xl">{clickCount}</span> times ⚔️
          </p>
          <p className="text-gray-700 text-xl">
            🐉 Current dragon power: <span className="font-bold text-gray-800 text-2xl">
              {colors[colorIndex].split(' ')[0].replace('bg-', '').replace('-500', '')} magic
            </span> 🐉
          </p>
        </div>

        {/* Explosion buttons */}
        <div className="mt-12 space-y-4">
          <p className="text-lg text-gray-700 font-semibold">💥 Magical Explosion Buttons! 💥</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleExplosion}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              💖 Heart Explosion 💖
            </button>
            <button
              onClick={handleExplosion}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              ⚔️ Sword Storm ⚔️
            </button>
            <button
              onClick={handleExplosion}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🐉 Dragon Power 🐉
            </button>
          </div>
        </div>

        {/* Love message */}
        <div className="mt-12 p-6 bg-white/80 rounded-2xl shadow-xl border-4 border-pink-300">
          <h2 className="text-3xl font-bold text-pink-600 mb-4">💕 My Dragon Knight 💕</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            🐉 You are my brave dragon knight who protects my heart with your magical sword! ⚔️<br/>
            💖 Every day with you is a new adventure in our fairy tale! 💖<br/>
            🗡️ Together we can conquer any dragon and find all the treasures! 🗡️
          </p>
          <div className="mt-4 text-6xl">🐉💕⚔️💖🗡️💕🐉</div>
        </div>
      </div>
    </div>
  );
}