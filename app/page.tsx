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

  const createFullScreenExplosion = (type: 'hearts' | 'swords' | 'dragons') => {
    const images = {
      hearts: ['💖', '💕', '💗', '💝', '❤️', '💜', '🤍', '💙'],
      swords: ['/sword.png', '/sword2.png', '/sword3.png', '/sword4.png', '/sword5.png', '/sword6.png'],
      dragons: ['/dragon1.png', '/dragon3.png', '/dragon4.png', '/dragon5.png', '/dragon6.png']
    };

    const selectedImages = images[type];
    const newParticles: Particle[] = [];

    // Create 80 particles for EPIC CHAOS!
    const particleCount = type === 'hearts' ? 50 : 80;
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + Math.random() + i,
        x: Math.random() * 120 - 10, // Spawn slightly off-screen for full coverage
        y: -50, // Start well above screen
        emoji: selectedImages[Math.floor(Math.random() * selectedImages.length)],
        delay: Math.random() * 2000 // Much faster - Random delay up to 0.2 seconds only!
      });
    }

    setParticles(prev => [...prev, ...newParticles]);

    // Remove particles after animation completes (faster cleanup)
    setTimeout(() => {
      setParticles(prev => 
        prev.filter(particle => 
          !newParticles.some(newP => newP.id === particle.id)
        )
      );
    }, 6000); // Reduced from 6000ms to 3000ms
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
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationName: 'fall',
            animationDuration: '4s', // Much faster - reduced from 4s to 2s
            animationDelay: `${particle.delay}ms`,
            animationFillMode: 'forwards',
            animationTimingFunction: 'ease-in'
          }}
        >
          {particle.emoji.startsWith('/') ? (
            <img 
              src={particle.emoji} 
              alt="explosion" 
              className="w-16 h-16 md:w-24 md:h-24 object-contain animate-spin"
              style={{
                animationDuration: '1s', // Much faster spinning - reduced from 1s to 0.5s
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))'
              }}
            />
          ) : (
            <div className="text-4xl md:text-6xl animate-pulse">
              {particle.emoji}
            </div>
          )}
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

        {/* Epic Explosion buttons */}
        <div className="mt-12 space-y-4">
          <p className="text-lg text-gray-700 font-semibold">💥 EPIC CHAOS MODE! 💥</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => createFullScreenExplosion('hearts')}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg text-xl"
            >
              💖 HEART STORM 💖
            </button>
            <button
              onClick={() => createFullScreenExplosion('swords')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg text-xl"
            >
              ⚔️ SWORD CHAOS ⚔️
            </button>
            <button
              onClick={() => createFullScreenExplosion('dragons')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg text-xl"
            >
              🐉 DRAGON INVASION 🐉
            </button>
          </div>
          <p className="text-sm text-gray-600 italic">⚠️ Warning: Epic chaos mode activated! ⚠️</p>
        </div>

        {/* Love message */}
        <div className="mt-12 p-6 bg-white/80 rounded-2xl shadow-xl border-4 border-pink-300">
          <h2 className="text-3xl font-bold text-pink-600 mb-4">💕 My Dragon Knight 💕</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            🐉 You are my brave dragon knight who protects my heart with your sword! ⚔️
          </p>
          <div className="mt-4 text-6xl">🐉💕⚔️💖🗡️💕🐉</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-150vh) rotate(0deg) scale(0.5);
            opacity: 1;
          }
          50% {
            transform: translateY(0vh) rotate(180deg) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(150vh) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}