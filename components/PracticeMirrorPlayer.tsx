'use client';

import { useState, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Maximize } from 'lucide-react';
import { cn } from '../lib/utils';

interface PracticeMirrorPlayerProps {
  variant?: 'withOverlay' | 'basic';
  routineName?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onRestart?: () => void;
  className?: string;
}

export function PracticeMirrorPlayer({
  variant = 'basic',
  routineName = 'Practice Session',
  onPlay,
  onPause,
  onRestart,
  className
}: PracticeMirrorPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minutes
  const [showSettings, setShowSettings] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = () => {
    const newState = !isPlaying;
    setIsPlaying(newState);
    
    if (newState && onPlay) {
      onPlay();
    } else if (!newState && onPause) {
      onPause();
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    if (onRestart) {
      onRestart();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn('card-cosmic', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">{routineName}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 bg-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/30 transition-colors duration-200"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/30 transition-colors duration-200">
            <Maximize className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-4 p-4 bg-white/10 rounded-lg border border-white/20">
          <h4 className="text-white font-medium mb-3">Practice Settings</h4>
          <div className="space-y-3">
            <div>
              <label className="text-white/80 text-sm block mb-1">Playback Speed</label>
              <select className="input-cosmic w-full text-sm">
                <option value="0.5">0.5x (Slow)</option>
                <option value="0.75">0.75x</option>
                <option value="1" selected>1x (Normal)</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x (Fast)</option>
              </select>
            </div>
            <div>
              <label className="text-white/80 text-sm block mb-1">Mirror Mode</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="mirror" value="on" defaultChecked className="text-cosmic-purple" />
                  <span className="text-white/80 text-sm">On</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="mirror" value="off" className="text-cosmic-purple" />
                  <span className="text-white/80 text-sm">Off</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video/Mirror Area */}
      <div 
        ref={videoRef}
        className="relative bg-black/50 rounded-lg overflow-hidden mb-4"
        style={{ aspectRatio: '16/9' }}
      >
        {/* Placeholder for video/camera feed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎭</div>
            <p className="text-white/70">Practice Mirror</p>
            <p className="text-white/50 text-sm">Camera feed would appear here</p>
          </div>
        </div>

        {/* Overlay Controls (for withOverlay variant) */}
        {variant === 'withOverlay' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute bottom-4 left-4 right-4">
              {/* Progress Bar */}
              <div className="bg-white/20 rounded-full h-1 mb-3">
                <div 
                  className="bg-cosmic-purple h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Time Display */}
              <div className="flex justify-between text-white/80 text-sm mb-3">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={handleRestart}
          className="p-3 bg-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/30 transition-colors duration-200"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={handlePlayPause}
          className="p-4 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-full text-white hover:scale-105 transition-transform duration-200"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        
        <button className="p-3 bg-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/30 transition-colors duration-200">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar (for basic variant) */}
      {variant === 'basic' && (
        <div className="mt-4">
          <div className="bg-white/20 rounded-full h-2">
            <div 
              className="bg-cosmic-purple h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-white/60 text-sm mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
