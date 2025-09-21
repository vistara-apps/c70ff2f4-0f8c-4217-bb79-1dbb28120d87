'use client';

import { useState } from 'react';
import { Navigation } from './Navigation';
import { CreditCounter } from './CreditCounter';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [credits, setCredits] = useState(5); // Initial credits

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg neon-text">RhythmFlow AI</h1>
              <p className="text-white/70 text-xs">Choreo your vibe</p>
            </div>
          </div>
          
          <CreditCounter credits={credits} variant="iconLeft" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-5 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <Navigation />
    </div>
  );
}
