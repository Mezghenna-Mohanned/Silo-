import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Play } from 'lucide-react';
import { levels } from '../utils/gameData';
import { GameState } from '../types/game';

interface LevelSelectorProps {
  gameState: GameState;
  onSelectLevel: (levelId: number) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ gameState, onSelectLevel }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Challenge</h2>
          <p className="text-xl text-gray-300">
            Progress through 10 levels of cryptographic puzzles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {levels.map((level, index) => {
            const isUnlocked = level.id === 1 || gameState.completedLevels.includes(level.id - 1);
            const isCompleted = gameState.completedLevels.includes(level.id);
            const isCurrent = level.id === gameState.currentLevel;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                className={`
                  relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
                  ${isCompleted 
                    ? 'bg-green-900/50 border-green-400 shadow-green-400/20' 
                    : isCurrent
                    ? 'bg-blue-900/50 border-blue-400 shadow-blue-400/20'
                    : isUnlocked
                    ? 'bg-gray-800/50 border-gray-600 hover:border-white'
                    : 'bg-gray-900/50 border-gray-700 opacity-50 cursor-not-allowed'
                  }
                  ${isUnlocked ? 'shadow-lg hover:shadow-xl' : ''}
                `}
                onClick={() => isUnlocked && onSelectLevel(level.id)}
              >
                <div className="text-center">
                  <div className="mb-4">
                    {isCompleted ? (
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                    ) : isCurrent ? (
                      <Play className="w-12 h-12 text-blue-400 mx-auto animate-pulse" />
                    ) : isUnlocked ? (
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-xl font-bold text-white">{level.id}</span>
                      </div>
                    ) : (
                      <Lock className="w-12 h-12 text-gray-500 mx-auto" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{level.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{level.cipher}</p>
                  <p className="text-xs text-gray-400">{level.theme}</p>
                  
                  {isCompleted && (
                    <div className="mt-3 text-xs text-green-400">
                      ✓ Completed
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Complete each level to unlock the next challenge
          </p>
        </motion.div>
      </div>
    </div>
  );
};