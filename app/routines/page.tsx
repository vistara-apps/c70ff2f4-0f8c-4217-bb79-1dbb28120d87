'use client';

import { AppShell } from '../../components/AppShell';
import { RoutineSequencer } from '../../components/RoutineSequencer';
import { useState } from 'react';
import { Plus, Music, Clock, Star, ArrowLeft } from 'lucide-react';
import { Routine, Move } from '../../lib/types';

export default function RoutinesPage() {
  const [routines, setRoutines] = useState<Routine[]>([
    // Mock data - will be replaced with real data from API
    {
      routineId: '1',
      userId: 'user1',
      name: 'Cosmic Flow Routine',
      sequenceData: [],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      routineId: '2',
      userId: 'user1',
      name: 'Urban Pulse Sequence',
      sequenceData: [],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12')
    }
  ]);

  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Mock available moves - will be replaced with API data
  const availableMoves: Move[] = [
    {
      moveId: '1',
      name: 'Pop and Lock',
      description: 'Classic popping technique with locking transitions',
      tags: ['popping', 'locking'],
      difficulty: 'intermediate',
      duration: 8
    },
    {
      moveId: '2',
      name: 'Wave Flow',
      description: 'Smooth arm wave with body isolation',
      tags: ['wave', 'isolation'],
      difficulty: 'beginner',
      duration: 6
    },
    {
      moveId: '3',
      name: 'Windmill',
      description: 'Advanced floor work with continuous rotation',
      tags: ['breakdance', 'power'],
      difficulty: 'advanced',
      duration: 12
    }
  ];

  const handleCreateRoutine = () => {
    setIsCreating(true);
    setSelectedRoutine(null);
  };

  const handleEditRoutine = (routine: Routine) => {
    setSelectedRoutine(routine);
    setIsCreating(false);
  };

  const handleSaveRoutine = (sequenceData: any[]) => {
    if (isCreating) {
      const newRoutine: Routine = {
        routineId: `routine_${Date.now()}`,
        userId: 'user1', // This should come from user store
        name: 'New Routine',
        sequenceData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setRoutines(prev => [...prev, newRoutine]);
      setIsCreating(false);
    } else if (selectedRoutine) {
      setRoutines(prev => prev.map(r =>
        r.routineId === selectedRoutine.routineId
          ? { ...r, sequenceData, updatedAt: new Date() }
          : r
      ));
      setSelectedRoutine(null);
    }
  };

  const handleBack = () => {
    setSelectedRoutine(null);
    setIsCreating(false);
  };

  if (isCreating || selectedRoutine) {
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Routines</span>
            </button>
          </div>

          <RoutineSequencer
            routineName={selectedRoutine?.name || 'New Routine'}
            initialSequence={selectedRoutine?.sequenceData || []}
            availableMoves={availableMoves}
            onSave={handleSaveRoutine}
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white neon-text mb-2">
              My Routines
            </h1>
            <p className="text-white/80">
              Create and manage your dance routines
            </p>
          </div>
          <button
            onClick={handleCreateRoutine}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Routine</span>
          </button>
        </div>

        {routines.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💃</div>
            <h2 className="text-xl font-semibold text-white mb-2">No routines yet</h2>
            <p className="text-white/60 mb-6">
              Create your first dance routine to get started
            </p>
            <button
              onClick={handleCreateRoutine}
              className="btn-primary"
            >
              Create Your First Routine
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {routines.map((routine) => (
              <div key={routine.routineId} className="card-cosmic">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{routine.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {routine.sequenceData.length} moves
                        </span>
                        <span>
                          Updated {routine.updatedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/30 transition-colors duration-200">
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditRoutine(routine)}
                      className="btn-secondary text-sm"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

