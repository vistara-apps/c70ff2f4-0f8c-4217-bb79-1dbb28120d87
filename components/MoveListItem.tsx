'use client';

import { useState } from 'react';
import { Play, Pause, BookOpen, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Move } from '../lib/types';

interface MoveListItemProps {
  move: Move;
  variant?: 'withTutorialToggle' | 'basic';
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onToggleTutorial?: () => void;
  className?: string;
}

export function MoveListItem({
  move,
  variant = 'basic',
  isPlaying = false,
  onPlay,
  onPause,
  onToggleTutorial,
  className
}: MoveListItemProps) {
  const [showTutorial, setShowTutorial] = useState(false);

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-green-400 bg-green-400/20';
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-white bg-white/20';
    }
  };

  const handleToggleTutorial = () => {
    const newState = !showTutorial;
    setShowTutorial(newState);
    if (onToggleTutorial) {
      onToggleTutorial();
    }
  };

  return (
    <div className={cn('card-cosmic', className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-1">{move.name}</h3>
          <p className="text-white/70 text-sm mb-2">{move.description}</p>
          
          <div className="flex items-center space-x-2 mb-2">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              getDifficultyColor(move.difficulty)
            )}>
              {move.difficulty}
            </span>
            <span className="text-white/60 text-xs">
              {Math.floor(move.duration / 60)}:{(move.duration % 60).toString().padStart(2, '0')}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {move.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          {variant === 'withTutorialToggle' && move.tutorialUrl && (
            <button
              onClick={handleToggleTutorial}
              className={cn(
                'p-2 rounded-full transition-colors duration-200',
                showTutorial 
                  ? 'bg-cosmic-purple text-white' 
                  : 'bg-white/20 text-white/70 hover:bg-white/30'
              )}
            >
              <BookOpen className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="bg-cosmic-purple hover:bg-cosmic-purple/80 text-white p-2 rounded-full transition-colors duration-200"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Tutorial Section */}
      {variant === 'withTutorialToggle' && showTutorial && move.tutorialUrl && (
        <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center space-x-2 mb-3">
            <BookOpen className="w-4 h-4 text-cosmic-purple" />
            <span className="text-white font-medium text-sm">Tutorial</span>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">🎥</div>
            <p className="text-white/70 text-sm">
              Tutorial video would be embedded here
            </p>
            <button className="btn-secondary mt-3 text-xs">
              Watch Tutorial
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
