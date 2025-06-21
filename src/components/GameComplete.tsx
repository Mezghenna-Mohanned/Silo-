import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Clock, RotateCcw } from 'lucide-react';
import { GameState } from '../types/game';

interface GameCompleteProps {
  gameState: GameState;
  onRestart: () => void;
}

export const GameComplete: React.FC<GameCompleteProps> = ({ gameState, onRestart }) => {
  const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  const getGrade = (score: number) => {
    if (score >= 900) return { grade: 'S', color: 'text-yellow-400' };
    if (score >= 800) return { grade: 'A', color: 'text-green-400' };
    if (score >= 700) return { grade: 'B', color: 'text-blue-400' };
    if (score >= 600) return { grade: 'C', color: 'text-purple-400' };
    return { grade: 'D', color: 'text-red-400' };
  };

  const { grade, color } = getGrade(gameState.totalScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/80 backdrop-blur-sm border border-yellow-400 rounded-lg p-8 max-w-2xl w-full mx-4 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="mb-6"
        >
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto" />
        </motion.div>

        <h1 className="text-4xl font-bold text-white mb-4">
          🎉 Congratulations! 🎉
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          You've successfully completed all 10 cipher challenges!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 p-6 rounded-lg border border-gray-600"
          >
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">Final Score</h3>
            <p className="text-2xl font-bold text-yellow-400">{gameState.totalScore}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 p-6 rounded-lg border border-gray-600"
          >
            <div className={`text-4xl font-bold ${color} mb-2`}>{grade}</div>
            <h3 className="text-lg font-semibold text-white mb-1">Grade</h3>
            <p className="text-sm text-gray-400">
              {grade === 'S' && 'Perfect!'}
              {grade === 'A' && 'Excellent!'}
              {grade === 'B' && 'Good Job!'}
              {grade === 'C' && 'Not Bad!'}
              {grade === 'D' && 'Try Again!'}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 p-6 rounded-lg border border-gray-600"
          >
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">Total Time</h3>
            <p className="text-xl font-bold text-blue-400">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </motion.div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Achievement Unlocked!</h3>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg">
            <p className="text-white font-semibold">🔓 Master Cryptographer</p>
            <p className="text-gray-200 text-sm">
              Completed all cipher challenges and escaped the digital labyrinth
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="flex items-center space-x-2 mx-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again</span>
        </motion.button>

        <p className="text-gray-400 text-sm mt-6">
          Thank you for playing Cipher Quest! Share your score with friends and challenge them to beat it.
        </p>
      </motion.div>
    </div>
  );
};