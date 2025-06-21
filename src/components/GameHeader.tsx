import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, HelpCircle } from 'lucide-react';
import { GameState } from '../types/game';

interface GameHeaderProps {
  gameState: GameState;
  currentTime: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState, currentTime }) => {
  const elapsedTime = Math.floor((currentTime - gameState.startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-700"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-bold text-white"
          whileHover={{ scale: 1.05 }}
        >
          🔐 Cipher Quest
        </motion.h1>
        
        <div className="flex items-center space-x-6 text-white">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-mono">{gameState.totalScore}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="font-mono">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-green-400" />
            <span className="font-mono">
              Level {gameState.currentLevel}/10
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};