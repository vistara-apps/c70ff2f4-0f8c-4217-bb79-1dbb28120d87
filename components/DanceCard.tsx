'use client';

import { Play, Clock, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface DanceCardProps {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  genre: string;
  thumbnail: string;
  variant?: 'featured' | 'standard';
  onPlay?: () => void;
  className?: string;
}

export function DanceCard({
  title,
  description,
  difficulty,
  duration,
  genre,
  thumbnail,
  variant = 'standard',
  onPlay,
  className
}: DanceCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-green-400';
      case 'intermediate':
        return 'text-yellow-400';
      case 'advanced':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className={cn(
      'card-cosmic hover:scale-105 transition-all duration-200 cursor-pointer',
      variant === 'featured' && 'border border-cosmic-purple/50',
      className
    )}>
      <div className="flex items-start space-x-4">
        {/* Thumbnail */}
        <div className="w-16 h-16 bg-gradient-to-br from-cosmic-purple to-cosmic-pink rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
          {thumbnail}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-white font-semibold text-lg truncate">{title}</h3>
            {variant === 'featured' && (
              <Star className="w-4 h-4 text-accent fill-current flex-shrink-0 ml-2" />
            )}
          </div>
          
          <p className="text-white/70 text-sm mb-3 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs">
              <span className="bg-white/20 px-2 py-1 rounded text-white">
                {genre}
              </span>
              <span className={cn('font-medium', getDifficultyColor(difficulty))}>
                {difficulty}
              </span>
              <span className="text-white/70 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {duration}
              </span>
            </div>
            
            <button
              onClick={onPlay}
              className="bg-cosmic-purple hover:bg-cosmic-purple/80 text-white p-2 rounded-full transition-colors duration-200"
            >
              <Play className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
