'use client';

import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, Play, Pause, RotateCcw, Save, Trash2, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import type { MoveSequence, Move } from '../lib/types';

interface RoutineSequencerProps {
  routineName?: string;
  initialSequence?: MoveSequence[];
  availableMoves?: Move[];
  onSave?: (sequence: MoveSequence[]) => void;
  onPlay?: (sequence: MoveSequence[]) => void;
  className?: string;
}

export function RoutineSequencer({
  routineName = 'New Routine',
  initialSequence = [],
  availableMoves = [],
  onSave,
  onPlay,
  className
}: RoutineSequencerProps) {
  const [sequence, setSequence] = useState<MoveSequence[]>(initialSequence);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sequence);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update start times based on new order
    let currentTime = 0;
    const updatedSequence = items.map(item => ({
      ...item,
      startTime: currentTime,
      // Keep original duration
    }));

    setSequence(updatedSequence);
  }, [sequence]);

  const addMove = useCallback((move: Move) => {
    const lastMove = sequence[sequence.length - 1];
    const startTime = lastMove ? lastMove.startTime + lastMove.duration : 0;

    const newSequenceItem: MoveSequence = {
      moveId: move.moveId,
      startTime,
      duration: move.duration,
      intensity: 5 // Default intensity
    };

    setSequence(prev => [...prev, newSequenceItem]);
  }, [sequence]);

  const removeMove = useCallback((index: number) => {
    setSequence(prev => {
      const newSequence = prev.filter((_, i) => i !== index);

      // Recalculate start times
      let currentTime = 0;
      return newSequence.map(item => ({
        ...item,
        startTime: currentTime
      }));
    });
  }, []);

  const updateMoveTiming = useCallback((index: number, duration: number, intensity: number) => {
    setSequence(prev => {
      const newSequence = [...prev];
      newSequence[index] = {
        ...newSequence[index],
        duration,
        intensity
      };

      // Recalculate subsequent start times
      for (let i = index + 1; i < newSequence.length; i++) {
        newSequence[i].startTime = newSequence[i - 1].startTime + newSequence[i - 1].duration;
      }

      return newSequence;
    });
  }, []);

  const handlePlay = () => {
    if (sequence.length === 0) return;

    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentMoveIndex(0);
      if (onPlay) {
        onPlay(sequence);
      }
    } else {
      setCurrentMoveIndex(-1);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(sequence);
    }
  };

  const totalDuration = sequence.reduce((total, move) => total + move.duration, 0);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{routineName}</h2>
          <p className="text-white/70">
            {sequence.length} moves • {formatTime(totalDuration)} total
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlay}
            disabled={sequence.length === 0}
            className={cn(
              'btn-primary flex items-center space-x-2',
              sequence.length === 0 && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={handleSave}
            className="btn-secondary flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Sequence Timeline */}
      <div className="card-cosmic">
        <h3 className="text-white font-semibold mb-4">Sequence Timeline</h3>

        {sequence.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎭</div>
            <p className="text-white/70 mb-4">No moves in sequence yet</p>
            <p className="text-white/50 text-sm">Drag moves from below to start building your routine</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sequence">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {sequence.map((move, index) => {
                    const moveData = availableMoves.find(m => m.moveId === move.moveId);
                    const isActive = isPlaying && index === currentMoveIndex;

                    return (
                      <Draggable key={`${move.moveId}-${index}`} draggableId={`${move.moveId}-${index}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              'flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200',
                              snapshot.isDragging
                                ? 'bg-white/20 border-cosmic-purple shadow-lg'
                                : isActive
                                ? 'bg-cosmic-purple/20 border-cosmic-purple'
                                : 'bg-white/10 border-white/20 hover:bg-white/15'
                            )}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <div className="w-8 h-8 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-medium">{moveData?.name || 'Unknown Move'}</h4>
                                <p className="text-white/60 text-sm">{moveData?.description || ''}</p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-white/60" />
                                <span className="text-white/80 text-sm">
                                  {formatTime(move.startTime)} - {formatTime(move.startTime + move.duration)}
                                </span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <label className="text-white/80 text-sm">Duration:</label>
                                <input
                                  type="number"
                                  min="1"
                                  max="60"
                                  value={move.duration}
                                  onChange={(e) => updateMoveTiming(index, parseInt(e.target.value), move.intensity)}
                                  className="input-cosmic w-16 text-sm"
                                />
                                <span className="text-white/60 text-sm">s</span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <label className="text-white/80 text-sm">Intensity:</label>
                                <input
                                  type="range"
                                  min="1"
                                  max="10"
                                  value={move.intensity}
                                  onChange={(e) => updateMoveTiming(index, move.duration, parseInt(e.target.value))}
                                  className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="text-white/60 text-sm w-6">{move.intensity}</span>
                              </div>

                              <button
                                onClick={() => removeMove(index)}
                                className="p-2 bg-red-500/20 rounded-full text-red-400 hover:bg-red-500/30 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>

      {/* Available Moves */}
      <div className="card-cosmic">
        <h3 className="text-white font-semibold mb-4">Available Moves</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableMoves.map((move) => (
            <div
              key={move.moveId}
              className="p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/15 transition-colors duration-200 cursor-pointer"
              onClick={() => addMove(move)}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cosmic-purple to-cosmic-pink rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{move.name}</h4>
                  <p className="text-white/60 text-xs capitalize">{move.difficulty}</p>
                </div>
              </div>
              <p className="text-white/70 text-sm">{move.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white/50 text-xs">{move.duration}s</span>
                <div className="flex space-x-1">
                  {move.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="bg-white/20 px-2 py-1 rounded text-xs text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

