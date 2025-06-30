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

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  delay: number;
}

export default function Home() {
  const [colorIndex, setColorIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
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

  const createFullScreenExplosion = (type: 'hearts' | 'swords' | 'dragons') => {
    const emojis = {
      hearts: ['💖', '💕', '💗', '💝', '❤️', '💜', '🤍', '💙'],
      swords: ['⚔️', '🗡️', '⚡', '🔥', '✨', '💥', '🌟', '⭐'],
      dragons: ['🐉', '🔥', '👑', '💎', '🏰', '🛡️', '⚔️', '✨']
    };

    const selectedEmojis = emojis[type];
    const newParticles: Particle[] = [];

    // Create 30 particles for epic explosion
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: Date.now() + Math.random() + i,
        x: Math.random() * 100, // Random x position across screen
        y: -20, // Start above screen
        emoji: selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)],
        delay: Math.random() * 1000 // Random delay up to 1 second
      });
    }

    setParticles(prev => [...prev, ...newParticles]);

    // Remove particles after animation completes
    setTimeout(() => {
      setParticles(prev => 
        prev.filter(particle => 
          !newParticles.some(newP => newP.id === particle.id)
        )
      );
    }, 4000);
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

      {/* Falling particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none text-4xl animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationName: 'fall',
            animationDuration: '3s',
            animationDelay: `${particle.delay}ms`,
            animationFillMode: 'forwards',
            animationTimingFunction: 'ease-in'
          }}
        >
          {particle.emoji}
        </div>
      ))}

      <div className="text-center relative z-10">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
            🐉⚔️ You Are The Best Boyfriend Ever! ⚔️🐉
          </h1>
          <div className="text-2xl md:text-3xl text-purple-600 font-semibold">
            💕 {daysTogther} days together! 💕
          </div>
        </div>
        
        <p className="text-lg text-gray-700 mb-8">
          🗡️ Click the dragon button to change its powers! 🗡️
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

        {/* Epic Explosion buttons */}
        <div className="mt-12 space-y-4">
          <p className="text-lg text-gray-700 font-semibold">💥 EPIC FULL-SCREEN EXPLOSIONS! 💥</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => createFullScreenExplosion('hearts')}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg text-xl"
            >
              💖 HEART RAIN 💖
            </button>
            <button
              onClick={() => createFullScreenExplosion('swords')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg text-xl"
            >
              ⚔️ SWORD STORM ⚔️
            </button>
            <button
              onClick={() => createFullScreenExplosion('dragons')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg text-xl"
            >
              🐉 DRAGON MAGIC 🐉
            </button>
          </div>
        </div>

        {/* Love message */}
        <div className="mt-12 p-6 bg-white/80 rounded-2xl shadow-xl border-4 border-pink-300">
          <h2 className="text-3xl font-bold text-pink-600 mb-4">💕 My Dragon Knight 💕</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            🐉 You are my brave dragon knight who protects my heart with your magical sword! ⚔️<br/>
            🗡️ Together we can conquer any dragon and find all the treasures! 🗡️
          </p>
          <div className="mt-4 text-6xl">🐉💕⚔️💖🗡️💕🐉</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}