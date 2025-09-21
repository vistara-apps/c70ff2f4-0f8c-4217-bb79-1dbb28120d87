export interface User {
  userId: string;
  username: string;
  farcasterId?: string;
  creditsBalance: number;
  savedRoutines: string[];
}

export interface Routine {
  routineId: string;
  userId: string;
  name: string;
  sequenceData: MoveSequence[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Move {
  moveId: string;
  name: string;
  description: string;
  tutorialUrl?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in seconds
}

export interface MoveSequence {
  moveId: string;
  startTime: number;
  duration: number;
  intensity: number;
}

export interface ChoreoRequest {
  requestId: string;
  userId: string;
  musicGenre: string;
  mood: string;
  style: string;
  createdAt: Date;
  generatedVariations: ChoreographyVariation[];
}

export interface ChoreographyVariation {
  id: string;
  name: string;
  description: string;
  moves: MoveSequence[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number;
}

export interface ChoreoGeneratorParams {
  genre: string;
  mood: string;
  style: string;
  difficulty: string;
  duration: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
