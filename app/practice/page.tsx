'use client';

import { AppShell } from '../../components/AppShell';
import { PracticeMirrorPlayer } from '../../components/PracticeMirrorPlayer';
import { useState } from 'react';
import { Play, Settings, Volume2 } from 'lucide-react';

export default function PracticePage() {
  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎭</div>
          <h1 className="text-4xl font-bold text-white neon-text mb-2">
            Practice Mirror
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Perfect your dance moves with real-time visual feedback and AI-guided practice sessions.
          </p>
        </div>

        {!selectedRoutine ? (
          <div className="space-y-6">
            <div className="card-cosmic">
              <h2 className="text-xl font-semibold text-white mb-4">Select a Routine</h2>
              <div className="space-y-3">
                {/* Mock routine selection - will be replaced with real data */}
                {[
                  { id: '1', name: 'Cosmic Flow Routine', moves: 8, duration: '2:30' },
                  { id: '2', name: 'Urban Pulse Sequence', moves: 12, duration: '3:15' },
                  { id: '3', name: 'Neon Dreams Flow', moves: 6, duration: '1:45' }
                ].map((routine) => (
                  <button
                    key={routine.id}
                    onClick={() => setSelectedRoutine(routine.id)}
                    className="w-full p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">{routine.name}</h3>
                        <p className="text-white/60 text-sm">
                          {routine.moves} moves • {routine.duration}
                        </p>
                      </div>
                      <Play className="w-5 h-5 text-white/70" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card-cosmic">
              <h2 className="text-xl font-semibold text-white mb-4">Practice Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white font-medium text-sm">Playback Speed</label>
                  <select className="input-cosmic w-full">
                    <option value="0.5">0.5x (Slow Practice)</option>
                    <option value="0.75">0.75x</option>
                    <option value="1" selected>1x (Normal)</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x (Fast)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-white font-medium text-sm">Mirror Mode</label>
                  <select className="input-cosmic w-full">
                    <option value="on" selected>On (Recommended)</option>
                    <option value="off">Off</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedRoutine(null)}
                className="btn-secondary"
              >
                ← Back to Routine Selection
              </button>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/30 transition-colors duration-200">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/30 transition-colors duration-200">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            <PracticeMirrorPlayer
              variant="withOverlay"
              routineName="Cosmic Flow Routine"
            />

            <div className="card-cosmic">
              <h3 className="text-white font-semibold mb-4">Practice Tips</h3>
              <div className="space-y-3 text-white/80">
                <p>• Focus on clean transitions between moves</p>
                <p>• Keep your core engaged throughout the routine</p>
                <p>• Practice at 0.75x speed if moves feel too fast</p>
                <p>• Record yourself to track improvement over time</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

