'use client';

import { useState } from 'react';
import { DanceCard } from './DanceCard';
import { ChoreoGeneratorForm } from './ChoreoGeneratorForm';
import { Zap, Music, Play, TrendingUp } from 'lucide-react';

export function DashboardView() {
  const [showGenerator, setShowGenerator] = useState(false);

  const featuredDances = [
    {
      id: '1',
      title: 'Cosmic Flow',
      description: 'A mesmerizing contemporary routine with ethereal movements',
      difficulty: 'Intermediate',
      duration: '2:30',
      genre: 'Contemporary',
      thumbnail: '🌟'
    },
    {
      id: '2', 
      title: 'Urban Pulse',
      description: 'High-energy hip-hop sequence with street-style moves',
      difficulty: 'Advanced',
      duration: '1:45',
      genre: 'Hip Hop',
      thumbnail: '🔥'
    },
    {
      id: '3',
      title: 'Neon Dreams',
      description: 'Futuristic dance with electronic vibes and sharp movements',
      difficulty: 'Beginner',
      duration: '3:00',
      genre: 'House',
      thumbnail: '⚡'
    }
  ];

  if (showGenerator) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white neon-text">AI Choreography Generator</h2>
          <button
            onClick={() => setShowGenerator(false)}
            className="btn-secondary"
          >
            Back
          </button>
        </div>
        <ChoreoGeneratorForm variant="full" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4 animate-bounce-slow">💃</div>
        <h1 className="text-4xl font-bold text-white neon-text mb-2">
          Welcome to RhythmFlow AI
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Create stunning dance choreography with AI assistance. Generate unique routines, 
          practice with our mirror tool, and share your moves with the world.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowGenerator(true)}
          className="card-cosmic text-center space-y-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Generate Choreography</h3>
            <p className="text-white/70 text-sm">Create AI-powered dance sequences</p>
          </div>
        </button>

        <button className="card-cosmic text-center space-y-3 hover:scale-105 transition-transform duration-200">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-cosmic-blue to-cosmic-cyan rounded-full flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">My Routines</h3>
            <p className="text-white/70 text-sm">View and edit saved routines</p>
          </div>
        </button>
      </div>

      {/* Stats */}
      <div className="card-cosmic">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Your Progress
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cosmic-purple">12</div>
            <div className="text-white/70 text-sm">Routines Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cosmic-pink">45</div>
            <div className="text-white/70 text-sm">Hours Practiced</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cosmic-cyan">8</div>
            <div className="text-white/70 text-sm">Moves Mastered</div>
          </div>
        </div>
      </div>

      {/* Featured Dances */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Play className="w-5 h-5 mr-2" />
          Featured Choreography
        </h2>
        <div className="space-y-4">
          {featuredDances.map((dance) => (
            <DanceCard
              key={dance.id}
              title={dance.title}
              description={dance.description}
              difficulty={dance.difficulty}
              duration={dance.duration}
              genre={dance.genre}
              thumbnail={dance.thumbnail}
              variant="featured"
            />
          ))}
        </div>
      </div>

      {/* Quick Generator */}
      <div className="card-cosmic">
        <h3 className="text-white font-semibold mb-4">Quick Generate</h3>
        <ChoreoGeneratorForm variant="compact" />
      </div>
    </div>
  );
}
