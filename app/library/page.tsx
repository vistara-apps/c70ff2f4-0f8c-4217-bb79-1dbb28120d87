'use client';

import { AppShell } from '../../components/AppShell';
import { useState } from 'react';
import { Search, Filter, Play, Star, Clock } from 'lucide-react';
import { Move } from '../../lib/types';

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');

  // Mock moves data - will be replaced with real API data
  const moves: Move[] = [
    {
      moveId: '1',
      name: 'Pop and Lock',
      description: 'Classic popping technique with locking transitions',
      tags: ['popping', 'locking', 'basic'],
      difficulty: 'intermediate',
      duration: 8,
      tutorialUrl: 'https://example.com/tutorial1'
    },
    {
      moveId: '2',
      name: 'Wave Flow',
      description: 'Smooth arm wave with body isolation',
      tags: ['wave', 'isolation', 'flow'],
      difficulty: 'beginner',
      duration: 6,
      tutorialUrl: 'https://example.com/tutorial2'
    },
    {
      moveId: '3',
      name: 'Windmill',
      description: 'Advanced floor work with continuous rotation',
      tags: ['breakdance', 'floorwork', 'power'],
      difficulty: 'advanced',
      duration: 12,
      tutorialUrl: 'https://example.com/tutorial3'
    },
    {
      moveId: '4',
      name: 'Body Roll',
      description: 'Smooth torso undulation from head to toe',
      tags: ['isolation', 'flow', 'sensual'],
      difficulty: 'intermediate',
      duration: 10,
      tutorialUrl: 'https://example.com/tutorial4'
    }
  ];

  const filteredMoves = moves.filter(move => {
    const matchesSearch = move.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         move.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         move.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty = selectedDifficulty === 'all' || move.difficulty === selectedDifficulty;
    const matchesStyle = selectedStyle === 'all' || move.tags.includes(selectedStyle);

    return matchesSearch && matchesDifficulty && matchesStyle;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold text-white neon-text mb-2">
            Move Library
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Master dance moves with step-by-step tutorials and practice guides.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="card-cosmic">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search moves..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-cosmic pl-10 w-full"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-white/60" />
                <span className="text-white/80 text-sm">Filters:</span>
              </div>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="input-cosmic text-sm"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="input-cosmic text-sm"
              >
                <option value="all">All Styles</option>
                <option value="popping">Popping</option>
                <option value="locking">Locking</option>
                <option value="wave">Wave</option>
                <option value="breakdance">Breakdance</option>
                <option value="isolation">Isolation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Moves Grid */}
        <div className="grid gap-4">
          {filteredMoves.map((move) => (
            <div key={move.moveId} className="card-cosmic">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-lg flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{move.name}</h3>
                    <p className="text-white/70 text-sm mb-2">{move.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-white/60">
                      <span className={`font-medium ${getDifficultyColor(move.difficulty)}`}>
                        {move.difficulty.charAt(0).toUpperCase() + move.difficulty.slice(1)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {move.duration}s
                      </span>
                      <div className="flex space-x-1">
                        {move.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="bg-white/20 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/30 transition-colors duration-200">
                    <Star className="w-4 h-4" />
                  </button>
                  <button className="btn-secondary text-sm">
                    Watch Tutorial
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMoves.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-white mb-2">No moves found</h2>
            <p className="text-white/60">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </AppShell>
  );
}

