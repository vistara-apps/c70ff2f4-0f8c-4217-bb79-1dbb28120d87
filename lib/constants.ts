export const APP_CONFIG = {
  name: 'RhythmFlow AI',
  tagline: 'Choreo your vibe with AI-powered dance sequences',
  version: '1.0.0',
  credits: {
    initial: 5,
    perGeneration: 1,
    maxVariations: 5
  }
};

export const ROUTES = {
  home: '/',
  generator: '/generator',
  routines: '/routines',
  practice: '/practice',
  library: '/library',
  profile: '/profile'
};

export const STORAGE_KEYS = {
  user: 'rhythmflow_user',
  routines: 'rhythmflow_routines',
  preferences: 'rhythmflow_preferences'
};

export const API_ENDPOINTS = {
  generateChoreography: '/api/generate-choreography',
  saveRoutine: '/api/routines',
  getMoves: '/api/moves',
  updateCredits: '/api/credits'
};
