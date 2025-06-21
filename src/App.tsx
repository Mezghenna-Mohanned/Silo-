import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameHeader } from './components/GameHeader';
import { LevelSelector } from './components/LevelSelector';
import { Level1 } from './components/levels/Level1';
import { Level2 } from './components/levels/Level2';
import { Level3 } from './components/levels/Level3';
import { HintModal } from './components/HintModal';
import { GameComplete } from './components/GameComplete';
import { GameState } from './types/game';
import { levels } from './utils/gameData';
import { saveGameState, loadGameState, resetGameState } from './utils/gameStorage';

function App() {
  const [gameState, setGameState] = useState<GameState>(loadGameState);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showHintModal, setShowHintModal] = useState(false);
  const [gameView, setGameView] = useState<'menu' | 'level' | 'complete'>('menu');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  const handleLevelSelect = (levelId: number) => {
    setGameState(prev => ({ ...prev, currentLevel: levelId }));
    setGameView('level');
  };

  const handleLevelComplete = (score: number) => {
    setGameState(prev => {
      const newCompletedLevels = [...prev.completedLevels];
      if (!newCompletedLevels.includes(prev.currentLevel)) {
        newCompletedLevels.push(prev.currentLevel);
      }

      const newState = {
        ...prev,
        completedLevels: newCompletedLevels,
        currentLevel: Math.min(10, prev.currentLevel + 1),
        totalScore: prev.totalScore + score,
      };

      if (newCompletedLevels.length === 10) {
        setGameView('complete');
      } else {
        setGameView('menu');
      }

      return newState;
    });
  };

  const handleHint = () => {
    setShowHintModal(true);
  };

  const handleUseHint = () => {
    setGameState(prev => ({
      ...prev,
      hints: {
        ...prev.hints,
        [prev.currentLevel]: (prev.hints[prev.currentLevel] || 0) + 1,
      },
    }));
  };

  const handleRestart = () => {
    resetGameState();
    setGameState({
      currentLevel: 1,
      completedLevels: [],
      hints: {},
      startTime: Date.now(),
      totalScore: 0,
    });
    setGameView('menu');
  };

  const renderLevel = () => {
    const currentLevel = levels.find(l => l.id === gameState.currentLevel);
    if (!currentLevel) return null;

    const hintsUsed = gameState.hints[gameState.currentLevel] || 0;
    const levelProps = {
      onComplete: handleLevelComplete,
      onHint: handleHint,
      hintsUsed,
    };

    switch (gameState.currentLevel) {
      case 1:
        return <Level1 {...levelProps} />;
      case 2:
        return <Level2 {...levelProps} />;
      case 3:
        return <Level3 {...levelProps} />;
      default:
        return (
          <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-20">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Level {gameState.currentLevel}</h2>
              <p className="text-xl mb-8">Coming Soon!</p>
              <button
                onClick={() => setGameView('menu')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">
        {gameView !== 'complete' && (
          <GameHeader gameState={gameState} currentTime={currentTime} />
        )}

        {gameView === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LevelSelector gameState={gameState} onSelectLevel={handleLevelSelect} />
          </motion.div>
        )}

        {gameView === 'level' && (
          <motion.div
            key="level"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderLevel()}
          </motion.div>
        )}

        {gameView === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GameComplete gameState={gameState} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>

      <HintModal
        isOpen={showHintModal}
        onClose={() => setShowHintModal(false)}
        hints={levels.find(l => l.id === gameState.currentLevel)?.hints || []}
        currentHint={gameState.hints[gameState.currentLevel] || 0}
        onUseHint={handleUseHint}
      />
    </div>
  );
}

export default App;