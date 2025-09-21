'use client';

import { useState } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { DANCE_GENRES, MOODS, DANCE_STYLES, DIFFICULTY_LEVELS } from '../lib/utils';
import type { ChoreoGeneratorParams } from '../lib/types';

interface ChoreoGeneratorFormProps {
  variant?: 'full' | 'compact';
  onGenerate?: (params: ChoreoGeneratorParams) => void;
  className?: string;
}

export function ChoreoGeneratorForm({
  variant = 'full',
  onGenerate,
  className
}: ChoreoGeneratorFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [params, setParams] = useState<ChoreoGeneratorParams>({
    genre: 'Hip Hop',
    mood: 'Energetic',
    style: 'Freestyle',
    difficulty: 'Intermediate',
    duration: 120 // 2 minutes
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onGenerate) {
        onGenerate(params);
      } else {
        // Default behavior - show success message
        alert('Choreography generated! (This is a demo)');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate choreography. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isCompact = variant === 'compact';

  return (
    <div className={cn('space-y-4', className)}>
      {/* Genre Selection */}
      <div className="space-y-2">
        <label className="text-white font-medium text-sm">Genre</label>
        <select
          value={params.genre}
          onChange={(e) => setParams(prev => ({ ...prev, genre: e.target.value }))}
          className="input-cosmic w-full"
        >
          {DANCE_GENRES.map(genre => (
            <option key={genre} value={genre} className="bg-gray-800 text-white">
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Mood Selection */}
      <div className="space-y-2">
        <label className="text-white font-medium text-sm">Mood</label>
        <select
          value={params.mood}
          onChange={(e) => setParams(prev => ({ ...prev, mood: e.target.value }))}
          className="input-cosmic w-full"
        >
          {MOODS.map(mood => (
            <option key={mood} value={mood} className="bg-gray-800 text-white">
              {mood}
            </option>
          ))}
        </select>
      </div>

      {!isCompact && (
        <>
          {/* Style Selection */}
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">Style</label>
            <select
              value={params.style}
              onChange={(e) => setParams(prev => ({ ...prev, style: e.target.value }))}
              className="input-cosmic w-full"
            >
              {DANCE_STYLES.map(style => (
                <option key={style} value={style} className="bg-gray-800 text-white">
                  {style}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">Difficulty</label>
            <select
              value={params.difficulty}
              onChange={(e) => setParams(prev => ({ ...prev, difficulty: e.target.value }))}
              className="input-cosmic w-full"
            >
              {DIFFICULTY_LEVELS.map(level => (
                <option key={level} value={level} className="bg-gray-800 text-white">
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Duration Slider */}
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">
              Duration: {Math.floor(params.duration / 60)}:{(params.duration % 60).toString().padStart(2, '0')}
            </label>
            <input
              type="range"
              min="30"
              max="300"
              step="15"
              value={params.duration}
              onChange={(e) => setParams(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={cn(
          'btn-primary w-full flex items-center justify-center space-x-2',
          isGenerating && 'opacity-75 cursor-not-allowed'
        )}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Zap className="w-5 h-5" />
            <span>Generate Choreography</span>
          </>
        )}
      </button>

      {isCompact && (
        <p className="text-white/60 text-xs text-center">
          Uses 1 credit • Generates 3-5 variations
        </p>
      )}
    </div>
  );
}
