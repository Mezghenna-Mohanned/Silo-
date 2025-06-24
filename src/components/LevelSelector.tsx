import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Play, Shield, Zap, Terminal, Eye, Cpu, Scroll, AlignCenter as Alien, Clock, Flame } from 'lucide-react';
import { levels } from '../utils/gameData';
import { GameState } from '../types/game';

interface LevelSelectorProps {
  gameState: GameState;
  onSelectLevel: (levelId: number) => void;
}

const levelIcons = [
  Shield, Zap, Terminal, Eye, Cpu, Scroll, Scroll, Alien, Clock, Flame
];

export const LevelSelector: React.FC<LevelSelectorProps> = ({ gameState, onSelectLevel }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 bg-gray-800/80 backdrop-blur-sm px-8 py-4 rounded-lg border border-cyan-500/30 mb-6">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h2 className="text-4xl font-bold text-white">
              CIPHER<span className="text-cyan-400">QUEST</span>
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Navigate through 10 levels of cryptographic challenges. Each level presents unique encryption methods and immersive hacker scenarios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {levels.map((level, index) => {
            const isUnlocked = level.id === 1 || gameState.completedLevels.includes(level.id - 1);
            const isCompleted = gameState.completedLevels.includes(level.id);
            const isCurrent = level.id === gameState.currentLevel;
            const IconComponent = levelIcons[index];

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                className={`
                  relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm
                  ${isCompleted 
                    ? 'bg-green-900/30 border-green-400 shadow-lg shadow-green-400/20' 
                    : isCurrent
                    ? 'bg-cyan-900/30 border-cyan-400 shadow-lg shadow-cyan-400/20'
                    : isUnlocked
                    ? 'bg-gray-800/50 border-gray-600 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10'
                    : 'bg-gray-900/50 border-gray-700 opacity-50 cursor-not-allowed'
                  }
                `}
                onClick={() => isUnlocked && onSelectLevel(level.id)}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg" />
                </div>

                <div className="relative text-center">
                  <div className="mb-4">
                    {isCompleted ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                      </motion.div>
                    ) : isCurrent ? (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Play className="w-12 h-12 text-cyan-400 mx-auto" />
                      </motion.div>
                    ) : isUnlocked ? (
                      <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto border border-gray-600">
                        <IconComponent className="w-6 h-6 text-gray-300" />
                      </div>
                    ) : (
                      <Lock className="w-12 h-12 text-gray-500 mx-auto" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`text-xs font-mono px-2 py-1 rounded ${
                      isCompleted ? 'bg-green-400/20 text-green-400' :
                      isCurrent ? 'bg-cyan-400/20 text-cyan-400' :
                      isUnlocked ? 'bg-gray-600/20 text-gray-400' : 'bg-gray-700/20 text-gray-500'
                    }`}>
                      LEVEL {level.id.toString().padStart(2, '0')}
                    </div>
                    
                    <h3 className={`text-lg font-bold ${
                      isCompleted ? 'text-green-400' :
                      isCurrent ? 'text-cyan-400' :
                      isUnlocked ? 'text-white' : 'text-gray-500'
                    }`}>
                      {level.title}
                    </h3>
                    
                    <p className={`text-sm ${
                      isCompleted ? 'text-green-300' :
                      isCurrent ? 'text-cyan-300' :
                      isUnlocked ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {level.cipher}
                    </p>
                    
                    <p className={`text-xs ${
                      isCompleted ? 'text-green-400/70' :
                      isCurrent ? 'text-cyan-400/70' :
                      isUnlocked ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {level.theme}
                    </p>
                  </div>
                  
                  {isCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-xs text-green-400 font-mono"
                    >
                      ✓ BREACHED
                    </motion.div>
                  )}

                  {isCurrent && !isCompleted && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mt-3 text-xs text-cyan-400 font-mono"
                    >
                      → ACTIVE
                    </motion.div>
                  )}
                </div>

                {/* Hover Effect */}
                {isUnlocked && !isCompleted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  />
                )}
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
          <div className="inline-flex items-center space-x-4 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full" />
              <span className="text-gray-400 text-sm">Locked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-sm">Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full" />
              <span className="text-green-400 text-sm">Completed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};