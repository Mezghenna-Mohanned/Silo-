import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Target, Shield } from 'lucide-react';
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
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-cyan-500/30"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <Shield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-wider">
              CIPHER<span className="text-cyan-400">QUEST</span>
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-8 text-white">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-yellow-500/30">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-mono text-yellow-400">{gameState.totalScore}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-blue-500/30">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="font-mono text-blue-400">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-green-500/30">
              <Target className="w-5 h-5 text-green-400" />
              <span className="font-mono text-green-400">
                {gameState.currentLevel}/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};