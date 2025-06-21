import { GameState } from '../types/game';

const STORAGE_KEY = 'cipher-game-state';

export const saveGameState = (state: GameState): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadGameState = (): GameState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Failed to parse saved game state:', error);
    }
  }
  
  return {
    currentLevel: 1,
    completedLevels: [],
    hints: {},
    startTime: Date.now(),
    totalScore: 0
  };
};

export const resetGameState = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};